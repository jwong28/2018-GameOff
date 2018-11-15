import makeAnimations from "../helpers/animation";
import phaser from 'phaser'

export class Preloader extends Phaser.Scene
{
    constructor(test){
        super({
            key: 'Preloader'
        })
    }

    preload(){
        const progress = this.add.graphics();

        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });
        
        console.log('Preloader preload')

        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('player', 'assets/SpriteWithMovement.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.image('bullet', 'assets/bullet.png');
        this.scene.start('Game');
        this.load.on('complete', () => {
            makeAnimations(this);
            progress.destroy();
            this.scene.start('Game');       
        });

    }
}

export default Preloader;