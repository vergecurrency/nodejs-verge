"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API = /** @class */ (function () {
    function API() {
        this.commands = new Array('addMultiSigAddress', 'backupWallet', 'createRawTransaction', 'decodeRawTransaction', 'dumpPrivKey', 'encryptWallet', 'getAccount', 'getAccountAddress', 'getAddressesByAccount', 'getBalance', 'getBlock', 'getBlockCount', 'getBlockHash', 'getConnectionCount', 'getDifficulty', 'getGenerate', 'getHashesPerSec', 'getInfo', 'getMemoryPool', 'getMiningInfo', 'getNewAddress', 'getRawTransaction', 'getReceivedByAccount', 'getReceivedByAddress', 'getTransaction', 'getWork', 'help', 'importPrivKey', 'importAddress', 'keyPoolRefill', 'listAccounts', 'listReceivedByAccount', 'listReceivedByAddress', 'listSinceBlock', 'listTransactions', 'listUnspent', 'move', 'sendFrom', 'sendMany', 'sendRawTransaction', 'sendToAddress', 'setAccount', 'setGenerate', 'setTxFee', 'signMessage', 'signRawTransaction', 'stop', 'validateAddress', 'verifyMessage', 'walletLock', 'walletPassphrase', 'walletPassphraseChange');
        /*abstract getBlock(hash: string, txinfo?: string): Promise<Block>
      
        abstract getBlockCount(): Client
      
        abstract getBlockHash(): Client
      
        abstract getConnectionCount(): Client
      
        abstract getDifficulty(): Client
      
        abstract getGenerate(): Client
      
        abstract getHashesPerSec(): Client
      
        abstract getInfo(): Client
      
        abstract getMemoryPool(): Client
      
        abstract getMiningInfo(): Client
      
        abstract getNewAddress(): Client
      
        abstract getRawTransaction(): Client
      
        abstract getReceivedByAccount(): Client
      
        abstract getReceivedByAddress(): Client
      
        abstract getTransaction(): Client
      
        abstract getWork(): Client
      
        abstract help(): Client
      
        abstract importPrivKey(): Client
      
        abstract importAddress(): Client
      
        abstract keyPoolRefill(): Client
      
        abstract listAccounts(): Client
      
        abstract listReceivedByAccount(): Client
      
        abstract listReceivedByAddress(): Client
      
        abstract listSinceBlock(): Client
      
        abstract listTransactions(): Client
      
        abstract listUnspent(): Client
      
        abstract move(): Client
      
        abstract sendFrom(): Client
      
        abstract sendMany(): Client
      
        abstract sendRawTransaction(): Client
      
        abstract sendToAddress(): Client
      
        abstract setAccount(): Client
      
        abstract setGenerate(): Client
      
        abstract setTxFee(): Client
      
        abstract signMessage(): Client
      
        abstract signRawTransaction(): Client
      
        abstract stop(): Client
      
        abstract validateAddress(): Client
      
        abstract verifyMessage(): Client
      
        abstract walletLock(): Client
      
        abstract walletPassphrase(): Client
      
        abstract walletPassphraseChange(): Client*/
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
