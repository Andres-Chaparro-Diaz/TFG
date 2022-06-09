class preloadGame extends Phaser.Scene {
    constructor() {
        super("PreloadGame");
    }
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('star', 'assets/star.png');

        this.load.image('background', 'assets/BG.png')
        this.load.image('ground', 'assets/ground.png');


        this.load.image('tree', 'assets/Tree_2.png');
        this.load.image('stone', 'assets/Stone.png');
        this.load.image('treeSmall', 'assets/Tree_1.png');
        this.load.image('snowMan', 'assets/SnowMan.png');

        this.load.image('crystalBlue', 'assets/Crystal.png');
        this.load.image('crystalRed', 'assets/crystalRed.png');
        this.load.image('crystalGreen', 'assets/crystalGreen.png');

        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet('dudeGreen', 'assets/dudeGreen.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet('dudeBlue', 'assets/dudeBlue.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet('dudeRed', 'assets/dudeRed.png', {
            frameWidth: 32,
            frameHeight: 48
        });
    }

    // se crean las animaciones
    create() {
        this.anims.create({
            key: 'runGreen',
            frames: this.anims.generateFrameNumbers('dudeGreen', {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'runBlue',
            frames: this.anims.generateFrameNumbers('dudeBlue', {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'runRed',
            frames: this.anims.generateFrameNumbers('dudeRed', {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.start("PlayGame");

    }
}

module.export = preloadGame;