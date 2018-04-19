export declare enum RPCErrorCode {
    /**
     * Your Request wasn't invalid
     */
    RPC_INVALID_REQUEST = -32600,
    /**
     * The method doesn't exisit
     */
    RPC_METHOD_NOT_FOUND = -32601,
    /**
     * Your called method have wrong/invalid parameters
     */
    RPC_INVALID_PARAMS = -32602,
    /**
     * There was an error while processing your  request
     */
    RPC_INTERNAL_ERROR = -32603,
    /**
     * Your inputs couldn't be parsed internally
     */
    RPC_PARSE_ERROR = -32700,
    /**
     * std::exception thrown in command handling
     */
    RPC_MISC_ERROR = -1,
    /**
     * Server is in safe mode, and command is not allowed in safe mode
     */
    RPC_FORBIDDEN_BY_SAFE_MODE = -2,
    /**
     * Unexpected type was passed as parameter
     */
    RPC_TYPE_ERROR = -3,
    /**
     * Invalid address or key
     */
    RPC_INVALID_ADDRESS_OR_KEY = -5,
    /**
     * Ran out of memory during operation
     */
    RPC_OUT_OF_MEMORY = -7,
    /**
     * Invalid, missing or duplicate parameter
     */
    RPC_INVALID_PARAMETER = -8,
    /**
     * Database error
     */
    RPC_DATABASE_ERROR = -20,
    /**
     * Error parsing or validating structure in raw format
     */
    RPC_DESERIALIZATION_ERROR = -22,
    /**
     * Bitcoin is not connected
     */
    RPC_CLIENT_NOT_CONNECTED = -9,
    /**
     * Still downloading initial blocks
     */
    RPC_CLIENT_IN_INITIAL_DOWNLOAD = -10,
    /**
     * Unspecified problem with wallet (key not found etc.)
     */
    RPC_WALLET_ERROR = -4,
    /**
     * Not enough funds in wallet or account
     */
    RPC_WALLET_INSUFFICIENT_FUNDS = -6,
    /**
     * Invalid account name
     */
    RPC_WALLET_INVALID_ACCOUNT_NAME = -11,
    /**
     * Keypool ran out, call keypoolrefill first
     */
    RPC_WALLET_KEYPOOL_RAN_OUT = -12,
    /**
     * Enter the wallet passphrase with walletpassphrase first
     */
    RPC_WALLET_UNLOCK_NEEDED = -13,
    /**
     * The wallet passphrase entered was incorrect
     */
    RPC_WALLET_PASSPHRASE_INCORRECT = -14,
    /**
     *  Command given in wrong wallet encryption state (encrypting an encrypted wallet etc.)
     */
    RPC_WALLET_WRONG_ENC_STATE = -15,
    /**
     * Failed to encrypt the wallet
     */
    RPC_WALLET_ENCRYPTION_FAILED = -16,
    /**
     * Wallet is already unlocked
     */
    RPC_WALLET_ALREADY_UNLOCKED = -17,
}
