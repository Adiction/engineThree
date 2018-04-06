import Vector from './math/Vector';
import * as THREE from 'three';

export default class {


    /**
     * Desde fuera del motor:
     * class MyCustomEntity extends Entity {
     *      constructor(entityObj) {
     *          super(entityObj);
     *      }
     *
     *      update(deltaTime) {
     *          super.update(deltaTime);
     *          //my update logic
     *      }
     * }
     *
     */

    constructor (entityObj) {
        this.entityObj = entityObj;
        this.type = this.entityObj.type;
        this.threeEntity = null;
        this.animator = {};
        this.animatorPath = {};
        this.hasAnimation = false;
        this.hasAnimationPath = false;
        this.options = this.entityObj.options || {};

        //set position
        let [x, y, z] = this.entityObj.position || [0, 0, 0];
        let [rx, ry, rz] = this.entityObj.rotation || [0, 0, 0];
        this.transform = {
            position: new Vector(x, y, z),
            rotation: new Vector(rx, ry, rz)
        };


        //save entity config
        this.config = this.entityObj.entityConfig;

        this.name = this.config.name || "";
        this.events = this.config.events || [];

        this.components = [];
    }

    init() {

    }

    loadPathAnimation () {
      let times = [];
      let values = [];
      if (this.config.pathAnimation) {
        this.hasAnimationPath = true;

        this.config.pathAnimation.keys.map((key)=>{
          times.push(key.key);
          values.push(key.value);
        });
        this.keyFrameTrack = new THREE.KeyframeTrack(this.threeObject+"Path", times, values, THREE.InterpolateLinear);
        this.animationClip = new THREE.AnimationClip(this.threeObject+"Clip", -1, this.keyFrameTrack);

        this.animatorPath = new THREE.AnimationMixer(this.threeEntity);
        this.animatorPath.clipAction(this.animationClip);
      }
    }

    loadAnimations () {
        //load animations if exists
        if(this.config.animation)
        {
            this.hasAnimation = true;

            this.animator.mixer = new THREE.AnimationMixer(this.threeEntity);
            // this.animation.mixer.update(this.config.animation.dt);
            this.animator.mixer.timeScale = this.config.animation.timeScale;

            //actions
            this.animator.actions = [];
            this.config.animation.actions.map((action, i) => {
                    this.animator.actions[action] = this.animator.mixer.clipAction(this.threeEntity.geometry.animations[i], this.threeEntity);
            });
        }
    }

    // setThreeObject (ThreeObject) {

    // }

    setThreeObject3D (ThreeType) {
        if(typeof ThreeType === "object") this.threeEntity = ThreeType;
        else if (typeof ThreeType === "function") this.threeEntity = new ThreeType();
        else if (typeof ThreeType === "string") this.threeEntity = new THREE[ThreeType]();
    }

    getThreeObject3D () {
        return this.threeEntity;
    }

    getMaterialName () {
        return this.threeEntity.material.name;
    }

    applyThreeObjectOptions () {
        let keys = Object.keys(this.options);
        keys.map (k => this.threeEntity[k] = this.options[k]);
    }

    applyLocalTransform () {
        if(this.threeEntity)
        {
            this.threeEntity.position.set(...this.transform.position.getComponents());
            this.threeEntity.rotation.set(...this.transform.rotation.getComponents());
        }
    }

    update(deltaTime) {
        //TODO: falta implementacion
        // for (let component of this.components) {
        //     if (component.update) component.update(deltaTime);
        // }

        //update stuff
        if(this.hasAnimation) this.animator.mixer.update(deltaTime);

        if(this.hasAnimationPath) this.animatorPath.update(deltaTime);
    }

    //Mutations and updates
    setOption (key, value) {
        this.options[key] = value;
        return this;
    }

    setActive (state) {
        return this.setOption("visible", state);
    }

    setMaterial (material) {
        //DEPRECATED
        // if(material.type === "Material")
        // {
        //     return this.setOption("material", material.getThreeMaterial());
        // }
        // else if(material.type === "MeshBasicMaterial")
        // {
        //     return this.setOption("material", material);
        // }

        if(material._type.hasSomeProto("Material")) {
            return this.setOption("material", material.getThreeMaterial());
        }

        throw material + " must be a Material instance";
    }

    commit () {
        this.applyThreeObjectOptions();
    }

};
