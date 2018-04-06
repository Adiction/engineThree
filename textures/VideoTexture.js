import Texture from './Texture';
import * as THREE from 'three';

export default class extends Texture {
    constructor(video) {
        super();

        this.threeTexture = new THREE.VideoTexture(video); 
    }
}