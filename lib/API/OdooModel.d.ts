import { ILogger } from "../Logger/ILogger";
import { OdooConfiguration } from "../Config/OdooConfiguration";
import { OdooRpc } from "../RPC/OdooRpc";
import { OdooSearchResult } from "../RPC/OdooSearchResult";
export declare class OdooModel {
    protected logger: ILogger;
    protected config: OdooConfiguration;
    protected odoo: OdooRpc;
    protected model: string;
    protected fieldsModel: string;
    protected fields: string[];
    protected fieldsFields: string[];
    getModels(query?: any[], fields?: any[]): Promise<OdooSearchResult[]>;
    getFieldsByIds(ids: number[]): Promise<OdooSearchResult[]>;
    getFields(query?: any[], fields?: any[]): Promise<OdooSearchResult[]>;
}
