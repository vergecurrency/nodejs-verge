```
____   _________________________   ________ ___________
\   \ /   /\_   _____/\______   \ /  _____/ \_   _____/
 \   Y   /  |    __)_  |       _//   \  ___  |    __)_
  \     /   |        \ |    |   \\    \_\  \ |        \ 2026 VERGE
   \___/   /_______  / |____|_  / \______  //_______  /
                   \/         \/         \/         \/
```
# A Node.js VERGE Client
nodejs-verge is a VERGE client for node.js

<p align="left">
  <a href="https://github.com/vergecurrency/nodejs-verge/actions/workflows/node.js.yml">
  <img src="https://github.com/vergecurrency/nodejs-verge/actions/workflows/node.js.yml/badge.svg">
  </a>
</p>

It is a fork of the excellent Kapitalize Bitcoin Client (now removed from GitHub) intended for use with VERGE. The purpose of this repository is:

* Provide a one-stop resource for the Node.js developer to get started with VERGE integration.
* Prevent would-be VERGE web developers worrying whether a VERGE client will work out of the box, or have to construct their own.
* Promote Node.js development of VERGE web apps.
* Identify and address any incompatibilities with the VERGE APIs that exist now, and/or in the future.

## Requirements

Node.js 20 or newer and a running [verged](https://github.com/vergecurrency/verge) instance.

Then, install the node-verge NPM package.

`npm install nodejs-verge`

## Examples

Some code examples follow below

```js
const { Client } = require('nodejs-verge')

const verge = new Client({
    user: 'myusername',
    pass: 'mypassword'
})

const difficulty = await verge.call('getdifficulty')

```

## RPC commands

`Client.call(command, ...params)` supports all RPC commands registered by the current
verged core, wallet, and secure-messaging modules. Command names are type checked in
TypeScript and are available at runtime through `client.getCommands()`.

```js
const info = await verge.call('getblockchaininfo')
const messages = await verge.call('smsginbox', 'all')
await verge.call('smsgsend', fromAddress, toAddress, 'hello', false, 7)
```

Convenience methods remain available for `getBalance`, `getInfo`, `getPeerInfo`, and
`unlockWallet`.

## Commands

The package supports the following Verge Core v26.7 RPC commands. This catalog is synchronized with `RPC_COMMANDS` and checked by the test suite.

<!-- RPC_COMMANDS_START -->
| Command | Description |
| --- | --- |
| `abandontransaction` | Marks an unconfirmed wallet transaction and its descendants as abandoned. |
| `abortrescan` | Stops an active wallet blockchain rescan. |
| `addmultisigaddress` | Adds a multisignature address to the wallet. |
| `addnode` | Adds, removes, or attempts a connection to a peer. |
| `addwitnessaddress` | Adds a witness version of an existing wallet address. |
| `backupwallet` | Safely copies the current wallet file to a destination. |
| `bumpfee` | Creates a replacement transaction with a higher fee. |
| `clearbanned` | Clears all manually banned peers. |
| `combinerawtransaction` | Combines partially signed variants of the same raw transaction. |
| `createbond` | Creates and broadcasts an explicit proof-of-stake bond. |
| `createmultisig` | Creates a multisignature address and redeem script. |
| `createrawtransaction` | Builds an unsigned raw transaction from inputs and outputs. |
| `createwallet` | Creates and loads a new wallet. |
| `debuginfo` | Returns diagnostic information useful for debugging the daemon. |
| `decodeblock` | Decodes a serialized block into a readable JSON object. |
| `decoderawtransaction` | Decodes a serialized transaction into a readable JSON object. |
| `decodescript` | Decodes a hexadecimal script and describes its addresses and type. |
| `disconnectnode` | Disconnects a peer by address or node ID. |
| `dumpprivkey` | Reveals the private key for a wallet address. |
| `dumpwallet` | Exports all wallet keys in a human-readable dump file. |
| `echo` | Returns supplied arguments for RPC testing. |
| `echojson` | Returns supplied JSON values for RPC testing. |
| `encryptwallet` | Encrypts the wallet with a passphrase. |
| `estimatefee` | Estimates the fee rate needed for confirmation within a target. |
| `estimaterawfee` | Returns raw fee-estimation data for multiple time horizons. |
| `estimatesmartfee` | Estimates a suitable fee rate for a confirmation target. |
| `exportstealthaddress` | Exports the secrets associated with a stealth address. |
| `flushsmgsdb` | Wipes stored and queued secure messages while preserving SMSG keys. |
| `fundrawtransaction` | Adds wallet inputs and change to a raw transaction. |
| `generate` | Immediately mines blocks to a wallet-generated address. |
| `generatestake` | Evaluates wallet bonds and submits a proof-of-stake block when eligible. |
| `generatetoaddress` | Immediately mines blocks to a specified address. |
| `getaccount` | Returns the deprecated account associated with an address. |
| `getaccountaddress` | Returns the current receiving address for a deprecated account. |
| `getaddednodeinfo` | Returns information about manually added peers. |
| `getaddressesbyaccount` | Lists addresses assigned to a deprecated account. |
| `getaddressesbylabel` | Returns wallet addresses associated with a label. |
| `getaddressinfo` | Returns detailed wallet and script information for an address. |
| `getallnetworkhashps` | Returns estimated network hash rates for all mining algorithms. |
| `getbalance` | Returns the wallet balance subject to confirmation and watch-only options. |
| `getbestblockhash` | Returns the hash of the current best block. |
| `getblock` | Returns a block by hash, optionally with decoded transaction data. |
| `getblockchaininfo` | Returns chain state, verification progress, and deployment information. |
| `getblockcount` | Returns the current best-chain height. |
| `getblockhash` | Returns the block hash at a given height. |
| `getblockheader` | Returns a block header by hash. |
| `getblockstats` | Computes statistics for a block. |
| `getblocktemplate` | Returns data needed to construct a block or validate a proposal. |
| `getchaintips` | Lists known chain tips and their statuses. |
| `getchaintxstats` | Returns transaction-rate statistics for a chain window. |
| `getconnectioncount` | Returns the number of peer connections. |
| `getdifficulty` | Returns the current proof-of-work difficulty. |
| `getinfo` | Returns legacy summary information about the node and wallet. |
| `getmemoryinfo` | Returns information about the node's memory allocator. |
| `getmempoolancestors` | Returns in-mempool ancestors of a transaction. |
| `getmempooldescendants` | Returns in-mempool descendants of a transaction. |
| `getmempoolentry` | Returns mempool data for a transaction. |
| `getmempoolinfo` | Returns aggregate mempool state and usage. |
| `getmininginfo` | Returns mining-related node and chain information. |
| `getnettotals` | Returns total network bytes sent and received. |
| `getnetworkhashps` | Estimates the network hash rate for an algorithm and height. |
| `getnetworkinfo` | Returns peer-to-peer networking state and configuration. |
| `getnewaddress` | Generates a new wallet receiving address. |
| `getnewstealthaddress` | Generates a new wallet stealth address. |
| `getnodeaddresses` | Returns known peer addresses from the address manager. |
| `getpeerinfo` | Returns detailed information about connected peers. |
| `getrawchangeaddress` | Generates a new wallet address reserved for change. |
| `getrawmempool` | Returns transaction IDs or verbose entries from the mempool. |
| `getrawtransaction` | Returns raw or decoded transaction data by transaction ID. |
| `getreceivedbyaccount` | Returns the amount received by a deprecated account. |
| `getreceivedbyaddress` | Returns the amount received by an address. |
| `getreceivedbylabel` | Returns the amount received by a wallet label. |
| `getstakinginfo` | Returns the wallet's proof-of-stake operating state. |
| `gettransaction` | Returns detailed wallet information for a transaction. |
| `gettxout` | Returns an unspent transaction output. |
| `gettxoutproof` | Creates a proof that transactions are included in a block. |
| `gettxoutsetinfo` | Returns statistics about the unspent transaction output set. |
| `getunconfirmedbalance` | Returns the wallet's unconfirmed balance. |
| `getwalletinfo` | Returns wallet state, balances, and key-pool information. |
| `help` | Lists RPC commands or displays help for one command. |
| `importaddress` | Imports an address or script as watch-only. |
| `importmulti` | Imports multiple addresses, scripts, or keys in one request. |
| `importprivkey` | Imports a private key into the wallet. |
| `importprunedfunds` | Imports a transaction and its inclusion proof into the wallet. |
| `importpubkey` | Imports a public key as watch-only. |
| `importstealthaddress` | Imports a stealth address from scan and spend secrets. |
| `importwallet` | Imports keys from a wallet dump file. |
| `invalidateblock` | Marks a block invalid and reorganizes away from it. |
| `keypoolrefill` | Refills the wallet's key pool. |
| `listaccounts` | Lists deprecated accounts and their balances. |
| `listaddressgroupings` | Lists wallet addresses that are likely controlled together. |
| `listbanned` | Lists manually banned peers. |
| `listlabels` | Lists wallet labels, optionally filtered by purpose. |
| `listlockunspent` | Lists outputs temporarily locked against spending. |
| `listreceivedbyaccount` | Lists amounts received by deprecated account. |
| `listreceivedbyaddress` | Lists amounts received by wallet address. |
| `listreceivedbylabel` | Lists amounts received by wallet label. |
| `listsinceblock` | Lists wallet transactions since a specified block. |
| `liststealthaddresses` | Lists stealth addresses stored in the wallet. |
| `listtransactions` | Lists recent wallet transactions. |
| `listunspent` | Lists wallet unspent transaction outputs. |
| `listwallets` | Lists currently loaded wallets. |
| `loadwallet` | Loads an existing wallet file. |
| `lockunspent` | Locks or unlocks selected outputs for spending. |
| `logging` | Gets or changes active logging categories. |
| `move` | Moves balance between deprecated wallet accounts. |
| `ping` | Queues a ping to connected peers. |
| `preciousblock` | Treats a block as preferred when selecting among equal-work chains. |
| `prioritisetransaction` | Adjusts a mempool transaction's mining priority or fee delta. |
| `pruneblockchain` | Deletes old block files up to a specified height or time. |
| `reconsiderblock` | Clears invalid status from a block and its descendants. |
| `removeprunedfunds` | Removes a previously imported pruned transaction from the wallet. |
| `rescanblockchain` | Rescans a block range for wallet transactions. |
| `resendwallettransactions` | Rebroadcasts unconfirmed wallet transactions. |
| `reserializeblock` | Re-serializes supplied block data using the daemon's block format. |
| `savemempool` | Writes the current mempool to disk. |
| `sendfrom` | Sends XVG from a deprecated wallet account. |
| `sendmany` | Sends XVG to multiple recipients in one transaction. |
| `sendrawtransaction` | Submits a signed raw transaction to the node and network. |
| `sendtoaddress` | Sends XVG to an address. |
| `sendtostealthaddress` | Sends XVG to a stealth address. |
| `setaccount` | Assigns an address to a deprecated wallet account. |
| `setalgo` | Selects the proof-of-work mining algorithm. |
| `setban` | Adds or removes a peer ban. |
| `sethdseed` | Sets or generates the wallet's hierarchical deterministic seed. |
| `setlabel` | Assigns a label to a wallet address. |
| `setmocktime` | Sets the node's mock clock for regression testing. |
| `setnetworkactive` | Enables or disables all peer-to-peer network activity. |
| `setstaking` | Persistently enables or disables automatic proof-of-stake production. |
| `settxfee` | Sets the wallet transaction fee rate. |
| `signmessage` | Signs a message with the private key for a wallet address. |
| `signmessagewithprivkey` | Signs a message with a supplied private key. |
| `signrawtransaction` | Signs a raw transaction using available wallet or supplied keys. |
| `signrawtransactionwithkey` | Signs a raw transaction using supplied private keys. |
| `signrawtransactionwithwallet` | Signs a raw transaction using wallet keys. |
| `smsg` | Views, updates, or deletes one secure message by message ID. |
| `smsgaddaddress` | Adds an address and public key to the secure-messaging database. |
| `smsgaddlocaladdress` | Enables secure-message reception on a wallet address. |
| `smsgbuckets` | Displays secure-message bucket statistics or contents. |
| `smsgdisable` | Disables secure messaging. |
| `smsgenable` | Enables secure messaging for a wallet. |
| `smsggetpubkey` | Returns the compressed public key and chat key for an address. |
| `smsgimportprivkey` | Imports a private key into the secure-messaging database. |
| `smsginbox` | Lists, filters, or clears received secure messages. |
| `smsginfo` | Returns secure-messaging runtime, storage, queue, and peer information. |
| `smsglocalkeys` | Lists and manages local secure-messaging keys. |
| `smsgoptions` | Lists or changes secure-messaging options. |
| `smsgoutbox` | Lists, filters, or clears sent secure messages. |
| `smsgpurge` | Purges a secure message by message ID. |
| `smsgscanbuckets` | Rescans all messages in the secure-message bucket store. |
| `smsgscanchain` | Scans the blockchain for public keys used by secure messaging. |
| `smsgsend` | Sends or fee-tests a paid secure message. |
| `smsgsendanon` | Sends a paid anonymous encrypted message; this command is deprecated. |
| `smsgview` | Searches and displays secure messages by address, label, or date. |
| `stop` | Requests a graceful daemon shutdown. |
| `submitblock` | Submits a serialized block for validation. |
| `syncwithvalidationinterfacequeue` | Waits until queued validation callbacks have completed. |
| `testmempoolaccept` | Tests whether raw transactions would be accepted into the mempool. |
| `unbond` | Begins withdrawal of a wallet-owned proof-of-stake bond. |
| `uptime` | Returns the daemon's uptime in seconds. |
| `validateaddress` | Validates an address and returns information about it. |
| `verifychain` | Verifies blockchain database consistency. |
| `verifymessage` | Verifies a message signature against an address. |
| `verifytxoutproof` | Verifies a transaction inclusion proof and returns its transaction IDs. |
| `waitforblock` | Waits for a specific block hash or a timeout. |
| `waitforblockheight` | Waits for the chain to reach a block height or a timeout. |
| `waitfornewblock` | Waits for the next block or a timeout. |
| `walletlock` | Removes the wallet encryption key from memory and locks the wallet. |
| `walletpassphrase` | Unlocks an encrypted wallet for a limited time. |
| `walletpassphrasechange` | Changes the wallet encryption passphrase. |
<!-- RPC_COMMANDS_END -->

## Options

You may pass options to the initialization function or to the `set` method.

```js

const { Client } = require('nodejs-verge')
const verge = new Client({
    user:'user'
})

verge.set('pass', 'somn')
verge.set({port:20102})

```

Available options and default values:

+ host *localhost*
+ port *20102*
+ user
+ pass
+ passphrasecallback
+ https
+ ca

### Passphrase Callback

With an encryped wallet, any operation that accesses private keys requires a wallet unlock. A wallet is unlocked using the `walletpassphrase <passphrase> <timeout>` JSON-RPC method: the wallet will relock after `timeout` seconds.

You may pass an optional function `passphrasecallback` to the `node-verge` initialization function to manage wallet unlocks. `passphrasecallback` should be a function accepting three arguments:

    function(command, args, callback) {}

+ **command** is the command that failed due to a locked wallet.
+ **args** is the arguments for the failed command.
+ **callback** is a typical node-style continuation callback of the form `function(err, passphrase, timeout) {}`. Call callback with the wallet passphrase and desired timeout from within your passphrasecallback to unlock the wallet.

You may hard code your passphrase (not recommended) as follows:

```js
var verge = require('nodejs-verge')({
    passphrasecallback: function(command, args, callback) {
        callback(null, 'passphrase', 30);
    }
})
```

Because `passphrasecallback` is a continuation, you can retrieve the passphrase in an asynchronous manner. For example, by prompting the user:

```js
var readline = require('readline')

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var verge = require('nodejs-verge')({
  passphrasecallback: function(command, args, callback) {
    rl.question('Enter passphrase for "' + command + '" operation: ', function(passphrase) {
      if (passphrase) {
        callback(null, passphrase, 1)
      } else {
        callback(new Error('no passphrase entered'))
      }
    })
  }
})
```

### Secure RPC with SSL

By default `verged` exposes its JSON-RPC interface via HTTP; that is, all RPC commands are transmitted in plain text across the network! To secure the JSON-RPC channel you can supply `verged` with a self-signed SSL certificate and an associated private key to enable HTTPS. For example, in your `verge.conf`:

    rpcssl=1
    rpcsslcertificatechainfile=/etc/ssl/certs/verged.crt
    rpcsslprivatekeyfile=/etc/ssl/private/verged.pem

In order to securely access an SSL encrypted JSON-RPC interface you need a copy of the self-signed certificate from the server: in this case `verged.crt`. Pass your self-signed certificate in the `ca` option and set `https: true` and node-verge is secured!

```js
var fs = require('fs')

var ca = fs.readFileSync('verged.crt')

var verge = require('nodejs-verge')({
  user: 'rpcusername',
  pass: 'rpcpassword',
  https: true,
  ca: ca
})
```

## Testing

```sh
npm ci
npm run lint
npm test
```

## Donate

[VERGE](https://vergecurrency.com) donation address is DHe3mTNQztY1wWokdtMprdeCKNoMxyThoV

Donations in [verge](https://vergecurrency.com) will be used for bounties, and holding. 
As a side note: I encourage all GitHub repository owners to post a donation address so 
their community can easily support development financially.



