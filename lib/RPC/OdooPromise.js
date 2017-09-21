"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Add some function on Promises used by Odoo
 */
class OdooPromise extends Promise {
    constructor(executor) {
        super(executor);
    }
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    load(onfulfilled, onrejected) {
        return new OdooPromise((success, error) => {
        });
    }
    ;
}
exports.OdooPromise = OdooPromise;
//# sourceMappingURL=OdooPromise.js.map