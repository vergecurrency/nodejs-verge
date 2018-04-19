export declare abstract class API {
    commands: Array<string>;
    isCommand(command: string): boolean;
    getCommands(): Array<string>;
    abstract getBalance(account?: string): Promise<number>;
}
