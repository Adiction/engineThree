import JsonLoader from "./loaders/JsonLoader";
import * as THREE from 'three';

import MeshBasic from './materials/MeshBasicMaterial';

export default class {
  constructor(logger) {
    this.loader = new JsonLoader();
    this.materials = [];
    this.materialData = null;
    this.textures = [];
    this.logger = logger;

    this.TYPES = {
        MESH_BASIC: 0
    };

  }

  getMaterialByType (type, options) {
      switch (type)
      {
          case this.TYPES.MESH_BASIC:
            return new MeshBasic(options);
      }
  }

  loadTextures(sceneName, materialsFile, callback) {
    return new Promise ((resolve, reject) => {
      this.loader.getObjectFromUrl(materialsFile + ".json").then ( object => {
        this.materialData = object;
        this.createTextures(this.materialData[sceneName], () => {
            this.generateMaterials(this.materialData[sceneName].materials, this.textures,callback);
        });

        resolve();
      });
    });
  }

  createTextures(materialData, callback) {
    var self = this;
    var loaderTexture = new THREE.TextureLoader();
    var countTexturesToLoad = Object.keys(materialData.texts).length;
    for (var key in materialData.texts) {
        if (materialData.texts.hasOwnProperty(key)) {
            loaderTexture.load(materialData.texts[key], ((key) =>{
              return function (texture) {
                self.textures[key] = texture;
                countTexturesToLoad--;
                if (countTexturesToLoad === 0) {
                  self.logger.info("All textures Loaded");
                  callback();
                }

              }
            })(key));
        }
    }
  }

  generateMaterials(configMaterials, textures,callback) {
    for (var material in configMaterials) {
        if (configMaterials.hasOwnProperty(material)) {
            var properties = configMaterials[material];

            var materialConfigured = this.threeMaterialFromString(configMaterials[material].type);

            for (var property in properties) {
                if (properties.hasOwnProperty(property)) {
                    //Texture
                    /*It works with:
                        property === "map" ||
                        property === "normalMap" ||
                        property === "roughnessMap" ||
                        property === "metalnessMap" ||
                        property == "emissiveMap" ||
                        property == "aoMap"
                    */
                    if (property.indexOf("map") !== -1 || property.indexOf("Map") !== -1) {
                        materialConfigured[property] = textures[properties[property]];
                    }
                    // Repeat
                    else if (this.propertyHasName(property, "repeat") && properties[property]) {
                        //config texture repeat

                        var textureProperty = this.getPropertyTHREETextureFromMaterial(materialConfigured);
                        var texture = materialConfigured[textureProperty];
                        texture.wrapS = THREE.RepeatWrapping;
                        texture.wrapT = THREE.RepeatWrapping;

                        texture.repeat.x = properties[property];
                        texture.repeat.y = properties[property];


                        materialConfigured[textureProperty] = texture;
                    }
                    // Anything else
                    else {
                        materialConfigured[property] = properties[property];
                    }
                }
            }
            this.materials[material] = materialConfigured;
        }
    }
    this.logger.info("All materials created");
    callback();
  }

  getPropertyTHREETextureFromMaterial(material) {
      for (var property in material) {
          if (material.hasOwnProperty(property)) {
              if (material[property] instanceof THREE.Texture)
                  return property;
          }
      }

      return undefined;
  }

  threeMaterialFromString(materialString) {
      switch (materialString) {
          case "MeshStandardMaterial":
              return new THREE.MeshStandardMaterial();
          case "MeshBasicMaterial":
              return new THREE.MeshBasicMaterial();
          case "MeshLambertMaterial":
              return new THREE.MeshLambertMaterial();
          default:
              return new THREE.MeshLambertMaterial();
      }
  }

  propertyHasName(property, name) {
      return property === name;
  }
}
