export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config)
    {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.type = 'player';
        this.direction = '';
        this.speed = 160;
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

        if((input.right && input.up)){
            this.direction = 'upRight';
        }
        else if((input.right && input.down)){
            this.direction = 'downRight'
        }
        else if((input.left && input.up)){
            this.direction = 'upLeft';
        }
        else if(input.left && input.down){
            this.direction = 'downLeft'
        }
        else if(input.right){
            this.direction = 'right';
        }
        else if(input.left){
            this.direction = 'left';
        }
        else if(input.up){
            this.direction = 'up';
        }
        else if(input.down){
            this.direction = 'down';
        }
        else{
            this.direction = '';
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
        }
        switch(this.direction){
            case 'upRight':
                this.body.setVelocityX(this.speed);
                this.body.setVelocityY(-1*this.speed);
                this.anims.play(this.direction,true);
                break;
            case 'downRight':
                this.body.setVelocityX(this.speed);
                this.body.setVelocityY(this.speed);
                this.anims.play(this.direction,true);
                break;
            case 'upLeft':
                this.body.setVelocityX(-1*this.speed);
                this.body.setVelocityY(-1*this.speed);
                this.anims.play(this.direction,true);
                break;
            case 'downLeft':
                this.body.setVelocityX(-1*this.speed);
                this.body.setVelocityY(this.speed);
                this.anims.play(this.direction,true);
                break;
            case 'right':
                this.body.setVelocityX(this.speed);
                this.body.setVelocityY(0);
                this.anims.play(this.direction,true);
                break;
            case 'left':
                this.body.setVelocityX(-1*this.speed);                
                this.body.setVelocityY(0);
                this.anims.play(this.direction,true);
                break;
            case 'up':
                this.body.setVelocityX(0);
                this.body.setVelocityY(-1*this.speed);
                this.anims.play(this.direction,true);
                break;
            case 'down':
                this.body.setVelocityX(0);
                this.body.setVelocityY(this.speed);
                this.anims.play(this.direction,true);
                break;
            
        }
    }

    
}