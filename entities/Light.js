import * as THREE from 'three';
import Entity from "../Entity";

export default class extends Entity {
    constructor(entityObj) {
      super(entityObj);

      let { type, color, intensity } = this.config;

      let light = null;

      switch (type)
      {
        case "Directional":
          light = new THREE.DirectionalLight(color, intensity);
          break;

        case "Ambient":
          light = new THREE.AmbientLight(color, intensity);
          break;

        default:
          light = new THREE.DirectionalLight("#FFFFEE", 1);
          break;
      }

      if(light)
      {
        // this.transform.position.getThreeVector3();
        light.position.set(...this.transform.position.getComponents());
        this.setThreeObject3D(light);
      }
    }
}
