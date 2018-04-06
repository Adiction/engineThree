import JsonLoader from "./loaders/JsonLoader";
import * as THREE from 'three';
import Entity from "./Entity";
import Light from "./entities/Light";
import DirectionalLight from "./entities/DirectionalLight";
import AmbientLight from "./entities/AmbientLight";
import Camera from "./entities/Camera";
import PerspectiveCamera from "./entities/PerspectiveCamera";

export default class {
    constructor(sceneFile) {
        this.loader = new JsonLoader();
        // this.manager = new THREE.LoadingManager();
        this.raycaster = new THREE.Raycaster();

        this.file = sceneFile;
        // this.env = envFile;
        this.camera = null;
        this.entities = [];
        this.scene;
        this.loadProgress;
        this.InputManager;
        this.EntityFactory = null;
        this.MaterialFactory = null;
        this.hasRaycast = false;
        this.intersects = [];
        this.rayInteractors = [];
        this.logger = null;

        this.successListeners = [];
        this.errorListeners = [];
        this.progressListeners = [];

        this.EVENTS = {
          CLICK: 0,
          OVER: 1
        };
    }

    addLoadSuccessListener (listener) {
      this.successListeners.push(listener);
    }

    addProgressListener (listener) {
      this.progressListeners.push(listener);
    }

    addLoadErrorListener (listener) {
      this.errorListeners.push(listener);
    }

    /**
    * @function Initialize Scene class.
    *           1- Call the loader managerand listen
    *           2- Load the configutarion scene file
    *           3- Load the scene
    */

    init (EntityFactory, InputManager, MaterialFactory,logger) {
      this.EntityFactory = EntityFactory;
      this.InputManager = InputManager;
      this.MaterialFactory = MaterialFactory;
      this.logger = logger;
      // this.registerProgressFiles();
      return new Promise( (resolve,reject) => {
        this.loader.getObjectFromUrl(this.file)
        .then   (object => {
          this.file = object;

          this.hasRaycast = object.activeRayCast;
          //Set events
          if(this.hasRaycast) this.InputManager.registerMouseMoveEvent();

          //load scene: entities, materials, configs, etc
          this.load(object.env).then(resolve);
          // this.load(object.env).then (()=> {resolve()});
        });
      });
    }

    dispatchEvents () {
      let manager = new THREE.LoadingManager();
      manager.onLoad = () => this.successListeners.map (fn => fn()),
      manager.onError = (resource) => this.errorListeners.map (fn => fn(resource)),
      manager.onProgress = ((resource, itemToLoad, totalItems) => {
          this.progressListeners.map (fn => fn((itemToLoad / totalItems) * 100))
      })

      return manager;
    }

    /**
    * @function Load scene JSON
    * @param    sceneObj -> Name of file to load
    */

    load (sceneObj) {
      return new Promise ((resolve,reject) => {
        new THREE.ObjectLoader (this.dispatchEvents()).load (sceneObj + ".json",
        (loadedScene) => {
          this.logger.info("Scene loaded");
          this.scene = loadedScene;
          this.loadEntities();
          this.MaterialFactory.loadTextures(this.getSceneName(), this.getMaterialFile(), ()=>{
            this.assignTextures();
            this.loaded();
            resolve();
          });
        });
      });
    }

    loaded () {
      //this hook will execute when this.scene is loaded
    }

    loadEntities () {
      this.file.entities.map (entityObj => {

        let entity = this.EntityFactory.getEntityInstanceFromObj(entityObj);

        //set lookat in maincamera
        if(entityObj.config.name === this.file.activeCamera)
        {
          entity.lookAt(this.scene.position);
        }

        //Entity over three object in the scene
        if(entityObj.threeObject)
        {
          entity.setThreeObject3D(this.getObject(entityObj.threeObject));
          if(entityObj.localTransform === void 0 || entityObj.localTransform)
            entity.applyLocalTransform();

          if(entityObj.options)
            entity.applyThreeObjectOptions();

          if(entity.init) {
            entity.init();
            entity.loadAnimations();
            entity.loadPathAnimation();
          }
        }
        //New entity
        else
          this.scene.add(entity.getThreeObject3D());

        //add entity to our entity vector
        this.entities.push(entity);
      });

      //set raycasteables
      this.rayInteractors = this.entities.filter(e => e.type === "Collidable");

      //Raycast debug
      this.scene.add(new THREE.ArrowHelper(this.raycaster.ray.direction, this.raycaster.ray.origin, 100, 0xff0000));
      window.THREE = THREE;
      window.scene = this.scene;

      //set camera
      this.camera = this.scene.getObjectByName(this.file.activeCamera);
      this.logger.info("Entities loaded");
    }

    /**
    * @function Update the entities state
    * @param    deltaTime
    */

    update (deltaTime) {
        //update entities
        if(this.entities.length) {
            for (let entity of this.entities) {
                if(entity.update)
                  entity.update (deltaTime);
            }
        }

        //update raycaster
        if(this.hasRaycast)  this.updateRays();
    }

    getEventString (type) {
        switch (type)
        {
            case this.EVENTS.CLICK:
              return "click";
            case this.EVENTS.OVER:
              return "over";
        }
    }

    registerIntersectsEvents (type, callback) {
        let checkIntersects = (eventType) => {
            if(!this.intersects) return;

            let intersects =
              this.rayInteractors
                .filter (e => this.intersects.some(i => i.object === e.getThreeObject3D()))
                .filter (e => e.events.some(ev => ev === this.getEventString(eventType)));

            if (intersects.length) callback(intersects);
        };

        switch(type)
        {
            case this.EVENTS.CLICK:
              this.InputManager.registerEvent(this.InputManager.EVENTS.CLICK, checkIntersects);
              break;
            case this.EVENTS.OVER:
              this.InputManager.registerEvent(this.InputManager.EVENTS.OVER, checkIntersects);
              break;
        }
    }

    updateRays () {
      this.raycaster.setFromCamera(this.InputManager.getMouse().getThreeVector2(), this.getCamera());
      this.intersects = this.raycaster.intersectObjects(this.rayInteractors.map (e => e.getThreeObject3D()));
    }

    getObject (name) {
      return this.scene.getObjectByName(name);
    }

    getEntityByName (name) {
      return this.entities.find(e => e.name === name);
    }

    getCollidableEntityByName (name) {
      return this.rayInteractors.find(e => e.name === name);
    }

    getEntities() {
      return this.entities;
    }

    getCamera () {
      return this.camera;
    }

    getScene () {
      return this.scene;
    }

    getSceneName () {
      return this.file.sceneName;
    }

    getMaterialFile () {
      return this.file.materialsFile;
    }

    getThreeScene () {
      return this.scene;
    }

    getConfig() {
      return this.file;
    }

    getMaterialByName(nameMaterial){
      return this.MaterialFactory.materials[nameMaterial];
    }

    assignTextures () {
      for (var g = 0 ; g < this.scene.children.length; g++) {
        if(this.scene.children[g] instanceof THREE.Mesh && this.MaterialFactory.materials[this.scene.children[g].material.name]){
          if(this.scene.children[g].material = this.MaterialFactory.materials[this.scene.children[g].material.name] !== undefined){
            this.logger.error("Material called from object "+this.scene.children[g].name +" doesnt exist");
          }else {
            this.scene.children[g].material = this.MaterialFactory.materials[this.scene.children[g].material.name].getThreeMaterial();
          }
        }
      }
      this.logger.info("Textures assigned to materials");
    }
}
