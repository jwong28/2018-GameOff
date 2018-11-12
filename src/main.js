import 'phaser';
import { Preloader } from './scenes/preloader';
import { Stage } from './scenes/stage';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Preloader ]
}


const game = new Phaser.Game(config);

