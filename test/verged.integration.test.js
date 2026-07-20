const assert = require('node:assert/strict')
const fs = require('node:fs')
const test = require('node:test')

const { Client } = require('../dist')

const integrationTest =
	process.env.VERGED_INTEGRATION === '1' ? test : test.skip

integrationTest(
	'client mines and sends XVG through a regtest verged daemon',
	async () => {
		const cookieFile = process.env.VERGED_COOKIE_FILE
		assert.ok(cookieFile, 'VERGED_COOKIE_FILE must point to the RPC cookie')

		const cookie = fs.readFileSync(cookieFile, 'utf8').trim()
		const separator = cookie.indexOf(':')
		assert.notEqual(separator, -1, 'RPC cookie must contain user and password')

		const client = new Client({
			port: Number(process.env.VERGED_RPC_PORT),
			user: cookie.slice(0, separator),
			pass: cookie.slice(separator + 1),
		})

		const blockchain = await client.call('getblockchaininfo')
		assert.equal(blockchain.chain, 'regtest')
		assert.equal(blockchain.blocks, 0)

		const uptime = await client.call('uptime')
		assert.equal(typeof uptime, 'number')

		const wallets = await client.call('listwallets')
		if (wallets.length === 0) {
			await client.call('createwallet', 'integration')
		}

		// Verge requires COINBASE_MATURITY + 1 confirmations before the
		// wallet considers a mined output spendable (120 + 1 in v26.7).
		const minedBlocks = await client.call('generate', 121)
		assert.equal(minedBlocks.length, 121)
		assert.equal(await client.call('getblockcount'), 121)
		assert.ok((await client.call('getbalance')) > 0)

		const recipient = await client.call('getnewaddress', 'integration-recipient')
		const txid = await client.call('sendtoaddress', recipient, 1)
		assert.match(txid, /^[0-9a-f]{64}$/)

		const confirmationBlocks = await client.call('generate', 1)
		assert.equal(confirmationBlocks.length, 1)

		const transaction = await client.call('gettransaction', txid)
		assert.equal(transaction.txid, txid)
		assert.ok(transaction.confirmations >= 1)

		const blockHash = await client.call('getblockhash', 122)
		const block = await client.call('getblock', blockHash)
		assert.equal(block.hash, blockHash)
		assert.ok(block.tx.includes(txid))
	}
)
