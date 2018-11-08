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
    this.load.spritesheet('dude', 
        'assets/dude.png',
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
    this.player = this.physics.add.sprite(100, 450, 'dude');
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
    // switch(this.cursors.input){
    //     case this.cursors.left.isDown:
    //             case this.cursors.left.isDown:
    //             this.player.setVelocityX(-160);
    //             break;
                
    //             case this.cursors.right.isDown:
    //             this.player.setVelocityX(0);
    //             this.player.setVelocityY(0);
    //             break;
        
    //             case this.cursors.up.isDown:
    //             this.player.setVelocityX(-160);
    //             this.player.setVelocityY(160);
    //             break;
        
    //             case this.cursors.down.isDown:
    //             this.player.setVelocityX(-160);
    //             this.player.setVelocityY(-160);
    //             break;
    
    //     case this.cursors.right.isDown:
    //             case this.cursors.left.isDown:
    //             this.player.setVelocityX(0);
    //             this.player.setVelocityY(0);
    //             break;
                
    //             case this.cursors.right.isDown:
    //             this.player.setVelocityX(160);
    //             break;
        
    //             case this.cursors.up.isDown:
    //             this.player.setVelocityX(160);
    //             this.player.setVelocityY(160);
    //             break;
        
    //             case this.cursors.down.isDown:
    //             this.player.setVelocityX(160);
    //             this.player.setVelocityY(-160);
    //             break;

    //     case this.cursors.up.isDown:
    //             case this.cursors.left.isDown:
    //             this.player.setVelocityX(-160);
    //             this.player.setVelocityY(160);
    //             break;
                
    //             case this.cursors.right.isDown:
    //             this.player.setVelocityX(160);
    //             this.player.setVelocityY(160);
    //             break;
        
    //             case this.cursors.up.isDown:
    //             this.player.setVelocityX(160);
    //             break;
        
    //             case this.cursors.down.isDown:
    //             this.player.setVelocityX(0);
    //             this.player.setVelocityY(0);
    //             break;  

    //     case this.cursors.down.isDown:
    //             case this.cursors.left.isDown:
    //             this.player.setVelocityX(-160);
    //             this.player.setVelocityY(-160);
    //             break;
                
    //             case this.cursors.right.isDown:
    //             this.player.setVelocityX(160);
    //             this.player.setVelocityY(-160);
    //             break;
        
    //             case this.cursors.up.isDown:
    //             this.player.setVelocityX(0);
    //             this.player.setVelocityY(0);
    //             break;
        
    //             case this.cursors.down.isDown:
    //             this.player.setVelocityY(-160);
    //             break;    
    // }
    if(this.cursors.up.isDown){ 
        this.player.setVelocityY(-160);
    }
    else if(this.cursors.down.isDown){ 
        this.player.setVelocityY(160);
    }
    if(this.cursors.right.isDown){ 
        this.player.setVelocityX(160);
    }
    else if(this.cursors.left.isDown){ 
        this.player.setVelocityX(-160);
    }
    else{
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
    }
}
}