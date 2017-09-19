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

    protected fields = [
        "info", "access_ids", "name", "field_id", "modules",
        "state", "transient", "model", "view_ids", "id",
        "display_name", "__last_update"
    ];

    public getModels(query = [], fields = []) {
        if (!fields || fields.length < 1) {
            fields = this.fields;
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