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
    this.load.spritesheet('enemy',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48}
    );
 }

 create()
 {
    this.add.image(400, 300, 'sky');
    var platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //Score creation
    this.score = 0;
    this.scoreText = this.add.text(16,10,'score: 0',{
        fontSize: '30px',
        fill: '#000'
    });

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
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Player collision with platform
    this.physics.add.collider(this.player, platforms);

    //Bullet Class
    var Bullet = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,
        initialize:
        function Bullet (scene){
            Phaser.GameObjects.Image.call(this,scene,0,0,'bullet');
            this.speed = Phaser.Math.GetSpeed(400,1);
        },
        fire: function(x,y,angle){
            this.setPosition(x,y);
            console.log(angle);
            this.cos = Math.cos(angle);
            console.log(this.cos);
            this.sin = Math.sin(angle);
            console.log(this.sin);
            this.setActive(true);
            this.setVisible(true);
        },
        update: function (time,delta){
            this.x += this.cos * (this.speed * delta);
            this.y -= this.sin * (this.speed * delta);
            if(this.x > 820 || this.y > 620 || this.x < 0 || this.y < 0){
                console.log("X= " + this.x + ' ' + "Y= " +this.y);
                this.setActive(false);
                this.setVisible(false);
                
            }
        }
    });

    //Enemy Class
    var Enemy = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,
        initialize:
        function Enemy (scene){
            Phaser.GameObjects.Image.call(this,scene,0,0,'enemy');
            this.speed = Phaser.Math.GetSpeed(150,30);
            this.hp = 2;
        },
        referenceObjects: function(player,score){
            this.score = score;
            this.player = player;
            this.setActive(true);
            this.setVisible(true);
            // this.bullet = bullet;
        },
        randomLocation: function(){
            var closeToPlayer = true;
            while(closeToPlayer){
            this.setPosition(Math.random() * 800,
                             Math.random() * 620);
            if(Math.abs(this.player.x - this.x) > 100 &&
               Math.abs(this.player.y - this.y) > 100){
                   closeToPlayer = false;
               }
            }
            console.log("Player X: " + this.player.x + "Player Y: " + this.player.y);
            console.log("Enemy X: " + this.x + "Enemy Y: " + this.y);
        },
        update: function(delta){
            // if((Math.abs(this.bullet.x - this.x)) <=32 ||
            //    (Math.abs(this.bullet.y - this.y)) <=32)
            // {
            //     this.hp--;
            // }
            this.x = this.x + ((this.player.x - this.x) * this.speed);
            this.y = this.y + ((this.player.y - this.y) * this.speed);
            console.log("Moved.X"+this.x+','+this.y);
            if(this.hp == 0){
                this.setActive(false);
                this.setVisible(false);
                this.score++;
            }

        }
    })

    //add bullets group
    this.bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 30,
        runChildUpdate: true
    });

    //add enemies group
    this.enemies = this.physics.add.group({
        classType: Enemy,
        maxSize: 2,
        runChildUpdate: true
    });

    for(var i=0;i<this.enemies.maxSize;i++){
        var enemy = this.enemies.get();
        if(enemy){
            enemy.referenceObjects(this.player,this.score);
            enemy.randomLocation();
        }
    }
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
                    bullet.fire(this.player.x,this.player.y,Math.PI/4);
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
                    bullet.fire(this.player.x,this.player.y,7*Math.PI/4);
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
                    bullet.fire(this.player.x,this.player.y,Math.PI);
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
                    bullet.fire(this.player.x,this.player.y,3*Math.PI/4);
                }
            }
        }
        if(this.cursors.down.isDown){
            this.player.setVelocityX(-160);
            this.player.setVelocityY(160);
            this.player.anims.play('downLeft',true);
            if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                console.log("HI " + (5*Math.PI/4));
                var bullet = this.bullets.get();
                if(bullet){
                    bullet.fire(this.player.x,this.player.y,5*Math.PI/4);
                    console.log("HI " + (5*Math.PI/4));
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
                    bullet.fire(this.player.x,this.player.y,Math.PI);
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
                    bullet.fire(this.player.x,this.player.y,3*Math.PI/4);
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
                    bullet.fire(this.player.x,this.player.y,Math.PI/2);
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
                    bullet.fire(this.player.x,this.player.y,Math.PI/2);
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
                    bullet.fire(this.player.x,this.player.y,Math.PI/4);
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
                    bullet.fire(this.player.x,this.player.y,5*Math.PI/4);
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
                    bullet.fire(this.player.x,this.player.y,3*Math.PI/2);
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
                    bullet.fire(this.player.x,this.player.y,3*Math.PI/2);
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
                    bullet.fire(this.player.x,this.player.y,7*Math.PI/4);
                }
            }
        }
    }

    else{
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
    }
}
}