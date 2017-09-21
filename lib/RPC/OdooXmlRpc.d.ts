export interface IOdooXmlRpcConfiguration {
    url: string;
    db: string;
    port?: number;
    username: string;
    password: string;
}
export declare enum XmlRpcPath {
    common = "/xmlrpc/2/common",
    object = "/xmlrpc/2/object",
    report = "/xmlrpc/2/report",
}
export declare enum OdooMethods {
    authenticate = "authenticate",
    execute_kw = "execute_kw",
    exec_workflow = "exec_workflow",
    render_report = "render_report",
}
export declare class OdooXmlRpc {
    constructor(config: IOdooXmlRpcConfiguration);
    protected host: string;
    protected port: number;
    protected db: string;
    protected username: string;
    protected password: string;
    protected secure: boolean;
    protected uid: string;
    connect(): Promise<any>;
    execute_kw(model: any, method: any, params: any): Promise<any>;
    exec_workflow(model: any, method: any, params: any): Promise<any>;
    render_report(report: any, params: any): Promise<any>;
    protected parseConfiguration(config: IOdooXmlRpcConfiguration): void;
    protected static concatParameters(model: any, method: any, ...parameters: any[]): any[];
    protected getClientOptions(pathType: XmlRpcPath): {
        host: string;
        port: number;
        path: string;
    };
    protected genericCall(method: OdooMethods, path: XmlRpcPath, parameters: any[]): Promise<any>;
}
