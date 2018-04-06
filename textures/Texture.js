import * as THREE from 'three';

export default class {
    constructor() {
        this.threeTexture = null;
        this.FILTERS = {
            LINEAR: 0
        }
    }

    setOption (key, value) {
        this.threeTexture[key] = value;
    }

    setFilter (key, value, filter) {
        switch(name)
        {
            case this.FILTERS.LINEAR:
                this.setOption(key, value, THREE.LinearFilter);
                break;
        }
    }

    getThreeTexture () {
        return this.threeTexture;
    }
}