import {inject, injectable} from "inversify";
import {ILogger} from "../Logger/ILogger";
import {OdooConfiguration} from "../Config/OdooConfiguration";
import {OdooRpc} from "../RPC/OdooRpc";
import {OdooCompany} from "../Config/OdooCompany";
import {OdooSearchResult} from "../RPC/OdooSearchResult";
import {IrModel} from "../Entities/Common/IrModel";

@injectable()
export class OdooModel {

    @inject(ILogger)
    protected logger: ILogger;

    @inject(OdooConfiguration)
    protected config: OdooConfiguration;

    @inject(OdooRpc)
    protected odoo: OdooRpc;

    protected model = "ir.model";

    protected fields = [];

    public getModels(query = [], fields = []) {
        if (!fields || fields.length < 1) {
            fields = [
                "product_id", "partner_id", "filter", "company_id", "move_ids",
                "package_id", "state", "lot_id", "date", "line_ids", "location_id",
                "accounting_date", "name", "display_name", "__last_update"
            ];
        }

        return this.odoo.searchReadWithCount(null, this.model, query, fields)
            .then(items => {
                return items.map(res => {
                    const r = new OdooSearchResult();
                    r.company = res.company;
                    r.items = res.items;
                    return r;
                });
            });
    }

}