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

    //add bullets group
    let bullets = this.physics.add.group();
 }

 update(delta)
 { 
    if(this.cursors.right.isDown){ 
        if(this.cursors.left.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        if(this.cursors.up.isDown){
            this.player.setVelocityX(160);
            this.player.setVelocityY(-160);
            this.player.anims.play('upRight',true);
        }
        if(this.cursors.down.isDown){
            this.player.setVelocityX(160);
            this.player.setVelocityY(160);
            this.player.anims.play('downRight',true);
        }
        if(this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);
            this.player.anims.play('right',true);
        }
    }

    else if(this.cursors.left.isDown){ 
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);
            this.player.anims.play('left',true);
        }
        if(this.cursors.up.isDown){
            this.player.setVelocityX(-160);
            this.player.setVelocityY(-160);
            this.player.anims.play('upLeft',true);
        }
        if(this.cursors.down.isDown){
            this.player.setVelocityX(-160);
            this.player.setVelocityY(160);
            this.player.anims.play('downLeft',true);
        }
        if(this.cursors.right.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
    }
    
    else if(this.cursors.up.isDown){ 
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-160);
            this.player.setVelocityY(-160);
            this.player.anims.play('upLeft',true);
        }
        if(this.cursors.up.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(-160);
            this.player.anims.play('up',true);
        }
        if(this.cursors.down.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        if(this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.setVelocityY(-160);
            this.player.anims.play('upRight',true);
        }
    }

    else if(this.cursors.down.isDown){ 
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-160);
            this.player.setVelocityY(160);
            this.player.anims.play('downLeft',true);
        }
        if(this.cursors.up.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        if(this.cursors.down.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(160);
            this.player.anims.play('down',true);
        }
        if(this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.setVelocityY(160);
            this.player.anims.play('downRight',true);
        }
    }

    else{
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
    }
}
}