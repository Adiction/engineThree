import Material from './Material';
import * as THREE from 'three';

export default class extends Material {
    constructor (options) {
        super();
        this._type.addProto("MeshLambertMaterial");
        this.threeMaterial = new THREE.MeshLambertMaterial();
    }
}