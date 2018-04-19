"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RPCErrorCode;
(function (RPCErrorCode) {
    /**
     * Your Request wasn't invalid
     */
    RPCErrorCode[RPCErrorCode["RPC_INVALID_REQUEST"] = -32600] = "RPC_INVALID_REQUEST";
    /**
     * The method doesn't exisit
     */
    RPCErrorCode[RPCErrorCode["RPC_METHOD_NOT_FOUND"] = -32601] = "RPC_METHOD_NOT_FOUND";
    /**
     * Your called method have wrong/invalid parameters
     */
    RPCErrorCode[RPCErrorCode["RPC_INVALID_PARAMS"] = -32602] = "RPC_INVALID_PARAMS";
    /**
     * There was an error while processing your  request
     */
    RPCErrorCode[RPCErrorCode["RPC_INTERNAL_ERROR"] = -32603] = "RPC_INTERNAL_ERROR";
    /**
     * Your inputs couldn't be parsed internally
     */
    RPCErrorCode[RPCErrorCode["RPC_PARSE_ERROR"] = -32700] = "RPC_PARSE_ERROR";
    // --- Genearl client errors ---
    /**
     * std::exception thrown in command handling
     */
    RPCErrorCode[RPCErrorCode["RPC_MISC_ERROR"] = -1] = "RPC_MISC_ERROR";
    /**
     * Server is in safe mode, and command is not allowed in safe mode
     */
    RPCErrorCode[RPCErrorCode["RPC_FORBIDDEN_BY_SAFE_MODE"] = -2] = "RPC_FORBIDDEN_BY_SAFE_MODE";
    /**
     * Unexpected type was passed as parameter
     */
    RPCErrorCode[RPCErrorCode["RPC_TYPE_ERROR"] = -3] = "RPC_TYPE_ERROR";
    /**
     * Invalid address or key
     */
    RPCErrorCode[RPCErrorCode["RPC_INVALID_ADDRESS_OR_KEY"] = -5] = "RPC_INVALID_ADDRESS_OR_KEY";
    /**
     * Ran out of memory during operation
     */
    RPCErrorCode[RPCErrorCode["RPC_OUT_OF_MEMORY"] = -7] = "RPC_OUT_OF_MEMORY";
    /**
     * Invalid, missing or duplicate parameter
     */
    RPCErrorCode[RPCErrorCode["RPC_INVALID_PARAMETER"] = -8] = "RPC_INVALID_PARAMETER";
    /**
     * Database error
     */
    RPCErrorCode[RPCErrorCode["RPC_DATABASE_ERROR"] = -20] = "RPC_DATABASE_ERROR";
    /**
     * Error parsing or validating structure in raw format
     */
    RPCErrorCode[RPCErrorCode["RPC_DESERIALIZATION_ERROR"] = -22] = "RPC_DESERIALIZATION_ERROR";
    // --- P2P client errors ---
    /**
     * Bitcoin is not connected
     */
    RPCErrorCode[RPCErrorCode["RPC_CLIENT_NOT_CONNECTED"] = -9] = "RPC_CLIENT_NOT_CONNECTED";
    /**
     * Still downloading initial blocks
     */
    RPCErrorCode[RPCErrorCode["RPC_CLIENT_IN_INITIAL_DOWNLOAD"] = -10] = "RPC_CLIENT_IN_INITIAL_DOWNLOAD";
    // Wallet errors
    /**
     * Unspecified problem with wallet (key not found etc.)
     */
    RPCErrorCode[RPCErrorCode["RPC_WALLET_ERROR"] = -4] = "RPC_WALLET_ERROR";
    /**
     * Not enough funds in wallet or account
     */
    RPCErrorCode[RPCErrorCode["RPC_WALLET_INSUFFICIENT_FUNDS"] = -6] = "RPC_WALLET_INSUFFICIENT_FUNDS";
    /**
     * Invalid account name
     */
    RPCErrorCode[RPCErrorCode["RPC_WALLET_INVALID_ACCOUNT_NAME"] = -11] = "RPC_WALLET_INVALID_ACCOUNT_NAME";
    /**
     * Keypool ran out, call keypoolrefill first
     */
    RPCErrorCode[RPCErrorCode["RPC_WALLET_KEYPOOL_RAN_OUT"] = -12] = "RPC_WALLET_KEYPOOL_RAN_OUT";
    /**
     * Enter the wallet passphrase with walletpassphrase first
     */
    RPCErrorCode[RPCErrorCode["RPC_WALLET_UNLOCK_NEEDED"] = -13] = "RPC_WALLET_UNLOCK_NEEDED";
    /**
     * The wallet passphrase entered was incorrect
     */
    RPCErrorCode[RPCErrorCode["RPC_WALLET_PASSPHRASE_INCORRECT"] = -14] = "RPC_WALLET_PASSPHRASE_INCORRECT";
    /**
     *  Command given in wrong wallet encryption state (encrypting an encrypted wallet etc.)
     */
    RPCErrorCode[RPCErrorCode["RPC_WALLET_WRONG_ENC_STATE"] = -15] = "RPC_WALLET_WRONG_ENC_STATE";
    /**
     * Failed to encrypt the wallet
     */
    RPCErrorCode[RPCErrorCode["RPC_WALLET_ENCRYPTION_FAILED"] = -16] = "RPC_WALLET_ENCRYPTION_FAILED";
    /**
     * Wallet is already unlocked
     */
    RPCErrorCode[RPCErrorCode["RPC_WALLET_ALREADY_UNLOCKED"] = -17] = "RPC_WALLET_ALREADY_UNLOCKED";
})(RPCErrorCode = exports.RPCErrorCode || (exports.RPCErrorCode = {}));
