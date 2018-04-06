import SceneManager from './SceneManager';
import * as THREE from 'three';
import {EntityFactory} from "./EntityFactory";
import MaterialFactory from "./MaterialFactory";
import TextureFactory from "./TextureFactory";
import Logger from "./logger/Logger";

export default class {

    constructor(config) {
        // this.context = context;
        this.logger = new Logger("loggerEngine", 4);
        this.entityFactory = new EntityFactory();
        this.materialFactory = new MaterialFactory(this.logger);
        this.textureFactory = new TextureFactory();
        this.sceneManager = new SceneManager(null, this.entityFactory, this.materialFactory,this.logger);
        this.animationId = null;
        this.clock = new THREE.Clock();
    }

    setContext (context) {
        //Config coordinate system. If we'll move canvas, the system coords moves
        context.width   = context.offsetWidth;
        context.height  = context.offsetHeight;
        this.sceneManager.setContext(context);
    }

    getSceneManager () {
        return this.sceneManager;
    }

    getEntityFactory() {
        return this.entityFactory;
    }

    getMaterialFactory() {
        return this.materialFactory;
    }

    getTextureFactory() {
        return this.textureFactory;
    }

    animate () {
        this.animationId = window.requestAnimationFrame (this.animate.bind(this));
        this.sceneManager.update(this.clock.getDelta());
        this.sceneManager.render();
    }

    cancelAnimate () {
        window.cancelAnimationFrame (this.animationId);
        this.animationId = null;
    }
};
