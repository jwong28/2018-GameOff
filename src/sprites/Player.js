export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config)
    {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
    }

    update(keys, delta)
    {
        let input = {
            left: keys.left.isDown,
            right: keys.right.isDown,
            up: keys.up.isDown,
            down: keys.down.isDown
        }

        

        if(input.up){ 
            this.body.setVelocityY(-160);
        }
        else if(input.down){ 
            this.body.setVelocityY(160);
        }
        if(input.right){ 
            this.body.setVelocityX(160);
        }
        else if(input.left){ 
            this.body.setVelocityX(-160);
        }
        else{
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
        }
    }

    
}