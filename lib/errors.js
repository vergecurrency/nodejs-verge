module.exports = {
  RPC_INVALID_REQUEST: -32600,
  RPC_METHOD_NOT_FOUND: -32601,
  RPC_INVALID_PARAMS: -32602,
  RPC_INTERNAL_ERROR: -32603,
  RPC_PARSE_ERROR: -32700,

  // General application defined errors
  RPC_MISC_ERROR: -1, // std::exception thrown in command handling
  RPC_FORBIDDEN_BY_SAFE_MODE: -2, // Server is in safe mode, and command is not allowed in safe mode
  RPC_TYPE_ERROR: -3, // Unexpected type was passed as parameter
  RPC_INVALID_ADDRESS_OR_KEY: -5, // Invalid address or key
  RPC_OUT_OF_MEMORY: -7, // Ran out of memory during operation
  RPC_INVALID_PARAMETER: -8, // Invalid, missing or duplicate parameter
  RPC_DATABASE_ERROR: -20, // Database error
  RPC_DESERIALIZATION_ERROR: -22, // Error parsing or validating structure in raw format

  // P2P client errors
  RPC_CLIENT_NOT_CONNECTED: -9, // Bitcoin is not connected
  RPC_CLIENT_IN_INITIAL_DOWNLOAD: -10, // Still downloading initial blocks

  // Wallet errors
  RPC_WALLET_ERROR: -4, // Unspecified problem with wallet (key not found etc.)
  RPC_WALLET_INSUFFICIENT_FUNDS: -6, // Not enough funds in wallet or account
  RPC_WALLET_INVALID_ACCOUNT_NAME: -11, // Invalid account name
  RPC_WALLET_KEYPOOL_RAN_OUT: -12, // Keypool ran out, call keypoolrefill first
  RPC_WALLET_UNLOCK_NEEDED: -13, // Enter the wallet passphrase with walletpassphrase first
  RPC_WALLET_PASSPHRASE_INCORRECT: -14, // The wallet passphrase entered was incorrect
  RPC_WALLET_WRONG_ENC_STATE: -15, /* Command given in
  wrong wallet encryption state (encrypting an encrypted wallet etc.) */
  RPC_WALLET_ENCRYPTION_FAILED: -16, // Failed to encrypt the wallet
  RPC_WALLET_ALREADY_UNLOCKED: -17, // Wallet is already unlocked
};
