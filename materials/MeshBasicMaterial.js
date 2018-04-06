import Material from './Material';
import * as THREE from 'three';

export default class extends Material {
    constructor (options) {
        super();
        this._type.addProto("MeshBasicMaterial");
        if(options)
        {
            this.map = (options.map)? options.map.getThreeTexture() : undefined;
            this.overdraw = options.overdraw || false;
            
            this.threeMaterial = new THREE.MeshBasicMaterial({
                map: this.map,
                overdraw: this.overdraw
            });
        }
        else
        {
            this.threeMaterial = new THREE.MeshBasicMaterial();
        }
        
    }
}