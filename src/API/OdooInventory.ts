
import {inject, injectable} from "inversify";
import {ILogger} from "../Logger/ILogger";
import {OdooConfiguration} from "../Config/OdooConfiguration";
import {OdooRpc} from "../RPC/OdooRpc";

@injectable()
export class OdooInventory {

    @inject(ILogger)
    protected logger: ILogger;

    @inject(OdooConfiguration)
    protected config: OdooConfiguration;

    @inject(OdooRpc)
    protected odoo: OdooRpc;

}