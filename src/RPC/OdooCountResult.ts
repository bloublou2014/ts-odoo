
import {Company} from "../Entities/Common/Company";

export class OdooCountResult {

    /**
     * Requested Company
     */
    public company: Company;

    /**
     * Number of results
     */
    public count: number;
}
