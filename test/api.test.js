const assert = require('node:assert/strict')
const fs = require('node:fs')
const http = require('node:http')
const test = require('node:test')

const { Client, RPC_COMMANDS } = require('../dist')

test('command catalog matches the current verged registration inventory', () => {
	assert.equal(RPC_COMMANDS.length, 170)
	assert.equal(new Set(RPC_COMMANDS).size, RPC_COMMANDS.length)
	assert.equal(RPC_COMMANDS.filter(command => command.startsWith('smsg')).length, 19)
	assert.equal(RPC_COMMANDS.includes('flushsmgsdb'), true)
})

test('README lists every supported RPC command exactly once', () => {
	const readme = fs.readFileSync('README.md', 'utf8')
	const commandSection = readme.match(
		/<!-- RPC_COMMANDS_START -->([\s\S]*?)<!-- RPC_COMMANDS_END -->/
	)

	assert.notEqual(commandSection, null)
	const rows = commandSection[1].trim().split(/\r?\n/).slice(2)
	const documentedCommands = rows.map(row => {
		const cells = row.match(/^\| `([^`]+)` \| (.+) \|$/)
		assert.notEqual(cells, null, `invalid RPC documentation row: ${row}`)
		assert.notEqual(cells[2].trim(), '')
		return cells[1]
	})
	assert.equal(new Set(documentedCommands).size, documentedCommands.length)
	assert.deepEqual(documentedCommands, RPC_COMMANDS)
})

test('client applies defaults and supplied options', () => {
	const client = new Client({ host: 'rpc.example', port: 12345 })

	assert.equal(client.options.host, 'rpc.example')
	assert.equal(client.options.port, 12345)
	assert.equal(client.options.method, 'POST')
	assert.equal(client.options.https, false)
})

test('client creates a basic authorization header', () => {
	const client = new Client({ user: 'alice', pass: 'secret' })

	assert.equal(
		client.options.headers.Authorization,
		`Basic ${Buffer.from('alice:secret').toString('base64')}`
	)
})

test('RPC command matching is case-insensitive', () => {
	const client = new Client({})

	assert.equal(client.isCommand('getbalance'), true)
	assert.equal(client.isCommand('GETPEERINFO'), true)
	assert.equal(client.isCommand('not-a-command'), false)
})

test('call sends the exact command and preserves falsy positional parameters', async t => {
	const server = http.createServer((request, response) => {
		let body = ''
		request.setEncoding('utf8')
		request.on('data', chunk => {
			body += chunk
		})
		request.on('end', () => {
			const rpcRequest = JSON.parse(body)
			assert.equal(rpcRequest.method, 'smsgsend')
			assert.deepEqual(rpcRequest.params, [
				'from',
				'to',
				'',
				false,
				0,
			])
			response.setHeader('Content-Type', 'application/json')
			response.end(
				JSON.stringify({ id: rpcRequest.id, error: null, result: 'sent' })
			)
		})
	})
	await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
	t.after(() => server.close())
	const address = server.address()
	assert.equal(typeof address, 'object')

	const client = new Client({ host: '127.0.0.1', port: address.port })
	const result = await client.call('smsgsend', 'from', 'to', '', false, 0)

	assert.equal(result, 'sent')
})

test('call dispatches every supported RPC command', async t => {
	const receivedCommands = []
	const server = http.createServer((request, response) => {
		let body = ''
		request.setEncoding('utf8')
		request.on('data', chunk => {
			body += chunk
		})
		request.on('end', () => {
			const rpcRequest = JSON.parse(body)
			receivedCommands.push(rpcRequest.method)
			response.setHeader('Content-Type', 'application/json')
			response.end(
				JSON.stringify({ id: rpcRequest.id, error: null, result: rpcRequest.method })
			)
		})
	})
	await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
	t.after(() => server.close())
	const address = server.address()
	assert.equal(typeof address, 'object')

	const client = new Client({ host: '127.0.0.1', port: address.port })
	for (const command of RPC_COMMANDS) {
		assert.equal(await client.call(command), command)
	}

	assert.deepEqual(receivedCommands, RPC_COMMANDS)
})
