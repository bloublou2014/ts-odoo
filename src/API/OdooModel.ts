import {inject, injectable} from "inversify";
import {ILogger} from "../Logger/ILogger";
import {OdooConfiguration} from "../Config/OdooConfiguration";
import {OdooRpc} from "../RPC/OdooRpc";
import {OdooCompany} from "../Config/OdooCompany";
import {OdooSearchResult} from "../RPC/OdooSearchResult";
import {IrModel} from "../Entities/Common/IrModel";
import {OdooPromise} from "../RPC/OdooPromise";
import * as _ from "lodash";

@injectable()
export class OdooModel {

    @inject(ILogger)
    protected logger: ILogger;

    @inject(OdooConfiguration)
    protected config: OdooConfiguration;

    @inject(OdooRpc)
    protected odoo: OdooRpc;

    protected model = "ir.model";
    protected fieldsModel = "ir.model.fields";


    protected fields = [
        "info", "access_ids", "name", "field_id", "modules",
        "state", "transient", "model", "view_ids", "id",
        "display_name", "__last_update"
    ];


    protected fieldsFields = [
        "name", "field_description", "ttype", "required", "readonly", "index", "state"
    ];


    /*

        protected searchRelatedInfo<T>(items): OdooPromise<T[]> {
            // get T Annotations
            return new OdooPromise((success, error) => {

            })
                .load();
        }
    */

    public getModels(query = [], fields = []) {
        if (!fields || fields.length < 1) {
            fields = this.fields;
        }

        return this.odoo.searchReadWithCount(null, this.model, query, fields)
            .then(itemsPerCompany => {
                let fieldsIds = [];
                itemsPerCompany.forEach(res => {
                    res.items.forEach(item => {
                        fieldsIds = fieldsIds.concat(item.field_id);
                    });
                });
                fieldsIds = _.uniq(fieldsIds.sort());
                return this.getFieldsByIds(fieldsIds)
                    .then(fieldsPerCompany => {
                        const fieldsResult = fieldsPerCompany[0].items;
                        // map field ids
                        const fieldsByIds = {};
                        fieldsResult.forEach(field => {
                            fieldsByIds[field.id] = field;
                        });

                        return itemsPerCompany.map(res => {
                            res.items.forEach(item => {
                                // find all fields
                                item.fields = [];
                                item.field_id.forEach(fid => {
                                    if (fieldsByIds[fid]) {
                                        item.fields.push(fieldsByIds[fid]);
                                    }
                                });
                            });

                            const r = new OdooSearchResult();
                            r.company = res.company;
                            r.items = res.items;
                            return r;
                        });
                    });
            });
    }

    public getFieldsByIds(ids: number[]) {
        const query = [["id", "in", ids]];
        return this.getFields(query);
    }

    public getFields(query = [], fields = []) {
        if (!fields || fields.length < 1) {
            fields = this.fieldsFields;
        }

        return this.odoo.searchReadWithCount(null, this.fieldsModel, query, fields)
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