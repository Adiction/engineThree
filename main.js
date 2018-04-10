import Scene from './Scene';
import Game from './Game';

class MyScene extends Scene {
    constructor () {
        super("assets/test.json");

        this.addProgressListener(progress => console.log(progress));
    }
}

let context = document.createElement ("canvas");

console.log(document);
console.log("hola alba";)
let game = new Game ({});
game.setContext(context);
game.getSceneManager().loadScene(new MyScene(), (p) => console.log("Another callback: " + p))
    .then(() => game.animate());

//game.inputs.init ();
// game.animate ();


// import Scene from './Scene';
// import Game from './Game';
//
// class MyScene extends Scene {
//     constructor () {
//         super( "test.json" );
//     }
// }
//
// let game = new Game ( document.createElement ( "canvas" ), {} );
// game.sceneManager.loadScene (new MyScene())
//     .then(() => game.animate());
//
// game.inputs.init ();
// // game.animate ();
