import 'phaser';
import { Preloader } from './scenes/preloader';
import { Game } from './scenes/game';

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
    scene: [
        Preloader, 
        Game
    ]
};

const game = new Phaser.Game(config);

