

export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(config)
    {
        super(config.scene, config.x, config, config.key);
        config.scene.physics.world.enable(this);
        this.body.collideWorldBounds = true;
        this.type = 'bullet';
        //Send in the player
        this.player = this.scene.player;
    }

    bullet(){
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(this.player.x,this.player.x);
    }

    update(time, delta){
        if (!this.active) {
            return;
        }
    }

}