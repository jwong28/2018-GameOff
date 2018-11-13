export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config)
    {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.type = 'player';
    }

    create()
    {
        //Player animations
        //Left
        this.anims.create({
            key: 'left',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 20
        });
    }

    update(keys, delta)
    {
        let input = {
            left: keys.left.isDown,
            right: keys.right.isDown,
            up: keys.up.isDown,
            down: keys.down.isDown
        }

        

        // if(input.up){ 
        //     this.body.setVelocityY(-160);
        //     // console.log(this);
        // }
        // else if(input.down){ 
        //     this.body.setVelocityY(160);
        // }
        // if(input.right){ 
        //     this.body.setVelocityX(160);
        // }
        // else if(input.left){ 
        //     this.body.setVelocityX(-160);
        // }
        // else{
        //     this.body.setVelocityX(0);
        //     this.body.setVelocityY(0);
        // }
        if(input.right){ 
            if(input.left){
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
            }
            else if(input.up){
                this.body.setVelocityX(160);
                this.body.setVelocityY(-160);
                this.anims.play('upRight',true);
            }
            else if(input.down){
                this.body.setVelocityX(160);
                this.body.setVelocityY(160);
                this.anims.play('downRight',true);
            }
            else if(input.right){
                this.body.setVelocityX(160);
                this.body.setVelocityY(0);
                this.anims.play('right',true);
            }
        }
    
        else if(input.left){ 
            if(input.left){
                this.body.setVelocityX(-160);
                this.body.setVelocityY(0);
                this.anims.play('left',true);
            }
            if(input.up){
                this.body.setVelocityX(-160);
                this.body.setVelocityY(-160);
                this.anims.play('upLeft',true);
            }
            if(input.down){
                this.body.setVelocityX(-160);
                this.body.setVelocityY(160);
                this.anims.play('downLeft',true);
            }
            if(input.right){
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
            }
        }
        
        else if(input.up){ 
            if(input.left){
                this.body.setVelocityX(-160);
                this.body.setVelocityY(-160);
                this.anims.play('upLeft',true);
            }
            else if(input.up){
                this.body.setVelocityX(0);
                this.body.setVelocityY(-160);
                this.anims.play('up',true);
            }
            else if(input.down){
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
            }
            else if(input.right){
                this.body.setVelocityX(160);
                this.body.setVelocityY(-160);
                this.anims.play('upRight',true);
            }
        }
    
        else if(input.down){ 
            if(input.left){
                this.body.setVelocityX(-160);
                this.body.setVelocityY(160);
                this.anims.play('downLeft',true);
            }
            else if(input.up){
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
            }
            else if(input.down){
                this.body.setVelocityX(0);
                this.body.setVelocityY(160);
                this.anims.play('down',true);
            }
            else if(input.right){
                this.body.setVelocityX(160);
                this.body.setVelocityY(160);
                this.anims.play('downRight',true);
            }
        }
    
        else{
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
        }
    }

    
}