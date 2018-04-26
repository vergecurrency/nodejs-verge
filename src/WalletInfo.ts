export interface WalletInfo {
	version: string
	protocolversion: number
	walletversion: number
	balance: number
	newmint: number
	stake: number
	blocks: number
	moneysupply: number
	connections: number
	proxy: string
	ip: string
	pow_algo_id: number
	pow_algo: string
	difficulty: number
	difficulty_x17: number
	difficulty_scrypt: number
	difficulty_groestl: number
	difficulty_lyra2re: number
	difficulty_blake: number
	testnet: boolean
	keypoololdest: number
	keypoolsize: number
	paytxfee: number
	errors: string
}
