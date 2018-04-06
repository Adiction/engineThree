import Entity from './Entity'

import Light from './entities/Light';
import Camera from './entities/Camera';
import Collidable from './entities/Collidable'
import Skybox from './entities/Skybox'

export class EntityFactory {

    constructor() {
        this.entities = [];

        //We'll to register default entities
        this.register("Light", Light);
        this.register("Camera", Camera);
        this.register("Collidable", Collidable);
        this.register("Skybox", Skybox);
    }

    register ( type, entity ) {
        if (typeof entity === "function" /*&& Entity.isPrototypeOf(entity)*/) {
            this.entities[type] = entity;
        }
    }

    unRegister ( type ) {
        //TODO
    }

    getEntityFromType ( type ) {
        return this.entities[type];
    }

    getEntityInstanceFromType(type, entityObj) {
        let entity = this.entities[type];
        return new entity(entityObj);
    }
    getEntityInstanceFromObj(entityObj) {
        let entity = this.entities[entityObj.type];
        if(!entity) return null;
        return new entity(entityObj);
    }

    // add ( entity ) {
    //   this.entities.push(entity);
    // }

};
