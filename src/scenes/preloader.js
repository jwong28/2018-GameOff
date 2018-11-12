import phaser from 'phaser'
export class Preloader extends phaser.Scene {
    constructor () {
        super({
            key: 'preloader'
        })
    }
    preload () {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        console.log('Preloader preload')
    }

    create()
    {
        this.add.image(400, 300, 'sky');
    }
}