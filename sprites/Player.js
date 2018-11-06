export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config)
    {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
    }

    update(keys)
    {
        let input = {
            left: keys.left.isDown,
            right: keys.right.isDown,
            up: keys.up.isDown,
            down: keys.down.isDown
        }

        if(input.up){ 
            this.player.setVelocityY(-160);
        }
        else if(input.down){ 
            this.player.setVelocityY(160);
        }
        if(input.right){ 
            this.player.setVelocityX(160);
        }
        else if(input.left){ 
            this.player.setVelocityX(-160);
        }
        else{
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
    }

    
}