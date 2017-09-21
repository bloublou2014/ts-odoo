"use strict";
/*
*
* Author: Faisal Sami
* mail: faisalsami78@gmail.com
* https://github.com/faisalsami/odoo-xmlrpc
*
* Translated to Typescript + use Promise
*/
Object.defineProperty(exports, "__esModule", { value: true });
const xmlrpc = require("xmlrpc");
const url = require("url");
var XmlRpcPath;
(function (XmlRpcPath) {
    XmlRpcPath["common"] = "/xmlrpc/2/common";
    XmlRpcPath["object"] = "/xmlrpc/2/object";
    XmlRpcPath["report"] = "/xmlrpc/2/report";
})(XmlRpcPath = exports.XmlRpcPath || (exports.XmlRpcPath = {}));
var OdooMethods;
(function (OdooMethods) {
    OdooMethods["authenticate"] = "authenticate";
    OdooMethods["execute_kw"] = "execute_kw";
    OdooMethods["exec_workflow"] = "exec_workflow";
    OdooMethods["render_report"] = "render_report";
})(OdooMethods = exports.OdooMethods || (exports.OdooMethods = {}));
class OdooXmlRpc {
    constructor(config) {
        this.parseConfiguration(config);
    }
    connect() {
        return this.genericCall(OdooMethods.authenticate, XmlRpcPath.common, [{}])
            .then(uid => {
            this.uid = uid;
            return this;
        });
    }
    execute_kw(model, method, params) {
        const fparams = OdooXmlRpc.concatParameters(model, method, params);
        return this.genericCall(OdooMethods.execute_kw, XmlRpcPath.object, fparams);
    }
    exec_workflow(model, method, params) {
        const fparams = OdooXmlRpc.concatParameters(model, method, params);
        return this.genericCall(OdooMethods.exec_workflow, XmlRpcPath.object, fparams);
    }
    render_report(report, params) {
        const fparams = OdooXmlRpc.concatParameters(report, undefined, params);
        return this.genericCall(OdooMethods.render_report, XmlRpcPath.report, fparams);
    }
    parseConfiguration(config) {
        const urlParts = url.parse(config.url);
        this.host = urlParts.hostname;
        this.port = config.port || +urlParts.port;
        this.db = config.db;
        this.username = config.username;
        this.password = config.password;
        this.secure = (urlParts.protocol === "https:");
    }
    static concatParameters(model, method, ...parameters) {
        let fparams = [model];
        if (method !== undefined) {
            fparams.push(method);
        }
        return fparams.concat(parameters);
    }
    getClientOptions(pathType) {
        return {
            host: this.host,
            port: this.port,
            path: pathType
        };
    }
    genericCall(method, path, parameters) {
        const clientOptions = this.getClientOptions(path);
        let client;
        if (this.secure === false) {
            client = xmlrpc.createClient(clientOptions);
        }
        else {
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
exports.OdooXmlRpc = OdooXmlRpc;
//# sourceMappingURL=OdooXmlRpc.js.map