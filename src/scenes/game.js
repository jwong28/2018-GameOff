import phaser from 'phaser'
import Player from '../sprites/Player';
import Bullets from '../sprites/Bullet';

export class Game extends phaser.Scene {
    constructor (test) {
        super({
            key: 'Game'
        })
    }
    preload () {
        // this.load.image('sky', 'assets/sky.png');
        // this.load.image('ground', 'assets/platform.png');
        // console.log('Preloader preload')
        // this.load.spritesheet('player', 'assets/PlayerSprite.png',
        //     { frameWidth: 32, frameHeight: 48 }
        // );
        //  this.load.image('bullet', 'assets/bullet.png');
    }

    create()
    {
        this.add.image(400, 300, 'sky');
        var platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.player = new Player({
            scene: this,
            key: 'player',
            x: 100,
            y: 450
        });
        this.keys = {
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        }
        this.cursors = this.input.keyboard.createCursorKeys();

         //Player collision with platform
        this.physics.add.collider(this.player, platforms);

        //add bullets group
        this.bullets = this.add.group({
            classType: Bullets,
            maxSize: 20,
            runChildUpdate: false
        });
    }

    update(delta)
    { 
        this.player.update(this.keys, delta);
        Array.from(this.bullets.children.entries).forEach(
            (bullet) => {
                bullet.update(time,delta);
            });
    }

}