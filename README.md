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
```text
abandontransaction
abortrescan
addmultisigaddress
addnode
addwitnessaddress
backupwallet
bumpfee
clearbanned
combinerawtransaction
createbond
createmultisig
createrawtransaction
createwallet
debuginfo
decodeblock
decoderawtransaction
decodescript
disconnectnode
dumpprivkey
dumpwallet
echo
echojson
encryptwallet
estimatefee
estimaterawfee
estimatesmartfee
exportstealthaddress
flushsmgsdb
fundrawtransaction
generate
generatestake
generatetoaddress
getaccount
getaccountaddress
getaddednodeinfo
getaddressesbyaccount
getaddressesbylabel
getaddressinfo
getallnetworkhashps
getbalance
getbestblockhash
getblock
getblockchaininfo
getblockcount
getblockhash
getblockheader
getblockstats
getblocktemplate
getchaintips
getchaintxstats
getconnectioncount
getdifficulty
getinfo
getmemoryinfo
getmempoolancestors
getmempooldescendants
getmempoolentry
getmempoolinfo
getmininginfo
getnettotals
getnetworkhashps
getnetworkinfo
getnewaddress
getnewstealthaddress
getnodeaddresses
getpeerinfo
getrawchangeaddress
getrawmempool
getrawtransaction
getreceivedbyaccount
getreceivedbyaddress
getreceivedbylabel
getstakinginfo
gettransaction
gettxout
gettxoutproof
gettxoutsetinfo
getunconfirmedbalance
getwalletinfo
help
importaddress
importmulti
importprivkey
importprunedfunds
importpubkey
importstealthaddress
importwallet
invalidateblock
keypoolrefill
listaccounts
listaddressgroupings
listbanned
listlabels
listlockunspent
listreceivedbyaccount
listreceivedbyaddress
listreceivedbylabel
listsinceblock
liststealthaddresses
listtransactions
listunspent
listwallets
loadwallet
lockunspent
logging
move
ping
preciousblock
prioritisetransaction
pruneblockchain
reconsiderblock
removeprunedfunds
rescanblockchain
resendwallettransactions
reserializeblock
savemempool
sendfrom
sendmany
sendrawtransaction
sendtoaddress
sendtostealthaddress
setaccount
setalgo
setban
sethdseed
setlabel
setmocktime
setnetworkactive
setstaking
settxfee
signmessage
signmessagewithprivkey
signrawtransaction
signrawtransactionwithkey
signrawtransactionwithwallet
smsg
smsgaddaddress
smsgaddlocaladdress
smsgbuckets
smsgdisable
smsgenable
smsggetpubkey
smsgimportprivkey
smsginbox
smsginfo
smsglocalkeys
smsgoptions
smsgoutbox
smsgpurge
smsgscanbuckets
smsgscanchain
smsgsend
smsgsendanon
smsgview
stop
submitblock
syncwithvalidationinterfacequeue
testmempoolaccept
unbond
uptime
validateaddress
verifychain
verifymessage
verifytxoutproof
waitforblock
waitforblockheight
waitfornewblock
walletlock
walletpassphrase
walletpassphrasechange
```
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



