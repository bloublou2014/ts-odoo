import {Company} from "../Entities/Common/Company";

export class OdooSearchResult {

    /**
     * Requested Company
     */
    public company: Company;

    /**
     * Results
     */
    public items: any[];
}
