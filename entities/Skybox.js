import * as THREE from 'three';
import Entity from "../Entity";

export default class extends Entity {
    constructor(entityObj) {
      super(entityObj);

      let urls = this.config.urls;

      let reflectionCube = new THREE.CubeTextureLoader().load( urls );
      reflectionCube.format = THREE.RGBFormat;

      let shader = THREE.ShaderLib["cube"];
      shader.uniforms["tCube"].value = reflectionCube;
      let material = new THREE.ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
      });

      let skybox = new THREE.Mesh( new THREE.BoxGeometry( this.config.scaleX, this.config.scaleY, this.config.scaleZ ), material );
      this.setThreeObject3D(skybox);
    }
}
