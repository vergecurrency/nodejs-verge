"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client_1 = require("./Client");
var Client_2 = require("./Client");
exports.Client = Client_2.Client;
var myClient = new Client_1.Client({
    pass: 'lolcat',
    user: 'kyon',
});
myClient.getBalance().then(console.log);
