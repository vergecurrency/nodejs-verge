export { API, RPC_COMMANDS, RPCCommand } from './API'
export { Client, RPCError } from './Client'
export { ClientOption, PassphraseCallback } from './ClientOption'

/* for testing with a local maschine. 
  to prove that this is working :)

const myClient: Client = new Client({
	pass: 'lolcat',
	user: 'kyon',
})

myClient.unlockWallet('')*/
