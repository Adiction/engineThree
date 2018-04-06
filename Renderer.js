import * as THREE from 'three';

export default class {
  constructor (logger) {
    this.logger = logger;
    this.currentScene = null;
    this.isRendering = false;
    this.requestAnim = null;
    this.activeCamera = null;
  }

  init (currentScene, file, context) {
    if(!context) throw "Have you ever set a context?";
    this.currentScene = currentScene;
    this.file = file;

    this.activeCamera = this.currentScene.scene.getObjectByName( this.file.activeCamera );

    if (this.activeCamera) {
      this.activeCamera.aspect = window.innerWidth / window.innerHeight;
    } else {
      this.logger.error("Active camera doesnt exist");
      return;
    }

    // Render options
    let WebGLRendererOptions =
      Object.assign(this.currentScene.file.renderConfig.options, { canvas: context });

    this.renderer = new THREE.WebGLRenderer(WebGLRendererOptions);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);



    //Render config
    let WebGLRendererConfig = this.currentScene.file.renderConfig;

    //Clear colors
    if(WebGLRendererConfig.clearColor && WebGLRendererConfig.alphaClearColor)
      this.renderer.setClearColor(WebGLRendererConfig.clearColor, WebGLRendererConfig.alphaClearColor);

    //Gamma input and output
    if(WebGLRendererConfig.gammaInput)
      this.renderer.gammaInput = WebGLRendererConfig.gammaInput;

    if(WebGLRendererConfig.gammaOutput)
      this.renderer.gammaOutput = WebGLRendererConfig.gammaOutput;

    // document.body.appendChild( this.renderer.domElement );

    window.addEventListener ( 'resize', this.resizeCanvas.bind( this ), false );

    this.isRendering = true;
  }

  //TODO: lo interesante es poder setear la configuracion desde fuera y desde el mismo renderer
  // ademas habria que centralizar eventos. InputManager es un buen lugar
  setConfig (config) {

  }

  // es mucho mas natural hacer render(scene), que hacer render() y no saber que
  // se está renderizando
  // render () {
  //     if(this.isRendering && this.currentScene.scene)  {
  //         this.currentScene.file.activeRayCast ? this.currentScene.rayCasting() : null;
  //         this.renderer.render( this.currentScene.scene,this.activeCamera );
  //     }
  // }

  render (scene) {
      if(this.isRendering && scene) {
        //¿Raycasting in a render?
          //this.currentScene.file.activeRayCast ? this.currentScene.rayCasting() : null;
          this.renderer.render(scene.getThreeScene(), scene.getCamera());
      }
  }

  resizeCanvas () {
    this.activeCamera.aspect = window.innerWidth / window.innerHeight;
    this.activeCamera.updateProjectionMatrix ();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }
}
