import * as THREE from 'three';
import Light from "./Light";

export default class extends Light {
    constructor( entityFile ,scene) {
      super(entityFile,scene);
    }

    init() {
      var directionalLight = new THREE.DirectionalLight(this.entityFile.color, this.entityFile.intensity);
      directionalLight.position.x = this.entityFile.position.x;
      directionalLight.position.y = this.entityFile.position.y;
      directionalLight.position.z = this.entityFile.position.z;

      return directionalLight;
    }
}
