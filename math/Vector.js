import * as THREE from 'three';

export default class {

    constructor (x = 0, y = 0, z = 0) {
        this.components = [x, y, z];
        this.TYPE = "vector";
    }

    getComponents () {
        return this.components;
    }

    getThreeVector3 () {
        let [x, y, z] = this.components;
        return new THREE.Vector3(x, y, z);
    }

    getThreeVector2 () {
        let [x, y] = this.components;
        return new THREE.Vector2(x, y);
    }
};
