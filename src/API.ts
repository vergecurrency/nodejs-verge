import { Client } from './Client'
import { Transaction } from './Transaction'
import { Block } from './Block'
import { WalletInfo } from './WalletInfo'
import { Peer } from './Peer'

export abstract class API {
	commands: Array<string> = new Array(
		'addMultiSigAddress',
		'backupWallet',
		'createRawTransaction',
		'decodeRawTransaction',
		'dumpPrivKey',
		'encryptWallet',
		'getAccount',
		'getAccountAddress',
		'getAddressesByAccount',
		'getBalance',
		'getBlock',
		'getBlockCount',
		'getBlockHash',
		'getConnectionCount',
		'getDifficulty',
		'getGenerate',
		'getHashesPerSec',
		'getInfo',
		'getMemoryPool',
		'getMiningInfo',
		'getNewAddress',
		'getRawTransaction',
		'getReceivedByAccount',
		'getReceivedByAddress',
		'getTransaction',
		'getWork',
		'help',
		'importPrivKey',
		'importAddress',
		'keyPoolRefill',
		'listAccounts',
		'listReceivedByAccount',
		'listReceivedByAddress',
		'listSinceBlock',
		'listTransactions',
		'listUnspent',
		'move',
		'sendFrom',
		'sendMany',
		'sendRawTransaction',
		'sendToAddress',
		'setAccount',
		'setGenerate',
		'setTxFee',
		'signMessage',
		'signRawTransaction',
		'stop',
		'validateAddress',
		'verifyMessage',
		'walletLock',
		'walletPassphrase',
		'walletPassphraseChange'
	)

	isCommand(command: string): boolean {
		const lowerCommand: string = command.toLowerCase()

		var lowerCaseCommands = this.getCommands().map((item: string) =>
			item.toLowerCase()
		)

		return lowerCaseCommands.indexOf(lowerCommand) !== -1
	}

	getCommands(): Array<string> {
		return this.commands
	}

	/*abstract addMultiSigAddress(
    nrequire: string,
    keys: string[],
    account: string
  ): Promise<string>

  abstract backupWallet(destination: string): Promise<null>

  abstract createRawTransaction(
    transactions: Transaction[],
    sendAddressAndAmount: any
  ): Promise<string>

  abstract decodeRawTransaction(hexString: string): Promise<Transaction>

  abstract dumpPrivKey(address: string): Promise<string>

  abstract encryptWallet(passphrase: string): Promise<string>

  abstract getAccount(address: string): Promise<string>
  abstract getAccountAddress(account: string): Promise<string>
  abstract getAddressesByAccount(account: string): Promise<string>*/

	abstract getBalance(account?: string): Promise<number>

	/*abstract getBlock(hash: string, txinfo?: string): Promise<Block>

  abstract getBlockCount(): Client

  abstract getBlockHash(): Client

  abstract getConnectionCount(): Client

  abstract getDifficulty(): Client

  abstract getGenerate(): Client

  abstract getHashesPerSec(): Client*/

	abstract getInfo(): Promise<WalletInfo>

	abstract getPeerInfo(): Promise<Array<Peer>>

	/*abstract getMemoryPool(): Client

  abstract getMiningInfo(): Client

  abstract getNewAddress(): Client

  abstract getRawTransaction(): Client

  abstract getReceivedByAccount(): Client

  abstract getReceivedByAddress(): Client

  abstract getTransaction(): Client

  abstract getWork(): Client

  abstract help(): Client

  abstract importPrivKey(): Client

  abstract importAddress(): Client

  abstract keyPoolRefill(): Client

  abstract listAccounts(): Client

  abstract listReceivedByAccount(): Client

  abstract listReceivedByAddress(): Client

  abstract listSinceBlock(): Client

  abstract listTransactions(): Client

  abstract listUnspent(): Client

  abstract move(): Client

  abstract sendFrom(): Client

  abstract sendMany(): Client

  abstract sendRawTransaction(): Client

  abstract sendToAddress(): Client

  abstract setAccount(): Client

  abstract setGenerate(): Client

  abstract setTxFee(): Client

  abstract signMessage(): Client

  abstract signRawTransaction(): Client

  abstract stop(): Client

  abstract validateAddress(): Client

  abstract verifyMessage(): Client

  abstract walletLock(): Client

  abstract walletPassphrase(): Client

  abstract walletPassphraseChange(): Client*/
}
