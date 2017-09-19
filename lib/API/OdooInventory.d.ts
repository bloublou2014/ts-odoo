import { ILogger } from "../Logger/ILogger";
import { OdooConfiguration } from "../Config/OdooConfiguration";
import { OdooRpc } from "../RPC/OdooRpc";
export declare class OdooInventory {
    protected logger: ILogger;
    protected config: OdooConfiguration;
    protected odoo: OdooRpc;
}
