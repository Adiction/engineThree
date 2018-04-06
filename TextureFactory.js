
import VideoTexture from './textures/VideoTexture';

export default class TextureFactory {
    constructor () {
        this.TYPES = {
            VIDEO: 0
        };
    }

    getTextureByType (type, options) {
        switch (type)
        {
            case this.TYPES.VIDEO:
                return new VideoTexture(options);
        }
    }
};