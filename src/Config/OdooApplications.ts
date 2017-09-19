import {OdooInventoryConfiguration} from "./OdooInventoryConfiguration";
import {OdooXmlRpcConfiguration} from "./OdooXmlRpcConfiguration";

export class OdooApplications {

    public inventory: OdooInventoryConfiguration = new OdooInventoryConfiguration();

    public xmlRpc: OdooXmlRpcConfiguration = new OdooXmlRpcConfiguration();

}