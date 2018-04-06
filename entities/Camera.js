import * as THREE from 'three';
import Entity from "../Entity";

export default class extends Entity {
    constructor(entityObj) {
      super(entityObj);

      let { type, name } = this.config;
      let camera = null;

      switch(type)
      {
        case "Perspective":
          camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
          break;
      }

      if(camera)
      {
        camera.name = name;
        camera.position.set(...this.transform.position.getComponents());
        camera.rotation.set(...this.transform.rotation.getComponents());

        this.setThreeObject3D(camera);
      }
    }

    lookAt (position) {
      this.getThreeObject3D().lookAt(position);
    }
}
