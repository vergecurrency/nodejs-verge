export interface RPCErrorResponse {
	code: number
	message: string
	data?: unknown
}

export interface RPCResponse<Result = unknown> {
	error: RPCErrorResponse | null
	result: Result
	id: number
}
