"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API = /** @class */ (function () {
    function API() {
        this.commands = new Array('addMultiSigAddress', 'backupWallet', 'createRawTransaction', 'decodeRawTransaction', 'dumpPrivKey', 'encryptWallet', 'getAccount', 'getAccountAddress', 'getAddressesByAccount', 'getBalance', 'getBlock', 'getBlockCount', 'getBlockHash', 'getConnectionCount', 'getDifficulty', 'getGenerate', 'getHashesPerSec', 'getInfo', 'getMemoryPool', 'getMiningInfo', 'getNewAddress', 'getRawTransaction', 'getReceivedByAccount', 'getReceivedByAddress', 'getTransaction', 'getWork', 'help', 'importPrivKey', 'importAddress', 'keyPoolRefill', 'listAccounts', 'listReceivedByAccount', 'listReceivedByAddress', 'listSinceBlock', 'listTransactions', 'listUnspent', 'move', 'sendFrom', 'sendMany', 'sendRawTransaction', 'sendToAddress', 'setAccount', 'setGenerate', 'setTxFee', 'signMessage', 'signRawTransaction', 'stop', 'validateAddress', 'verifyMessage', 'walletLock', 'walletPassphrase', 'walletPassphraseChange');
    }
    API.prototype.isCommand = function (command) {
        var lowerCommand = command.toLowerCase();
        var lowerCaseCommands = this.getCommands().map(function (item) {
            return item.toLowerCase();
        });
        return lowerCaseCommands.indexOf(lowerCommand) !== -1;
    };
    API.prototype.getCommands = function () {
        return this.commands;
    };
    return API;
}());
exports.API = API;
