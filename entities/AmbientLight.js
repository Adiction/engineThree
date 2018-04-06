import * as THREE from 'three';
import Light from "./Light";

export default class extends Light {
    constructor( entityFile ,scene) {
      super(entityFile,scene);
    }

    init() {
      var ambientalLight = new THREE.AmbientLight(this.entityFile.color, this.entityFile.intensity);
      ambientalLight.position.x = this.entityFile.position.x;
      ambientalLight.position.y = this.entityFile.position.y;
      ambientalLight.position.z = this.entityFile.position.z;

      return ambientalLight;
    }
}
