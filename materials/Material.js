import Type from '@/Type';

export default class {
    constructor () {
        this._type = new Type("Material");
        this.threeMaterial = null;
    }

    getThreeMaterial () {
        return this.threeMaterial;
    }
}
