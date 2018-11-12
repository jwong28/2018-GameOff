import phaser from 'phaser'
import Player from '../sprites/Player';

export class Game extends phaser.Scene {
    constructor () {
        super({
            key: 'preloader'
        })
    }
    preload () {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        console.log('Preloader preload')
        this.load.spritesheet('dude', 'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    this.load.image('bullet', 'assets/bullet.png');
    }

    create()
    {
        this.add.image(400, 300, 'sky');
        var platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.player = new Player({
            scene: this,
            key: 'dude',
            x: 100,
            y: 450
        });
        this.keys = {
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        }
        this.cursors = this.input.keyboard.createCursorKeys();

         //Player collision with platform
        this.physics.add.collider(this.player, platforms);

        //add bullets group
        let bullets = this.physics.add.group();
    }

    update(delta)
    { 
       this.player.update(this.keys, delta);
    }

}