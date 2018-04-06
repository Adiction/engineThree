import Scene from './Scene';
import * as THREE from 'three';
import Renderer from "./Renderer";
import InputManager from "./InputManager";

export default class {

    constructor(context = null, entityFactory, materialFactory,logger) {
        this.currentScene = null;
        this.pause = false;
        this.renderer = null;
        this.context = context;
        this.entityFactory = entityFactory;
        this.materialFactory = materialFactory;
        this.logger = logger;
        this.inputManager = null;
    }
    //Fuera del motor:
    /**
     * class MyScene extends Scene {
     *      constructor() {
     *          super("fileScene.json");
     *      }
     * }
     *
     * let myScene = new MyScene();
     * Game.SceneManager.loadScene(myScene);
     *
    */

    loadScene (scene, onProgress) {
        // if( scene instanceof Scene && scene.update && scene.init ) {
        if(scene.update && scene.init) {
            this.currentScene = scene;
            this.currentScene.addProgressListener(onProgress);
            //A scene should have a method init or something like that

            return new Promise ((resolve,reject) => {
              this.currentScene.init(this.entityFactory, this.inputManager, this.materialFactory,this.logger).then(() => {
                  this.loadConfigs();
                  resolve();
                });
            });
        }
    }

    loadSkyBox () {
    // TODO: revisar proximamente. No puede haber paths absolutos
    //   let path = "src/resources/";
    //   let format = '.jpg';
    //   let urls = [
    //       'src/resources/posx.jpg','src/resources/negx.jpg',
    //       'src/resources/posy.jpg','src/resources/negy.jpg',
    //       'src/resources/posx.jpg','src/resources/negz.jpg'
    //   ];

    //   let reflectionCube = new THREE.CubeTextureLoader().load( urls );
    //   reflectionCube.format = THREE.RGBFormat;

    //   let shader = THREE.ShaderLib["cube"];
    //   shader.uniforms["tCube"].value = reflectionCube;
    //   let material = new THREE.ShaderMaterial({
    //       fragmentShader: shader.fragmentShader,
    //       vertexShader: shader.vertexShader,
    //       uniforms: shader.uniforms,
    //       depthWrite: false,
    //       side: THREE.BackSide
    //   });

    //   let mesh = new THREE.Mesh( new THREE.BoxGeometry( 1000, 1000, 1000 ), material );
    //   this.currentScene.scene.add( mesh );

    }

    /**
     * Set context and set Input manager
     *
     * @param {DOMElement} context
     */
    setContext (context) {
        this.context = context;
        this.inputManager = new InputManager(this.context);
    }

    loadConfigs () {
      //this.loadSkyBox();
      this.renderer = new Renderer(this.logger);
      this.renderer.init( this.currentScene, this.currentScene.file, this.context);
    }

    unLoadScene () {
        //TODO
    }

    update (deltaTime) {
        if(!this.pause && this.currentScene) {
            this.currentScene.update( deltaTime );
        }
    }

    render () {
      if(this.renderer)
        this.renderer.render(this.currentScene);
    }
};
