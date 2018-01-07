```
____   _________________________   ________ ___________
\   \ /   /\_   _____/\______   \ /  _____/ \_   _____/
 \   Y   /  |    __)_  |       _//   \  ___  |    __)_
  \     /   |        \ |    |   \\    \_\  \ |        \ 2018 VERGE
   \___/   /_______  / |____|_  / \______  //_______  /
                   \/         \/         \/         \/
```
# A Node.js VERGE Client
node-verge is a VERGE client for node.js

It is a fork of the excellent Kapitalize Bitcoin Client (now removed from GitHub) intended for use with VERGE. The purpose of this repository is:

* Provide a one-stop resource for the Node.js developer to get started with VERGE integration.
* Prevent would-be VERGE web developers worrying whether a VERGE client will work out of the box, or have to construct their own.
* Promote Node.js development of VERGE web apps.
* Identify and address any incompatibilities with the VERGE APIs that exist now, and/or in the future.

## Dependencies

You'll need a running instance of [verged](https://github.com/vergecurrency/verge) to connect with.

Then, install the node-verge NPM package.

`npm install node-verge`

## Examples

Some code examples follow below

```js
var verge = require('node-verge')()

verge.auth('myusername', 'mypassword')

verge.getDifficulty(function() {
    console.log(arguments);
})

```

## Chaining

Pretty much everything is chainable.

```js
var verge = require('node-verge')()

verge
.auth('MyUserName', 'mypassword')
.getNewAddress()
.getBalance()
```

## Methods

