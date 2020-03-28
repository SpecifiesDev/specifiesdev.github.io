import { Player } from 'https://specifiesdev.github.io/content/bp/components/Player.js';


export class Game {


    constructor(parent) {
        // grab parent props that are passed down
        this.ctx = parent.ctx;
        this.canvas = parent.canvas;

        // call child components
        let playerComponent = new Player("#5f708c", this.ctx, this.canvas);

        // set default values for state management (easier to do in single lines rather than the state)
        let cursorObject = {'rightPressed': false, 'leftPressed': false, 'downPressed': false, 'upPressed': false, 'r': false}
        let player = playerComponent.create();
        // set default state
        this.state = { cursor: cursorObject, player: player}

        this.state.player.draw();
    }

}