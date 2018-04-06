/**
 * Type class
 * 
 * Save all proto's names in this format:
 * [parent, child, child, ...]
 * 
 */
export default class {
    /**
     * Return a new Type with the parent proto
     * 
     * @param {String} proto 
     */
    constructor (proto) {
        this._protos = [proto];
    }

    /**
     * Add a new proto to array's protos
     * 
     * @param {String} proto
     * @return void
     */
    addProto (proto) {
        this._protos.push(proto);
    }

    /**
     * Check if 'proto' is in this._protos
     *  
     * @param {String} proto 
     * @return Boolean
     */
    hasSomeProto (proto) {
        return this._protos.some(p => p === proto);
    }

    /**
     * Get parent proto
     * 
     * @return void 
     */
    getParentProto () {
        return this._protos[0];
    }

    /**
     * Get proto's children
     * 
     * @return void
     */
    getChildrenProtos () {
        return this._protos.slice(1);
    }

}