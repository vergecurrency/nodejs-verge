const commands = [
  'addMultiSigAddress',
  'backupWallet',
  'createRawTransaction',
  'decodeRawTransaction',
  'dumpPrivKey',
  'encryptWallet',
  'getAccount',
  'getAccountAddress',
  'getAddressesByAccount',
  'getBalance',
  'getBlock',
  'getBlockCount',
  'getBlockHash',
  'getConnectionCount',
  'getDifficulty',
  'getGenerate',
  'getHashesPerSec',
  'getInfo',
  'getMemoryPool',
  'getMiningInfo',
  'getNewAddress',
  'getRawTransaction',
  'getReceivedByAccount',
  'getReceivedByAddress',
  'getTransaction',
  'getWork',
  'help',
  'importPrivKey',
  'importAddress',
  'keyPoolRefill',
  'listAccounts',
  'listReceivedByAccount',
  'listReceivedByAddress',
  'listSinceBlock',
  'listTransactions',
  'listUnspent',
  'move',
  'sendFrom',
  'sendMany',
  'sendRawTransaction',
  'sendToAddress',
  'setAccount',
  'setGenerate',
  'setTxFee',
  'signMessage',
  'signRawTransaction',
  'stop',
  'validateAddress',
  'verifyMessage',
  'walletLock',
  'walletPassphrase',
  'walletPassphraseChange',
];

const isCommand = function (command) {
  const commandLC = command.toLowerCase();
  const lowerCaseCommands = commands.map(function (item) {
    return item.toLowerCase();
  });

  return lowerCaseCommands.indexOf(commandLC) !== -1;
};

module.exports.commands = commands;
module.exports.isCommand = isCommand;
