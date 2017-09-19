import { ILogger } from "../Logger/ILogger";
import { OdooConfiguration } from "../Config/OdooConfiguration";
import { OdooRpc } from "../RPC/OdooRpc";
import { OdooSearchResult } from "../RPC/OdooSearchResult";
export declare class OdooModel {
    protected logger: ILogger;
    protected config: OdooConfiguration;
    protected odoo: OdooRpc;
    protected model: string;
    protected fields: string[];
    getModels(query?: any[], fields?: any[]): Promise<OdooSearchResult[]>;
}
