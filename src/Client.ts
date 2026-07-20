import * as http from 'node:http'
import * as https from 'node:https'

import { API, RPCCommand } from './API'
import { ClientOption } from './ClientOption'
import { Peer } from './Peer'
import { RPCErrorCode } from './RPCErrorCode'
import { RPCResponse } from './RPCResponse'
import { WalletInfo } from './WalletInfo'

interface ResolvedClientOption extends http.RequestOptions {
	host: string
	port: number
	method: string
	user: string
	pass: string
	headers: http.OutgoingHttpHeaders
	passphrasecallback?: ClientOption['passphrasecallback']
	https: boolean
}

export class RPCError extends Error {
	constructor(
		message: string,
		readonly code: number,
		readonly data?: unknown
	) {
		super(message)
		this.name = 'RPCError'
	}
}

export class Client extends API {
	readonly options: ResolvedClientOption

	constructor(options: ClientOption = {}) {
		super()
		this.options = {
			host: 'localhost',
			port: 20102,
			method: 'POST',
			user: '',
			pass: '',
			https: false,
			...options,
			headers: {
				Host: options.host ?? 'localhost',
				...options.headers,
			},
		}

		if (this.options.user && this.options.pass) {
			this.options.headers.Authorization = `Basic ${Buffer.from(
				`${this.options.user}:${this.options.pass}`
			).toString('base64')}`
		}
	}

	call<Result = unknown>(
		command: RPCCommand,
		...params: unknown[]
	): Promise<Result> {
		return this.send<Result>(command, params)
	}

	private send<Result>(
		command: RPCCommand,
		params: readonly unknown[]
	): Promise<Result> {
		const rpcData = {
			id: Date.now(),
			method: command,
			params,
		}
		const body = JSON.stringify(rpcData)
		const options: http.RequestOptions = {
			...this.options,
			headers: {
				...this.options.headers,
				'Content-Length': Buffer.byteLength(body),
			},
		}
		const request = this.options.https ? https.request : http.request

		return new Promise<Result>((resolve, reject) => {
			const rpcRequest = request(options, response => {
				let data = ''
				response.setEncoding('utf8')
				response.on('data', chunk => {
					data += chunk
				})
				response.on('end', () => {
					try {
						const rpcResponse = JSON.parse(data) as RPCResponse<Result>
						if (rpcResponse.id !== rpcData.id) {
							throw new Error('RPC response ID does not match the request')
						}
						if (rpcResponse.error) {
							if (
								rpcResponse.error.code ===
									RPCErrorCode.RPC_WALLET_UNLOCK_NEEDED &&
								this.options.passphrasecallback
							) {
								void this.unlockAndRetry<Result>(command, params).then(
									resolve,
									reject
								)
								return
							}
							reject(
								new RPCError(
									rpcResponse.error.message,
									rpcResponse.error.code,
									rpcResponse.error.data
								)
							)
							return
						}
						resolve(rpcResponse.result)
					} catch (error) {
						if (error instanceof RPCError) {
							reject(error)
							return
						}
						const prefix =
							response.statusCode === 200
								? 'Failed to parse RPC response'
								: `RPC request failed with HTTP ${response.statusCode}`
						reject(new Error(`${prefix}: ${data}`))
					}
				})
			})

			rpcRequest.on('error', reject)
			rpcRequest.end(body)
		})
	}

	private async unlockAndRetry<Result>(
		command: RPCCommand,
		params: readonly unknown[]
	): Promise<Result> {
		const callback = this.options.passphrasecallback
		if (!callback) {
			throw new Error('A passphrase callback is required to unlock the wallet')
		}

		const credentials = await new Promise<{
			passphrase: string
			timeout: number
		}>((resolve, reject) => {
			callback(command, params, (error, passphrase, timeout = 1) => {
				if (error) {
					reject(error)
					return
				}
				if (passphrase === undefined) {
					reject(new Error('The passphrase callback returned no passphrase'))
					return
				}
				resolve({ passphrase, timeout })
			})
		})

		await this.send('walletpassphrase', [
			credentials.passphrase,
			credentials.timeout,
		])
		return this.send<Result>(command, params)
	}

	unlockWallet(passphrase: string, timeout = 1): Promise<unknown> {
		return this.call('walletpassphrase', passphrase, timeout)
	}

	getBalance(account?: string): Promise<number> {
		return account === undefined
			? this.call<number>('getbalance')
			: this.call<number>('getbalance', account)
	}

	getInfo(): Promise<WalletInfo> {
		return this.call<WalletInfo>('getinfo')
	}

	getPeerInfo(): Promise<Peer[]> {
		return this.call<Peer[]>('getpeerinfo')
	}
}
