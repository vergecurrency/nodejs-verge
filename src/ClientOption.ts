import { OutgoingHttpHeaders } from 'node:http'

export type PassphraseCallback = (
	command: string,
	args: readonly unknown[],
	callback: (error: Error | null, passphrase?: string, timeout?: number) => void
) => void

export interface ClientOption {
	host?: string
	port?: number
	method?: string
	user?: string
	pass?: string
	headers?: OutgoingHttpHeaders
	passphrasecallback?: PassphraseCallback
	https?: boolean
	ca?: string | Buffer | Array<string | Buffer>
}
