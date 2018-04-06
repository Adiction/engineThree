import * as THREE from 'three';
import Camera from "./Camera";

export default class extends Camera {
    constructor(entityFile) {
      super(entityFile);

      this.threeEntity = new THREE.PerspectiveCamera();
    }

    init() {
      var WIDTH = window.innerWidth,
              HEIGHT = window.innerHeight;
      var perspectiveCamera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 10000);
      perspectiveCamera.name = this.entityFile.name;
      perspectiveCamera.position.set(0, 1.8, -5.5);
      perspectiveCamera.rotation.set(0, 3.14159, 0);
      // perspectiveCamera.lookAt(this.scene.position);
      return perspectiveCamera;
    }
}
