// import Game from './Game';
import * as THREE from 'three';
import Vector from './math/Vector';

export default class {

    constructor (context) {
      this.context = context;
      this.mouse = new Vector();
      this.EVENTS = {
        CLICK: 0,
        OVER: 1
      }
    }

    getMouse () {
      return this.mouse;
    }

    registerMouseMoveEvent () {
      window.addEventListener("mousemove", (e) => this.mouse = this._trigger(e));
    }

    registerEvent (type, callback) {
      if (!this.context) return;
      switch (type)
      {
          case this.EVENTS.CLICK:
            this.context.addEventListener('click', (e) => callback(this.EVENTS.CLICK));
            break;
          case this.EVENTS.OVER:
            this.context.addEventListener('mouseover', (e) => callback(this.EVENTS.OVER));
            break;
      }
    }

    _trigger (event) {
        event.preventDefault();

        let x = (event.clientX / window.innerWidth) * 2 - 1;
        let y = -(event.clientY / window.innerHeight) * 2 + 1;

        return new Vector(x, y);
    }


    init () {
      // window.addEventListener ( 'mousemove', this.mouseMove.bind( this ), false );
      // window.addEventListener ( 'keydown', this.keyboardManage.bind( this ), false );
    }

    //queremos poder subscribirnos a los eventos que queramos y poder ademas controlar esos eventos
    // mouseMove ( event ) {
    //   this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    //   this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // }

    // keyboardManage ( event ) {
    //   switch ( event.keyCode ) {
    //     case 77:
    //       this.toggleFullScreen ();
    //       break;
    //   }
    // }

    // toggleFullScreen () {
    //   if ( document.webkitIsFullScreen ) {
    //     document.webkitCancelFullScreen();
    //   }else{
    //     document.requestFullScreen ? document.requestFullScreen () :
    //     document.documentElement.webkitRequestFullScreen ();
    //   }
    // }

};
