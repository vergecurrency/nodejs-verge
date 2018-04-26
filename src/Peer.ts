export interface Peer {
	addr: string
	services: string
	lastsend: number
	lastrecv: number
	conntime: number
	version: number
	subver: string
	inbound: boolean
	releasetime: number
	startingheight: number
	banscore: number
}