The [Litecoin API](https://litecoin.info/Litecoin_API) is supported as direct methods. Use either camelcase or lowercase.

```js
verge.getNewAddress(function(err, address) {
    this.validateaddress(address, function(err, info) {

    })
})
```
### .exec(command [string], ...arguments..., callback [function])

Executes the given command with optional arguments. Function `callback` defaults to `console.log`.
All of the API commands are supported in lowercase or camelcase. Or uppercase. Anycase!

```js
verge.exec('getNewAddress')

verge.exec('getbalance', function(err, balance) {

})
```

### .set(key [string, object], value [optional])

Accepts either key & value strings or an Object containing settings, returns `this` for chainability.

```js
verge.set('host', '127.0.0.1')
```

### .get(key [string])

Returns the specified option's value

```js
verge.get('user')
```

### .auth(user [string], pass [string])

Generates authorization header, returns `this` for chainability

## Commands

TODO: Write tests for these.

All [Litecoin API](https://litecoin.info/Litecoin_API) commands are supported, in lowercase or camelcase form.

<table>
<tr>
<th> Command </th>
<th> Parameters </th>
<th> Description </th>
<th> Requires unlocked wallet?
</th></tr>
<tr>
<td> addmultisigaddress </td>
<td> [nrequired] ["key","key"] [account] </td>
<td> <b>Currently only available on testnet</b> Add a nrequired-to-sign multisignature address to the wallet. Each key is a verge address or hex-encoded public key. If [account] is specified, assign address to [account]. </td>
<td> N
</td></tr>
<tr>
<td> backupwallet </td>
<td> [destination] </td>
<td> Safely copies wallet.dat to destination, which can be a directory or a path with filename. </td>
<td> N
</td></tr>
<tr>
<td> dumpprivkey </td>
<td> [vergeaddress] </td>
<td> Reveals the private key corresponding to <vergeaddress< </td>
<td> Y
</td></tr>
<tr>
<td> encryptwallet </td>
<td> [passphrase] </td>
<td> Encrypts the wallet with <passphrase<. </td>
<td> N
</td></tr>
<tr>
<td> getaccount </td>
<td> [vergeaddress] </td>
<td> Returns the account associated with the given address. </td>
<td> N
</td></tr>
<tr>
<td> getaccountaddress </td>
<td> [account] </td>
<td> Returns the current verge address for receiving payments to this account. </td>
<td> N
</td></tr>
<tr>
<td> getaddressesbyaccount </td>
<td> [account] </td>
<td> Returns the list of addresses for the given account. </td>
<td> N
</td></tr>
<tr>
<td> getbalance </td>
<td> [account] [minconf=1] </td>
<td> If [account] is not specified, returns the server's total available balance.<br />If [account] is specified, returns the balance in the account. </td>
<td> N
</td></tr>
<tr>
<td> getblock </td>
<td> [hash] </td>
<td> Returns information about the given block hash. </td>
<td> N
</td></tr>
<tr>
<td> getblockcount </td>
<td> </td>
<td> Returns the number of blocks in the longest block chain. </td>
<td> N
</td></tr>
<tr>
<td> getblockhash </td>
<td> [index] </td>
<td> Returns hash of block in best-block-chain at <index< </td>
<td> N
</td></tr>
<tr>
<td> getblocknumber </td>
<td> </td>
<td> <b>Deprecated</b>. Use getblockcount. </td>
<td> N
</td></tr>
<tr>
<td> getconnectioncount </td>
<td> </td>
<td> Returns the number of connections to other nodes. </td>
<td> N
</td></tr>
<tr>
<td> getdifficulty </td>
<td> </td>
<td> Returns the proof-of-work difficulty as a multiple of the minimum difficulty. </td>
<td> N
</td></tr>
<tr>
<td> getgenerate </td>
<td> </td>
<td> Returns true or false whether verged is currently generating hashes </td>
<td> N
</td></tr>
<tr>
<td> gethashespersec </td>
<td> </td>
<td> Returns a recent hashes per second performance measurement while generating. </td>
<td> N
</td></tr>
<tr>
<td> getinfo </td>
<td> </td>
<td> Returns an object containing various state info. </td>
<td> N
</td></tr>
<tr>
<td> getmemorypool </td>
<td> [data] </td>
<td> If [data] is not specified, returns data needed to construct a block to work on:
<ul><li> "version": block version
</li><li> "previousblockhash": hash of current highest block
</li><li> "transactions": contents of non-coinbase transactions that should be included in the next block
</li><li> "coinbasevalue": maximum allowable input to coinbase transaction, including the generation award and transaction fees
</li><li> "time": timestamp appropriate for next block
</li><li> "bits": compressed target of next block
</li></ul>
<p>If [data] is specified, tries to solve the block and returns true if it was successful.
</p>
</td>
<td> N
</td></tr>
<tr>
<td> getmininginfo </td>
<td> </td>
<td> Returns an object containing mining-related information:
<ul><li> blocks
</li><li> currentblocksize
</li><li> currentblocktx
</li><li> difficulty
</li><li> errors
</li><li> generate
</li><li> genproclimit
</li><li> hashespersec
</li><li> pooledtx
</li><li> testnet
</li></ul>
</td>
<td> N
</td></tr>
<tr>
<td> getnewaddress </td>
<td> [account] </td>
<td> Returns a new verge address for receiving payments.  If [account] is specified (recommended), it is added to the address book so payments received with the address will be credited to [account]. </td>
<td> N
</td></tr>
<tr>
<td> getreceivedbyaccount </td>
<td> [account] [minconf=1] </td>
<td> Returns the total amount received by addresses with [account] in transactions with at least [minconf] confirmations. If [account] not provided return will include all transactions to all accounts. (version 0.3.24-beta) </td>
<td> N
</td></tr>
<tr>
<td> getreceivedbyaddress </td>
<td> [vergeaddress] [minconf=1] </td>
<td> Returns the total amount received by <vergeaddress< in transactions with at least [minconf] confirmations. While some might consider this obvious, value reported by this only considers *receiving* transactions. It does not check payments that have been made *from* this address. In other words, this is not "getaddressbalance". Works only for addresses in the local wallet, external addresses will always show 0. </td>
<td> N
</td></tr>
<tr>
<td> gettransaction </td>
<td> [txid] </td>
<td> Returns an object about the given transaction containing:
<ul><li> "amount": total amount of the transaction
</li><li> "confirmations":  number of confirmations of the transaction
</li><li> "txid": the transaction ID
</li><li> "time": time the transaction occurred
</li><li> "details" - An array of objects containing:
<ul><li> "account"
</li><li> "address"
</li><li> "category"
</li><li> "amount"
</li></ul>
</li></ul>
</td>
<td> N
</td></tr>
<tr>
<td> getwork </td>
<td> [data] </td>
<td> If [data] is not specified, returns formatted hash data to work on:
<ul><li> "midstate": precomputed hash state after hashing the first half of the data
</li><li> "data": block data
</li><li> "hash1": formatted hash buffer for second hash
</li><li> "target": little endian hash target
</li></ul>
<p>If [data] is specified, tries to solve the block and returns true if it was successful.
</p>
</td>
<td> N
</td></tr>
<tr>
<td> help </td>
<td> [command] </td>
<td> List commands, or get help for a command. </td>
<td> N
</td></tr>
<tr>
<td> importprivkey </td>
<td> [vergeprivkey] [label] </td>
<td> Adds a private key (as returned by dumpprivkey) to your wallet. </td>
<td> Y
</td></tr>
<tr>
<td> keypoolrefill </td>
<td> </td>
<td> Fills the keypool, requires wallet passphrase to be set. </td>
<td> Y
</td></tr>
<tr>
<td> listaccounts </td>
<td> [minconf=1] </td>
<td> Returns Object that has account names as keys, account balances as values. </td>
<td> N
</td></tr>
<tr>
<td> listreceivedbyaccount </td>
<td> [minconf=1] [includeempty=false] </td>
<td> Returns an array of objects containing:
<ul><li> "account": the account of the receiving addresses
</li><li> "amount": total amount received by addresses with this account
</li><li> "confirmations": number of confirmations of the most recent transaction included
</li></ul>
</td>
<td> N
</td></tr>
<tr>
<td> listreceivedbyaddress </td>
<td> [minconf=1] [includeempty=false] </td>
<td> Returns an array of objects containing:
<ul><li> "address": receiving address
</li><li> "account": the account of the receiving address
</li><li> "amount": total amount received by the address
</li><li> "confirmations": number of confirmations of the most recent transaction included
</li></ul>
<p>To get a list of accounts on the system, execute verged listreceivedbyaddress 0 true
</p>
</td>
<td> N
</td></tr>
<tr>
<td> listsinceblock</td>
<td> [blockhash] [target-confirmations] </td>
<td> Get all transactions in blocks since block [blockhash], or all transactions if omitted. </td>
<td> N
</td></tr>
<tr>
<td> listtransactions </td>
<td> [account] [count=10] [from=0] </td>
<td> Returns up to [count] most recent transactions skipping the first [from] transactions for account [account]. If [account] not provided will return recent transaction from all accounts.
</td>
<td> N
</td></tr>
<tr>
<td> move </td>
<td> [fromaccount] [toaccount] [amount] [minconf=1] [comment] </td>
<td> Move from one account in your wallet to another </td>
<td> N
</td></tr>
<tr>
<td> sendfrom </td>
<td> [fromaccount] [tovergeaddress] [amount] [minconf=1] [comment] [comment-to] </td>
<td> <amount< is a real and is rounded to 8 decimal places. Will send the given amount to the given address, ensuring the account has a valid balance using [minconf] confirmations. Returns the transaction ID if successful (not in JSON object). </td>
<td> Y
</td></tr>
<tr>
<td> sendmany </td>
<td> [fromaccount] [address:amount,...] [minconf=1] [comment] </td>
<td> amounts are double-precision floating point numbers </td>
<td> Y
</td></tr>
<tr>
<td> sendtoaddress </td>
<td> [vergeaddress] [amount] [comment] [comment-to] </td>
<td> <amount< is a real and is rounded to 8 decimal places. Returns the transaction ID <txid< if successful. </td>
<td> Y
</td></tr>
<tr>
<td> setaccount </td>
<td> [vergeaddress] [account] </td>
<td> Sets the account associated with the given address. Assigning address that is already assigned to the same account will create a new address associated with that account. </td>
<td> N
</td></tr>
<tr>
<td> setgenerate </td>
<td> [generate] [genproclimit] </td>
<td> [generate] is true or false to turn generation on or off.

Generation is limited to [genproclimit] processors, -1 is unlimited. </td>
<td> N
</td></tr>
<tr>
<td> signmessage </td>
<td> [vergeaddress] [message] </td>
<td> Sign a message with the private key of an address. </td>
<td> Y
</td></tr>
<tr>
<td> settxfee </td>
<td> [amount] </td>
<td> [amount] is a real and is rounded to the nearest 0.00000001 </td>
<td> N
</td></tr>
<tr>
<td> stop </td>
<td> </td>
<td> Stop verge server. </td>
<td> N
</td></tr>
<tr>
<td> validateaddress </td>
<td> [vergeaddress] </td>
<td> Return information about [vergeaddress]. </td>
<td> N
</td></tr>
<tr>
<td> verifymessage </td>
<td> [vergeaddress] [signature] [message] </td>
<td> Verify a signed message. </td>
<td> N
</td></tr>
<tr>
<td> walletlock </td>
<td>  </td>
<td> Removes the wallet encryption key from memory, locking the wallet. After calling this method,  you will need to call walletpassphrase again before being able to call any methods which require the wallet to be unlocked. </td>
<td> N
</td></tr>
<tr>
<td> walletpassphrase </td>
<td> [passphrase] [timeout] </td>
<td> Stores the wallet decryption key in memory for <timeout< seconds. </td>
<td> N
</td></tr>
<tr>
<td> walletpassphrasechange </td>
<td> [oldpassphrase] [newpassphrase] </td>
<td> Changes the wallet passphrase from <oldpassphrase< to <newpassphrase<. </td>
<td> N
</td></tr></table>

## Options

You may pass options to the initialization function or to the `set` method.

```js

var verge = require('verge')({
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
var verge = require('node-verge')({
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

var verge = require('node-verge')({
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

var verge = require('node-verge')({
  user: 'rpcusername',
  pass: 'rpcpassword',
  https: true,
  ca: ca
})
```

## Testing

```
npm install -g nodeunit

nodeunit test/test-node-verge.js
```

## Bounties

[VERGE](http://www.vergecurrency.com) donation address is DPNC2H2pYUCSebQ992GyeRTRuWw3hCTBwD

Donations in [verge](http://www.vergecurrency.com) will be used for bounties, and holding. As a side note: I encourage all GitHub repository owners to post a donation address so their community can easily support development financially.



