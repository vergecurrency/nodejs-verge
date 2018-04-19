"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = require("./API");
var http = require("http");
var RPCErrorCode_1 = require("./RPCErrorCode");
var https = require("https");
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client(options) {
        var _this = _super.call(this) || this;
        _this.options = __assign({ host: 'localhost', port: 20102, method: 'POST', user: '', pass: '', headers: {
                Host: 'localhost',
                Authorization: '',
            }, passphrasecallback: null, https: false, ca: null }, options);
        if (_this.options.user && _this.options.pass) {
            _this.options.headers.Authorization = "Basic " + new Buffer(_this.options.user + ':' + _this.options.pass).toString('base64');
        }
        return _this;
    }
    Client.prototype.invalid = function (command) {
        var args = Array.prototype.slice.call(arguments, 1), fn = args.pop();
        if (typeof fn !== 'function') {
            fn = console.log;
        }
        return fn(new Error('No such command "' + command + '"'));
    };
    Client.prototype.send = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var rpcData = {
            id: new Date().getTime(),
            method: command.toLowerCase(),
            params: args.filter(function (item) { return !!item; }),
        };
        var options = this.options;
        options.headers['Content-Length'] = JSON.stringify(rpcData).length;
        var request;
        if (this.options.https === true) {
            request = https.request;
        }
        else {
            request = http.request;
        }
        var promisedRequest = new Promise(function (resolve, reject) {
            var rpcRequest = request(options, function (res) {
                var _this = this;
                var data = '';
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on('end', function () {
                    try {
                        var rpcResponse = JSON.parse(data);
                        if (rpcResponse.id != rpcData.id) {
                            throw new Error('Possible Man-in-the-middle Attack!!!');
                        }
                        if (rpcResponse.error) {
                            if (rpcResponse.error.code ===
                                RPCErrorCode_1.RPCErrorCode.RPC_WALLET_UNLOCK_NEEDED &&
                                options.passphrasecallback) {
                                //TODO: Handle special case :thinking:
                                return _this.unlock(command, args, function () { });
                            }
                            else {
                                var err = JSON.stringify(rpcResponse);
                                return reject(err);
                            }
                        }
                        console.log(rpcResponse);
                        resolve(rpcResponse.result !== null ? rpcResponse.result : rpcResponse);
                    }
                    catch (exception) {
                        var errMsg = res.statusCode !== 200
                            ? 'Invalid params ' + res.statusCode
                            : 'Failed to parse JSON';
                        errMsg += ' : ' + JSON.stringify(data);
                        return reject(new Error(errMsg));
                    }
                });
            });
            rpcRequest.on('error', function (error) { return reject(error); });
            rpcRequest.end(JSON.stringify(rpcData));
        });
        return promisedRequest;
    };
    Client.prototype.exec = function (command) {
        var func = this.isCommand(command) ? 'send' : 'invalid';
        return this[func].apply(this, arguments);
    };
    Client.prototype.auth = function (user, pass) {
        if (user && pass) {
            var authString = 'Basic ' + new Buffer(user + ':' + pass).toString('base64');
            this.options.headers['Authorization'] = authString;
        }
        return this;
    };
    Client.prototype.unlock = function (command, args, fn) {
        var self = this;
        var retry = function (err) {
            if (err) {
                fn(err);
            }
            else {
                var sendargs = args.slice();
                sendargs.unshift(command);
                sendargs.push(fn);
                self.send.apply(self, sendargs);
            }
        };
        this.options.passphrasecallback(command, args, function (err, passphrase, timeout) {
            if (err) {
                fn(err);
            }
            else {
                self.send('walletpassphrase', passphrase, timeout, retry);
            }
        });
    };
    Client.prototype.getBalance = function (account) {
        return this.send('getbalance', account).catch(console.error);
    };
    return Client;
}(API_1.API));
exports.Client = Client;
