import { API } from './API';
import { RPCErrorCode } from './RPCErrorCode';
import { ClientOption } from './ClientOption';
export declare class Client extends API {
    options: ClientOption;
    errors: RPCErrorCode[];
    constructor(options: ClientOption);
    private invalid(command);
    private send(command, ...args);
    private exec(command);
    private auth(user, pass);
    private unlock(command, args, fn);
    getBalance(account?: string): Promise<number>;
}
