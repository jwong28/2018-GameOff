
export default function makeAnimations(scene){

//Base config frame
let config = {
    key: '',
    frames: scene.anims.generateFrameNumbers('', {
        start: 0,
        end: 0,
        first: 0
    }),
    frameRate: 5
};
//Player movement
    config.key = "downRight";
    config.frames = scene.anims.generateFrameNumbers('player', {
        start: 0,
        end: 2 
    }),

    scene.anims.create(config);
    config.key = "right";
    config.frames = scene.anims.generateFrameNumbers('player', {
        start: 3,
        end: 5 
    }),

    scene.anims.create(config);
    config.key = "upRight";
    config.frames = scene.anims.generateFrameNumbers('player', {
        start: 6,
        end: 8
    }),

    scene.anims.create(config);

    config.key = "up";
    config.frames = scene.anims.generateFrameNumbers('player', {
        start: 9,
        end: 11 
    }),
    scene.anims.create(config);

    config.key = "upLeft";
    config.frames = scene.anims.generateFrameNumbers('player', {
        start: 12,
        end: 14 
    }),
    scene.anims.create(config);

    config.key = "left";
    config.frames = scene.anims.generateFrameNumbers('player', {
        start: 15,
        end: 17 
    }),
    scene.anims.create(config);

    config.key = "downLeft";
    config.frames = scene.anims.generateFrameNumbers('player', {
        start: 18,
        end: 20 
    }),
    scene.anims.create(config);

    config.key = "down";
    config.frames = scene.anims.generateFrameNumbers('player', {
        start: 21,
        end: 23 
    }),
    scene.anims.create(config);
}