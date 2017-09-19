/*
*
* Author: Faisal Sami
* mail: faisalsami78@gmail.com
* https://github.com/faisalsami/odoo-xmlrpc
*
* Translated to Typescript + use Promise
*/

import * as xmlrpc from "xmlrpc";
import * as url from "url";

export interface IOdooXmlRpcConfiguration {
    url: string;
    db: string;
    port?: number;
    username: string;
    password: string;
}

export enum XmlRpcPath {
    common = "/xmlrpc/2/common",
    object = "/xmlrpc/2/object",
    report = "/xmlrpc/2/report"
}

export enum OdooMethods {
    authenticate = "authenticate",
    execute_kw = "execute_kw",
    exec_workflow = "exec_workflow",
    render_report = "render_report",
}

export class OdooXmlRpc {

    public constructor(config: IOdooXmlRpcConfiguration) {
        this.parseConfiguration(config);
    }

    protected host: string;
    protected port: number;
    protected db: string;
    protected username: string;
    protected password: string;
    protected secure: boolean;
    protected uid: string;

    public connect(): Promise<any> {
        return this.genericCall(OdooMethods.authenticate, XmlRpcPath.common, [{}])
            .then(uid => {
                this.uid = uid;
                return this;
            });
    }

    public execute_kw(model, method, params): Promise<any> {
        const fparams = OdooXmlRpc.concatParameters(model, method, params);
        return this.genericCall(OdooMethods.execute_kw, XmlRpcPath.object, fparams);
    }

    public exec_workflow(model, method, params): Promise<any> {
        const fparams = OdooXmlRpc.concatParameters(model, method, params);
        return this.genericCall(OdooMethods.exec_workflow, XmlRpcPath.object, fparams);
    }

    public render_report(report, params): Promise<any> {
        const fparams = OdooXmlRpc.concatParameters(report, undefined, params);
        return this.genericCall(OdooMethods.render_report, XmlRpcPath.report, fparams);
    }

    protected parseConfiguration(config: IOdooXmlRpcConfiguration): void {
        const urlParts = url.parse(config.url);
        this.host = urlParts.hostname;
        this.port = config.port || +urlParts.port;
        this.db = config.db;
        this.username = config.username;
        this.password = config.password;
        this.secure = (urlParts.protocol === "https:");
    }

    protected static concatParameters(model, method, ...parameters: any[]): any[] {
        let fparams = [model];
        if (method !== undefined) {
            fparams.push(method);
        }
        return fparams.concat(parameters);
    }

    protected getClientOptions(pathType: XmlRpcPath): { host: string, port: number, path: string } {
        return {
            host: this.host,
            port: this.port,
            path: pathType
        };
    }

    protected genericCall(method: OdooMethods, path: XmlRpcPath, parameters: any[]): Promise<any> {
        const clientOptions = this.getClientOptions(path);
        let client;
        if (this.secure === false) {
            client = xmlrpc.createClient(clientOptions);
        } else {
            client = xmlrpc.createSecureClient(clientOptions);
        }
        let params = [
            this.db,
            this.uid || this.username,
            this.password
        ];
        params = params.concat(parameters);

        return new Promise((success, error) => {
            client.methodCall(method, params, function (err, value) {
                if (err) {
                    error(err);
                    return;
                }
                success(value);
            });
        });
    }
}
