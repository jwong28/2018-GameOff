/** @type {import("../typings/phaser")}  */
class stage extends Phaser.Scene
{
 constructor()
 {
    super({key: "stage"});
 }
    
 preload()
 {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('player', 
        'assets/PlayerSprite.png',
        { frameWidth: 32, frameHeight: 48 }
    );
    this.load.image('bullet', 'assets/bullet.png');
 }

 create()
 {
    this.add.image(400, 300, 'sky');
    var platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //Player creation
    this.player = this.physics.add.sprite(200, 512, 'player');
    this.player.setCollideWorldBounds(true);

    //Player animations
    //Left
    this.anims.create({
        key: 'left',
        frames: [ { key: 'player', frame: 0 } ],
        frameRate: 20
    });
    //Down left
    this.anims.create({
        key: 'downLeft',
        frames: [ { key: 'player', frame: 1 } ],
        frameRate: 20
    });
    //Down
    this.anims.create({
        key: 'down',
        frames: [ { key: 'player', frame: 2 } ],
        frameRate: 20
    });
    //Down Right
    this.anims.create({
        key: 'downRight',
        frames: [ { key: 'player', frame: 3 } ],
        frameRate: 20
    });
    //Right
    this.anims.create({
        key: 'right',
        frames: [ { key: 'player', frame: 4 } ],
        frameRate: 20
    });
    //Up Right
    this.anims.create({
        key: 'upRight',
        frames: [ { key: 'player', frame: 5 } ],
        frameRate: 20
    });
    //Up
    this.anims.create({
        key: 'up',
        frames: [ { key: 'player', frame: 6 } ],
        frameRate: 20
    });
    //Up Left
    this.anims.create({
        key: 'upLeft',
        frames: [ { key: 'player', frame: 7 } ],
        frameRate: 20
    });
    //Start facing down
    // this.player.anims.play('down');

    //Create keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();

    //Player collision with platform
    this.physics.add.collider(this.player, platforms);


    var Bullet = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,
        initialize:
        function Bullet (scene){
            Phaser.GameObjects.Image.call(this,scene,0,0,'bullet');
            this.speed = Phaser.Math.GetSpeed(500,1);
        },
        fire: function(x,y,angle){
            this.setPosition(x,y);
            this.cos = Math.cos(angle);
            this.sin = Math.sin(angle); 
            this.setActive(true);
            this.setVisible(true);
        },
        update: function (time,delta){
            // switch(this.angle){
            //     case 0:
            //         this.x += this.speed * delta;
            //         break;
            //     case 45:
            //         this.x += this.speed * delta;
            //         this.y -= this.speed * delta;
            //         break;
            //     case 90:
            //         this.y -= this.speed * delta;
            //         break;
            //     case 135:
            //         this.x -= this.speed * delta;
            //         this.y -= this.speed * delta;
            //         break;
            //     case 180:
            //         this.x -= this.speed * delta;
            //         break;
            //     case 225:
            //         this.x -= this.speed * delta;
            //         this.y += this.speed * delta;
            //         break;
            //     case 270:
            //         this.y += this.speed * delta;
            //         break;
            //     case 315:
            //         this.x += this.speed * delta;
            //         this.y += this.speed * delta;
            //         break;
            //     }
            this.x += this.cos * (this.speed * delta);
            this.y -= this.sin * (this.speed * delta);
            if(this.x > 820 && this.y > 620 && this.x < 0 && this.y < 0){
                this.setActive(false);
                this.setVisible(false);
            }
        }
    });
    //add bullets group
    this.bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 30,
        runChildUpdate: true
    });
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
 }

 update(delta)
 { 
    if(this.cursors.right.isDown){ 
        if(this.cursors.left.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,0);
                }
            }
        }
        else if(this.cursors.up.isDown){
            this.player.setVelocityX(160);
            this.player.setVelocityY(-160);
            this.player.anims.play('upRight',true);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,45);
                }
            }
        }
        else if(this.cursors.down.isDown){
            this.player.setVelocityX(160);
            this.player.setVelocityY(160);
            this.player.anims.play('downRight',true);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,315);
                }
            }
        }
        else if(this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);
            this.player.anims.play('right',true);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,0);
                }
            }
        }
    }

    else if(this.cursors.left.isDown){ 
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);
            this.player.anims.play('left',true);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,180);
                }
            }
        }
        if(this.cursors.up.isDown){
            this.player.setVelocityX(-160);
            this.player.setVelocityY(-160);
            this.player.anims.play('upLeft',true);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,135);
                }
            }
        }
        if(this.cursors.down.isDown){
            this.player.setVelocityX(-160);
            this.player.setVelocityY(160);
            this.player.anims.play('downLeft',true);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,225);
                }
            }
        }
        if(this.cursors.right.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,180);
                }
            }
        }
    }
    
    else if(this.cursors.up.isDown){ 
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-160);
            this.player.setVelocityY(-160);
            this.player.anims.play('upLeft',true);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,135);
                }
            }
        }
        else if(this.cursors.up.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(-160);
            this.player.anims.play('up',true);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,90);
                }
            }
        }
        else if(this.cursors.down.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,90);
                }
            }
        }
        else if(this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.setVelocityY(-160);
            this.player.anims.play('upRight',true);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,45);
                }
            }
        }
    }

    else if(this.cursors.down.isDown){ 
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-160);
            this.player.setVelocityY(160);
            this.player.anims.play('downLeft',true);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,225);
                }
            }
        }
        else if(this.cursors.up.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,270);
                }
            }
        }
        else if(this.cursors.down.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(160);
            this.player.anims.play('down',true);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,270);
                }
            }
        }
        else if(this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.setVelocityY(160);
            this.player.anims.play('downRight',true);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,315);
                }
            }
        }
    }

    else{
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
    }
}

fireBullet(direction1, direction2) {
    if(this.time.now > bulletTime){
        this.bullet = this.bullets.getFirstExists(false);
        if(this.bullet){
            this.bullet.reset(this.player.x + direction1, this.player.y + direction2);
            this.bullet.body.setVelocityX(direction1);
            this.bullet.body.setVelocityX(direction2);
            this.bulletTime = this.time.now + 150;
        }
    }
}

resetBullet(bullet){
    this.bullet.kill();
}
}