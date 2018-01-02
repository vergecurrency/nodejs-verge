
var commands = module.exports.commands = [
  'addMultiSigAddress'
  , 'backupWallet'
  , 'createRawTransaction'
  , 'decodeRawTransaction'
  , 'dumpPrivKey'
  , 'encryptWallet'
  , 'getAccount'
  , 'getAccountAddress'
  , 'getAddressesByAccount'
  , 'getBalance'
  , 'getBlock'
  , 'getBlockCount'
  , 'getBlockHash'
  , 'getBlockCount'
  , 'getConnectionCount'
  , 'getDifficulty'
  , 'getGenerate'
  , 'getHashesPerSec'
  , 'getHashesPerSec'
  , 'getInfo'
  , 'getMemoryPool'
  , 'getMemoryPool'
  , 'getMiningInfo'
  , 'getNewAddress'
  , 'getRawTransaction'
  , 'getReceivedByAccount'
  , 'getReceivedByAddress'
  , 'getTransaction'
  , 'getWork'
  , 'help'
  , 'importPrivKey'
  , 'importAddress'
  , 'keyPoolRefill'
  , 'listAccounts'
  , 'listReceivedByAccount'
  , 'listReceivedByAddress'
  , 'listSinceBlock'
  , 'listTransactions'
  , 'listUnspent'
  , 'move'
  , 'sendFrom'
  , 'sendMany'
  , 'sendRawTransaction'
  , 'sendToAddress'
  , 'setAccount'
  , 'setGenerate'
  , 'setTxFee'
  , 'signMessage'
  , 'signRawTransaction'
  , 'stop'
  , 'validateAddress'
  , 'verifyMessage'
  , 'walletLock'
  , 'walletPassphrase'
  , 'walletPassphraseChange'
  ,
  'checkWallet',
  'getBlockByNumber',
  'getBlockTemplate',
  'getCheckpoint',
  'getNewPubkey',
  'getNewStealthAddress',
  'getPeerInfo',
  'getRawBlockByNumber',
  'getRawMempool',
  'getWorkex',
  'importStealthAddress',
  'listAddressGroupings',
  'listStealthAddresses',
  'makeKeypair',
  'repairWallet',
  'resendTx',
  'reserveBalance',
  'scanForAllTxns',
  'scanForStealthTxns',
  'sendAlert',
  'sendToStealthAddress',
  'smsgAddKey',
  'smsgBuckets',
  'smsgDisable',
  'smsgEnable',
  'smsgGetPubkey',
  'smsgInbox',
  'smsgLocalkeys',
  'smsgOptions',
  'smsgOutbox',
  'smsgScanBuckets',
  'smsgScanChain',
  'smsgSend',
  'smsgSendanon',
  'submitBlock',
  'validatePubkey'
]

module.exports.isCommand = function (command) {
  command = command.toLowerCase()
  for (var i = 0, len = commands.length; i < len; i++) {
    if (commands[i].toLowerCase() === command) {
      return true
    }
  }
}
