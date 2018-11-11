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
    this.load.spritesheet('Player', 
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
    this.player = this.physics.add.sprite(200, 512, 'Player');
    this.player.setCollideWorldBounds(true);

    //Keycodes
    // this.key_Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    // this.key_Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    // this.key_Down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Down);
    // this.key_Up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    // this.key_Space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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
            this.player.frame = 5;
        }
        if(this.cursors.down.isDown){
            this.player.setVelocityX(160);
            this.player.setVelocityY(160);
            this.player.frame = 3;
        }
        if(this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);
            this.player.frame = 4;
        }
    }

    else if(this.cursors.left.isDown){ 
        if(this.cursors.left.isDown){
            this.player.frame = 0;
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);
        }
        if(this.cursors.up.isDown){
            this.player.setVelocityX(-160);
            this.player.setVelocityY(-160);
            this.player.frame = 7;
        }
        if(this.cursors.down.isDown){
            this.player.setVelocityX(-160);
            this.player.setVelocityY(160);
            this.player.frame = 1;
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
            this.player.frame = 7;
        }
        if(this.cursors.up.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(-160);
            this.player.frame = 6;
        }
        if(this.cursors.down.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        if(this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.setVelocityY(-160);
            this.player.frame = 5;
        }
    }

    else if(this.cursors.down.isDown){ 
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-160);
            this.player.setVelocityY(160);
            this.player.frame = 1;
        }
        if(this.cursors.up.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        if(this.cursors.down.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(160);
            this.player.frame = 2;
        }
        if(this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.setVelocityY(160);
            this.player.frame = 3;
        }
    }

    else{
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
    }
}
}