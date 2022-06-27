//const userController = require("controller")

let control = new UserController();
let game;
var loadGame = function() {

    // object containing configuration options
    let gameConfig = {

        type: Phaser.AUTO,
        width: 1600, //800
        height: 600, //600
        scene: [preloadGame, playGame],
        backgroundColor: 0x0c88c7,
        parent: 'game',
        physics: {
            default: 'arcade'
        },
        audio: {
            disableWebAudio: true
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();

}


class preloadGame extends Phaser.Scene {
    constructor() {
        super("PreloadGame");
    }
    preload() {
        this.load.image('sky', '/assets/sky.png');
        this.load.image('background', '/assets/BGFixed.png')
        this.load.image('ground', '/assets/ground.png');

        this.load.image('InvBody', '/assets/StoneInv.png');
        this.load.image('skyInv', '/assets/skyInv.png');


        this.load.image('tree', '/assets/Tree_2.png');
        this.load.image('stone', '/assets/Stone.png');
        this.load.image('treeSmall', '/assets/Tree_1.png');
        this.load.image('snowMan', '/assets/SnowMan.png');

        this.load.image('crystalBlue', '/assets/Crystal.png');
        this.load.image('crystalRed', '/assets/crystalRed.png');
        this.load.image('crystalGreen', '/assets/crystalGreen.png');

        this.load.audio('campana', '/assets/audio/campana.m4a');
        this.load.audio('hielo', '/assets/audio/hielo.m4a');
        this.load.audio('tapon', '/assets/audio/taponbotella.m4a');

        this.load.spritesheet('dude', '/assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet('dudeGreen', '/assets/dudeGreen.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet('dudeBlue', '/assets/dudeBlue.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet('dudeRed', '/assets/dudeRed.png', {
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

class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");

        let config;
        $.ajax({
            url: '/controllers/config.json',
            async: false,
            dataType: 'json',
            success: function(response) {
                config = response;
            }
        });

        this.score = config.startPoints;
        this.created = false;
        this.lives = 3;
        this.hittable = config.hittableObstacles;
        this.scoreTocreateBot = config.scoreToCreateBot;
        this.scoreTocreateTopR = config.scoreToCreateTopR;
        this.scoreTocreateBotR = config.scoreToCreateBotR;
        this.frecuencyToAddCrystal = config.frecuencytoAddCrystal;
        this.valueOfCrystal = config.valueOfCrystal;
        this.frecuencytoAddObstacle = config.frecuencytoAddObstacle;
        this.frecuencytoAddPlatform = config.frecuencytoAddPlatform;
        this.reqPointsToAppearObstacles = config.reqPointsToAppearObstacles;
        this.runnersSpeed = config.runnersSpeed;
        this.runnersGravity = config.runnersGravity;
        this.platformSpeed = config.platformSpeed;
        this.runnersJumpX = config.runnersJumpX;
        this.runnersJumpY = config.runnersJumpY;
        this.inmuneTime = config.inmuneTime;
        this.puntuacion = document.getElementById("spPuntuacion");
        this.currentInmuneTime = 0;
        this.addedTop = 0;
        this.addedBot = 0;
        this.addedTopR = 0;
        this.addedBotR = 0;

    }

    create() {


        this.add.image(400, 100, 'background'); //background

        this.campana = this.sound.add("campana");
        this.hielo = this.sound.add("hielo");
        this.tapon = this.sound.add("tapon");

        this.nPlatformsBot = 0;
        this.nPlatformsTop = 0;
        this.nPlatformsBotR = 0;
        this.nPlatformsTopR = 0;

        this.platformGroupTop = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function(platform) {
                platform.scene.platformPoolTop.add(platform)
            }
        });
        this.platformPoolTop = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform) {
                platform.scene.platformGroupTop.add(platform)
            }
        })

        this.obstacleGroupTop = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function(obstacle) {
                obstacle.scene.obstaclePoolTop.add(obstacle)
            }
        });
        this.obstaclePoolTop = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(obstacle) {
                obstacle.scene.obstacleGroupTop.add(obstacle)
            }
        })

        this.obstacleGroupTopInv = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function(obstacle) {
                obstacle.scene.obstaclePoolTop.add(obstacle)
            }
        });
        this.obstaclePoolTopInv = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(obstacle) {
                obstacle.scene.obstacleGroupTop.add(obstacle)
            }
        })

        this.obstacleGroupTopR = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function(obstacle) {
                obstacle.scene.obstaclePoolTopR.add(obstacle)
            }
        });
        this.obstaclePoolTopR = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(obstacle) {
                obstacle.scene.obstacleGroupTopR.add(obstacle)
            }
        })

        this.obstacleGroupTopRInv = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function(obstacle) {
                obstacle.scene.obstaclePoolTopR.add(obstacle)
            }
        });
        this.obstaclePoolTopRInv = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(obstacle) {
                obstacle.scene.obstacleGroupTopR.add(obstacle)
            }
        })

        this.obstacleGroupBot = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function(obstacle) {
                obstacle.scene.obstaclePoolBot.add(obstacle)
            }
        });
        this.obstaclePoolBot = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(obstacle) {
                obstacle.scene.obstacleGroupBot.add(obstacle)
            }
        })

        this.obstacleGroupBotInv = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function(obstacle) {
                obstacle.scene.obstaclePoolBot.add(obstacle)
            }
        });
        this.obstaclePoolBotInv = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(obstacle) {
                obstacle.scene.obstacleGroupBot.add(obstacle)
            }
        })

        this.obstacleGroupBotR = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function(obstacle) {
                obstacle.scene.obstaclePoolBotR.add(obstacle)
            }
        });
        this.obstaclePoolBotR = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(obstacle) {
                obstacle.scene.obstacleGroupBotR.add(obstacle)
            }
        })

        this.obstacleGroupBotRInv = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function(obstacle) {
                obstacle.scene.obstaclePoolBotR.add(obstacle)
            }
        });
        this.obstaclePoolBotRInv = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(obstacle) {
                obstacle.scene.obstacleGroupBotR.add(obstacle)
            }
        })

        this.crystalGroup = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function(crystal) {
                crystal.scene.crystalPool.add(crystal)
            }
        });
        this.crystalPool = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(crystal) {
                crystal.scene.crystalGroup.add(crystal)
            }
        })
        this.cameras.main.setSize(0, 0);
        this.cameraTop = this.cameras.add(0, 0, 800, 600);
        this.cameraBot = this.cameras.add(0, 300, 800, 600);
        this.cameraTopR = this.cameras.add(800, 0, 800, 600);
        this.cameraBotR = this.cameras.add(800, 300, 800, 600);
        this.cameraBot.visible = false;
        this.cameraTopR.visible = false;
        this.cameraBotR.visible = false;
        this.addPlatformFloor(800, 268);

        this.playerTop = this.physics.add.sprite(90, 150, 'dudeBlue');
        this.playerTop.body.setGravityY(this.runnersGravity);
        this.playerTop.setCollideWorldBounds(true);
        this.playerTopJumps = 0;


        this.keyQ = this.input.keyboard.addKey('Q');
        this.keyS = this.input.keyboard.addKey('S');
        this.keyP = this.input.keyboard.addKey('P');
        this.keyL = this.input.keyboard.addKey('L');

        this.platformPlayerColliderTop = this.physics.add.collider(this.playerTop, this.platformGroupTop, function() {

            // play "run" animation if the player is on a platform
            if (!this.playerTop.anims.isPlaying) {
                this.playerTop.anims.play("runBlue");
                this.playerTop.body.setVelocityX(this.runnersSpeed);
                this.playerTopJumps = 0;
            }
        }, null, this);

        this.platformObstacleColliderTop = this.physics.add.collider(this.obstacleGroupTop, this.platformGroupTop, function() {}, null, this);
        this.platformObstacleColliderTopR = this.physics.add.collider(this.obstacleGroupTopR, this.platformGroupTop, function() {}, null, this);
        this.platformObstacleColliderBot = this.physics.add.collider(this.obstacleGroupBot, this.platformGroupTop, function() {}, null, this);
        this.platformObstacleColliderBotR = this.physics.add.collider(this.obstacleGroupBotR, this.platformGroupTop, function() {}, null, this);

        this.platformObstacleColliderTopInv = this.physics.add.collider(this.obstacleGroupTopInv, this.platformGroupTop, function() {}, null, this);
        this.platformObstacleColliderTopRInv = this.physics.add.collider(this.obstacleGroupTopRInv, this.platformGroupTop, function() {}, null, this);
        this.platformObstacleColliderBotInv = this.physics.add.collider(this.obstacleGroupBotInv, this.platformGroupTop, function() {}, null, this);
        this.platformObstacleColliderBotRInv = this.physics.add.collider(this.obstacleGroupBotRInv, this.platformGroupTop, function() {}, null, this);

        this.physics.add.overlap(this.playerTop, this.crystalGroup, collectCrystal, null, this);
        this.physics.add.overlap(this.playerTop, this.obstacleGroupTopInv, hit, null, this);

        this.cameraBot.ignore([this.playerTop, this.platformGroupTop, this.obstacleGroupTopR, this.obstacleGroupBotR, this.obstacleGroupTop, this.obstacleGroupTopRInv, this.obstacleGroupBotRInv, this.obstacleGroupTopInv]);
        this.cameraTop.ignore([this.platformGroupTop, this.obstacleGroupTopR, this.obstacleGroupBotR, this.obstacleGroupBot, this.obstacleGroupTopRInv, this.obstacleGroupBotRInv, this.obstacleGroupBotInv]);
        this.cameraTopR.ignore([this.playerTop, this.platformGroupTop, this.obstacleGroupTopR, this.obstacleGroupBotR, this.obstacleGroupBot, this.obstacleGroupTopRInv, this.obstacleGroupBotRInv, this.obstacleGroupBotInv]);
        this.cameraBotR.ignore([this.playerTop, this.platformGroupTop, this.obstacleGroupTopR, this.obstacleGroupBotR, this.obstacleGroupBot, this.obstacleGroupTopRInv, this.obstacleGroupBotRInv, this.obstacleGroupBotInv]);

        function collectCrystal(player, crystal) {
            if (crystal.visible) {
                this.score += this.valueOfCrystal;
                this.hielo.play();
            }
            crystal.setVisible(false);
        }

        function hit(player, obstacle) {
            if (this.hittable && this.currentInmuneTime <= 0) {
                if (obstacle.visible) {
                    if (this.lives > 1) {
                        this.removeLife();
                        this.lives--;
                        this.tapon.play();
                        this.currentInmuneTime = this.inmuneTime;

                    } else {
                        control.sendPoints();
                        this.removeLife();
                        this.scene.stop("PlayGame");
                    }
                }
                obstacle.setVisible(false);
            }
        }

    }
    removeLife() {
        switch (this.lives) {
            case 1:
                document.getElementById('life1').remove();
                break;
            case 2:
                document.getElementById('life2').remove();
                break;
            case 3:
                document.getElementById('life3').remove();
                break;
        }
    }
    update() {
        this.score++;
        if (this.currentInmuneTime > 0) {
            this.currentInmuneTime--;
        }
        this.puntuacion.textContent = this.score;
        this.addPlatformFloor();

        var range = 1;
        this.addedTop--;

        this.jumpPlayerTop();
        if (!this.createdBot) {
            if (this.score >= this.scoreTocreateBot) {
                this.createdBot = true;
                this.createPJBot();
            }
        } else {
            this.jumpPlayerBot();
            range = 2;
            this.addedBot--;
        }

        if (!this.createdTopR) {
            if (this.score >= this.scoreTocreateTopR) {
                this.createdTopR = true;
                this.createPJTopR();
            }
        } else {
            this.jumpPlayerTopR();
            range = 3;
            this.addedTopR--;
        }

        if (!this.createdBotR) {
            if (this.score >= this.scoreTocreateBotR) {
                this.createdBotR = true;
                this.createPJBotR();
            }
        } else {
            this.jumpPlayerBotR();
            range = 4;
            this.addedBotR--;

        }


        var location = this.randomIntFromInterval(1, range);


        if (this.score > this.reqPointsToAppearObstacles && (this.score % this.frecuencytoAddObstacle == 0 || this.score < 10)) {
            this.checkLocationNewObstacle(location);
            location = this.randomIntFromInterval(1, range);
            this.checkLocationNewObstacle(location);
            location = this.randomIntFromInterval(1, range);
            this.checkLocationNewObstacle(location);
        }

        if (this.score % this.frecuencyToAddCrystal == 0) {
            this.addCrystal();
        }

    }

    checkLocationNewObstacle(location) {
        switch (location) {
            case 1:
                if (this.addedTop <= 0) {
                    this.addedTop = 100;
                    this.addObstacle(location);
                } else if (this.createdBot && this.addedBot <= 0) {
                    this.addObstacle(location + 1);
                }
                break;
            case 2:
                if (this.addedBot <= 0) {
                    this.addedBot = 100;
                    this.addObstacle(location);
                } else if (this.createdTopR && this.addedTopR <= 0) {
                    this.addObstacle(location + 1);
                }
                break;
            case 3:
                if (this.addedTopR <= 0) {
                    this.addedTopR = 100;
                    this.addObstacle(location);
                } else if (this.createdBotR && this.addedBotR <= 0) {
                    this.addObstacle(location + 1);
                }
                break;
            case 4:
                if (this.addedBotR <= 0) {
                    this.addedBotR = 100;
                    this.addObstacle(location);
                } else if (this.addedTop <= 0) {
                    this.addObstacle(1);
                }
                break;
        }
    }

    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    createPJBot() {
        this.playerBot = this.physics.add.sprite(90, 150, 'dude');
        this.playerBot.body.setGravityY(this.runnersGravity);
        this.playerBot.setCollideWorldBounds(true);
        this.playerBotJumps = 0;
        this.cameraBot.visible = true;
        this.cameraTop.ignore([this.playerBot]);
        this.cameraTopR.ignore([this.playerBot]);
        this.cameraBotR.ignore([this.playerBot]);

        this.platformPlayerColliderBot = this.physics.add.collider(this.playerBot, this.platformGroupTop, function() {

            // play "run" animation if the player is on a platform
            if (!this.playerBot.anims.isPlaying) {
                this.playerBot.anims.play("run");
                this.playerBot.body.setVelocityX(this.runnersSpeed);
                this.playerBotJumps = 0;
            }
        }, null, this);
        this.physics.add.overlap(this.playerBot, this.crystalGroup, collectCrystal, null, this);
        this.physics.add.overlap(this.playerBot, this.obstacleGroupBotInv, hit, null, this);

        this.campana.play();

        function collectCrystal(player, crystal) {
            if (crystal.visible) {
                this.score += this.valueOfCrystal;
                this.hielo.play();
            }
            crystal.setVisible(false);
        }

        function hit(player, obstacle) {
            if (this.hittable && this.currentInmuneTime <= 0) {
                if (obstacle.visible) {
                    if (this.lives > 1) {
                        this.removeLife();
                        this.lives--;
                        this.tapon.play();
                        this.currentInmuneTime = this.inmuneTime;
                    } else {
                        control.sendPoints();
                        this.removeLife();
                        this.scene.stop("PlayGame");
                    }
                }
                obstacle.setVisible(false);
            }
        }
    }

    createPJTopR() {
        this.playerTopR = this.physics.add.sprite(90, 150, 'dudeRed');
        this.playerTopR.body.setGravityY(this.runnersGravity);
        this.playerTopR.setCollideWorldBounds(true);
        this.playerTopRJumps = 0;
        this.cameraTopR.visible = true;

        this.cameraBot.ignore([this.playerTopR]);
        this.cameraTop.ignore([this.playerTopR]);
        this.cameraBotR.ignore([this.playerTopR]);

        this.platformColliderTopR = this.physics.add.collider(this.playerTopR, this.platformGroupTop, function() {

            // play "run" animation if the player is on a platform
            if (!this.playerTopR.anims.isPlaying) {
                this.playerTopR.anims.play("runRed");
                this.playerTopR.body.setVelocityX(this.runnersSpeed);
                this.playerTopRJumps = 0;
            }
        }, null, this);

        this.physics.add.overlap(this.playerTopR, this.crystalGroup, collectCrystal, null, this);
        this.physics.add.overlap(this.playerTopR, this.obstacleGroupTopRInv, hit, null, this);

        this.campana.play();

        function collectCrystal(player, crystal) {
            if (crystal.visible) {
                this.score += this.valueOfCrystal;
                this.hielo.play();

            }
            crystal.setVisible(false);
        }

        function hit(player, obstacle) {
            if (this.hittable && this.currentInmuneTime <= 0) {
                if (obstacle.visible) {
                    if (this.lives > 1) {
                        this.removeLife();
                        this.lives--;
                        this.tapon.play();
                        this.currentInmuneTime = this.inmuneTime;
                    } else {
                        control.sendPoints();
                        this.removeLife();
                        this.scene.stop("PlayGame");
                    }
                }
                obstacle.setVisible(false);
            }
        }

    }

    createPJBotR() {
        this.playerBotR = this.physics.add.sprite(90, 150, 'dudeGreen');
        this.playerBotR.body.setGravityY(this.runnersGravity);
        this.playerBotR.setCollideWorldBounds(true);
        this.playerBotRJumps = 0;
        this.cameraBotR.visible = true;

        this.cameraBot.ignore([this.playerBotR]);
        this.cameraTop.ignore([this.playerBotR]);
        this.cameraTopR.ignore([this.playerBotR]);

        this.platformColliderBotR = this.physics.add.collider(this.playerBotR, this.platformGroupTop, function() {

            // play "run" animation if the player is on a platform
            if (!this.playerBotR.anims.isPlaying) {
                this.playerBotR.anims.play("runGreen");
                this.playerBotR.body.setVelocityX(this.runnersSpeed);
                this.playerBotRJumps = 0;
            }
        }, null, this);
        this.physics.add.overlap(this.playerBotR, this.crystalGroup, collectCrystal, null, this);
        this.physics.add.overlap(this.playerBotR, this.obstacleGroupBotRInv, hit, null, this);

        this.campana.play();

        function collectCrystal(player, crystal) {
            if (crystal.visible) {
                this.score += this.valueOfCrystal;
                this.hielo.play();
            }
            crystal.setVisible(false);
        }

        function hit(player, obstacle) {
            if (this.hittable && this.currentInmuneTime <= 0) {
                if (obstacle.visible) {
                    if (this.lives > 1) {
                        this.removeLife();
                        this.lives--;
                        this.tapon.play();
                        this.currentInmuneTime = this.inmuneTime;
                    } else {
                        control.sendPoints();
                        this.removeLife();
                        this.destroyKeys();
                        this.scene.stop("PlayGame");
                    }
                }
                obstacle.setVisible(false);
            }
        }

    }

    addPlatformFloor(posX, posY) {
        this.nPlatformsTop++;
        let platform1;
        if (this.nPlatformsTop % this.frecuencytoAddPlatform == 0 || this.nPlatformsTop == 1) {
            if (this.platformPoolTop.getLength()) {
                platform1 = this.platformPoolTop.getFirst();
                if (posX == undefined && posY == undefined) {
                    platform1.x = 2400;
                    platform1.y = 268;
                } else {
                    platform1.x = posX;
                    platform1.y = posY;
                }
                platform1.active = true;
                platform1.visible = true;
                this.platformPoolTop.remove(platform1);
                platform1.displayWidth = platformWidth;
            } else {
                if (posX == undefined && posY == undefined) {
                    platform1 = this.add.tileSprite(2400, 268, 1600, 64, "ground");
                } else {
                    platform1 = this.add.tileSprite(posX, posY, 2048, 64, "ground");
                }
                this.physics.add.existing(platform1);
                platform1.body.setImmovable(true);
                platform1.body.setVelocityX(this.platformSpeed);
                platform1.active = true;
                platform1.visible = true;
                this.platformGroupTop.add(platform1);
            }
        }
    }

    addObstacle(location) {
        let obstacle1;
        let obstacleInv;
        if (this.obstaclePoolTop.getLength()) {
            obstacle1 = this.obstaclePoolTop.getFirst();
            obstacleInv = this.obstaclePoolTopInv.getFirst();
            obstacle1.x = 900;
            obstacle1.y = 480;
            obstacleInv.x = 900;
            obstacleInv.y = 480;
            obstacle1.active = true;
            obstacle1.visible = true;
            this.obstaclePoolTop.remove(obstacle1);
            obstacle1.displayWidth = platformWidth;

            obstacleInv.active = true;
            obstacleInv.visible = true;
            this.obstaclePoolTopInv.remove(obstacleInv);
            obstacleInv.displayWidth = platformWidth;
        } else {
            var random = this.randomIntFromInterval(1, 4);

            switch (random) {
                case 1:
                    obstacleInv = this.add.tileSprite(998, 180, 38, 110, "skyInv"); //InvBody
                    obstacle1 = this.add.tileSprite(1000, 180, 98, 120, "tree");
                    break;
                case 2:
                    obstacleInv = this.add.tileSprite(900, 200, 80, 50, "skyInv");
                    obstacle1 = this.add.tileSprite(900, 200, 119, 75, "stone");

                    break;
                case 3:
                    obstacleInv = this.add.tileSprite(993, 185, 55, 95, "skyInv");
                    obstacle1 = this.add.tileSprite(1000, 185, 101, 110, "snowMan");
                    break;
                case 4:
                    obstacleInv = this.add.tileSprite(900, 200, 60, 60, "skyInv");
                    obstacle1 = this.add.tileSprite(900, 200, 98, 75, "treeSmall");
                    break;
            }

            this.physics.add.existing(obstacle1);
            obstacle1.body.setImmovable(true);
            obstacle1.body.setVelocityX(this.platformSpeed);
            obstacle1.active = true;
            obstacle1.visible = true;

            this.physics.add.existing(obstacleInv);
            obstacleInv.body.setImmovable(true);
            obstacleInv.body.setVelocityX(this.platformSpeed);
            obstacleInv.active = true;
            obstacleInv.visible = true;

            this.addObstacleToGroup(obstacle1, obstacleInv, location)
        }
    }
    addObstacleToGroup(obstacle1, obstacleInv, location) {

        switch (location) {
            case 1:
                this.obstacleGroupTop.add(obstacle1);
                this.obstacleGroupTopInv.add(obstacleInv);
                this.cameraBotR.ignore([obstacle1, obstacleInv]);
                this.cameraTopR.ignore([obstacle1, obstacleInv]);
                this.cameraBot.ignore([obstacle1, obstacleInv]);
                break;
            case 2:
                this.obstacleGroupBot.add(obstacle1);
                this.obstacleGroupBotInv.add(obstacleInv);
                this.cameraBotR.ignore([obstacle1, obstacleInv]);
                this.cameraTopR.ignore([obstacle1, obstacleInv]);
                this.cameraTop.ignore([obstacle1, obstacleInv]);
                break;
            case 3:
                this.obstacleGroupBotR.add(obstacle1);
                this.obstacleGroupBotRInv.add(obstacleInv);
                this.cameraBot.ignore([obstacle1, obstacleInv]);
                this.cameraTopR.ignore([obstacle1, obstacleInv]);
                this.cameraTop.ignore([obstacle1, obstacleInv]);
                break;
            case 4:
                this.obstacleGroupTopR.add(obstacle1);
                this.obstacleGroupTopRInv.add(obstacleInv);
                this.cameraBotR.ignore([obstacle1, obstacleInv]);
                this.cameraBot.ignore([obstacle1, obstacleInv]);
                this.cameraTop.ignore([obstacle1, obstacleInv]);
                break;
        }
    }


    addCrystal() {
        let crystal1;
        if (this.crystalPool.getLength()) {
            crystal1 = this.crystalPool.getFirst();
            crystal1.x = 2400;
            crystal1.y = 100;
            crystal1.active = true;
            crystal1.visible = true;
            this.crystalPool.remove(crystal1);
            crystal1.displayWidth = platformWidth;
        } else {
            var random = this.randomIntFromInterval(50, 210)
            crystal1 = this.add.tileSprite(2400, random, 37, 30, "crystalBlue");
            this.physics.add.existing(crystal1);
            crystal1.body.setImmovable(true);
            crystal1.body.setVelocityX(this.platformSpeed);
            crystal1.setVisible(true);
            crystal1.active = true;
            crystal1.visible = true;
            this.crystalGroup.add(crystal1);
        }
    }


    jumpPlayerTop() {
        //this.cursors.up.isDown

        if (this.keyQ.isDown && (this.playerTop.body.touching.down || this.playerTopJumps < 23)) { //saltar
            this.playerTopJumps++;

            this.playerTop.anims.stop()
            this.playerTop.setVelocityY(this.runnersJumpY);
            this.playerTop.setVelocityX(this.runnersJumpX);
        }
        if (!this.playerTop.body.touching.down) { //velocidad durante salto
            this.playerTop.setVelocityX(this.runnersJumpX);
        }
    }

    jumpPlayerBot() {
        if (this.keyS.isDown && (this.playerBot.body.touching.down || this.playerBotJumps < 23)) {
            this.playerBotJumps++;
            this.playerBot.setVelocityY(this.runnersJumpY);
            this.playerBot.setVelocityX(this.runnersJumpX);
            this.playerBot.anims.stop()
        }
        if (!this.playerBot.body.touching.down) {
            this.playerBot.setVelocityX(this.runnersJumpX);
        }
    }

    jumpPlayerTopR() {
        if (this.keyP.isDown && (this.playerTopR.body.touching.down || this.playerTopRJumps < 23)) { //saltar
            this.playerTopRJumps++;
            this.playerTopR.anims.stop();
            this.playerTopR.setVelocityY(this.runnersJumpY);
            this.playerTopR.setVelocityX(this.runnersJumpX);
        }
        if (!this.playerTopR.body.touching.down) { //velocidad durante salto
            this.playerTopR.setVelocityX(this.runnersJumpX);
        }
    }

    jumpPlayerBotR() {
        if (this.keyL.isDown && (this.playerBotR.body.touching.down || this.playerBotRJumps < 23)) {
            this.playerBotRJumps++;
            this.playerBotR.setVelocityY(this.runnersJumpY);
            this.playerBotR.setVelocityX(this.runnersJumpX);
            this.playerBotR.anims.stop()
        }
        if (!this.playerBotR.body.touching.down) {
            this.playerBotR.setVelocityX(this.runnersJumpX);
        }
    }
}