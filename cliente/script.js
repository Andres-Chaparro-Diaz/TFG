//const preloadGame = require("preloadGame")

function script() {
    let game;
    window.onload = function() {

        // object containing configuration options
        let gameConfig = {
            type: Phaser.AUTO,
            width: 1600, //800
            height: 600, //600
            scene: [preloadGame, playGame],
            backgroundColor: 0x0c88c7,

            // physics settings
            physics: {
                default: "arcade"
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

    class playGame extends Phaser.Scene {
        constructor() {
            super("PlayGame");
            this.score = 0;
            this.created = false;


        }

        create() {

            this.add.image(400, 300, 'sky');
            this.add.image(1200, 300, 'sky');

            this.nPlatformsBot = 0;
            this.nPlatformsTop = 0;
            this.nPlatformsBotR = 0;
            this.nPlatformsTopR = 0;

            this.platformGroupBot = this.add.group({

                // once a platform is removed, it's added to the pool
                removeCallback: function(platform) {
                    platform.scene.platformPoolBot.add(platform)
                }
            });
            this.platformPoolBot = this.add.group({
                // once a platform is removed from the pool, it's added to the active platforms group
                removeCallback: function(platform) {
                    platform.scene.platformGroupBot.add(platform)
                }
            });

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

            this.addPlatformFloor(800, 268);


            this.playerBot = this.physics.add.sprite(90, 150, 'dude');
            this.playerBot.body.setGravityY(300);
            this.playerBot.setCollideWorldBounds(true);
            this.playerBotJumps = 0;

            this.playerTop = this.physics.add.sprite(90, 150, 'dudeBlue');
            this.playerTop.body.setGravityY(300);
            this.playerTop.setCollideWorldBounds(true);
            this.playerTopJumps = 0;
            this.cursors = this.input.keyboard.createCursorKeys();

            this.stars = this.physics.add.group({ // agrega 11 estrellas no terminan de funcionar porqtengo que poner el collider con las plataformas añadidas
                key: 'star',
                repeat: 11,
                setXY: {
                    x: 12,
                    y: 500,
                    stepX: 70
                }
            });

            this.stars2 = this.physics.add.group({ // agrega 11 estrellas
                key: 'star',
                repeat: 11,
                setXY: {
                    x: 12,
                    y: 0,
                    stepX: 70
                }
            });

            this.stars.children.iterate(function(child) {

                child.setGravityY(300);
                if (child.body.touching.down) {
                    child.setVelocityX(-100)
                }
            });


            this.stars2.children.iterate(function(child) {

                child.setGravityY(300);
                if (child.body.touching.down) {
                    child.setVelocityX(-100)
                }
            });

            /*this.physics.add.collider(this.player, platform1);
            this.physics.add.collider(this.player2, platform2);

            this.physics.add.collider(this.stars, platform1);
            this.physics.add.collider(this.stars2, platform2);*/
            this.platformPlayerColliderBot = this.physics.add.collider(this.playerBot, this.platformGroupTop, function() {

                // play "run" animation if the player is on a platform
                if (!this.playerBot.anims.isPlaying) {
                    this.playerBot.anims.play("run");
                    this.playerBot.body.setVelocityX(100);
                    this.playerBotJumps = 0;
                }
            }, null, this);


            this.platformPlayerColliderTop = this.physics.add.collider(this.playerTop, this.platformGroupTop, function() {

                // play "run" animation if the player is on a platform
                if (!this.playerTop.anims.isPlaying) {
                    this.playerTop.anims.play("runBlue");
                    this.playerTop.body.setVelocityX(100);
                    this.playerTopJumps = 0;
                }
            }, null, this);

            this.platformObstacleColliderBot = this.physics.add.collider(this.obstacleGroupBot, this.platformGroupBot, function() {}, null, this);
            this.platformObstacleColliderTop = this.physics.add.collider(this.obstacleGroupTop, this.platformGroupTop, function() {}, null, this);

            //this.physics.add.overlap(this.playerBot, this.obstacleGroupBot, this.collectStar(), null, this);
            //this.physics.add.overlap(this.playerTop, stars, collectStar, null, this);

            this.physics.add.overlap(this.playerBot, this.crystalGroup, collectCrystal, null, this);
            this.physics.add.overlap(this.playerTop, this.crystalGroup, collectCrystal, null, this);

            this.cameraBot.ignore([this.playerTop, this.platformGroupTop, this.obstacleGroupTopR, this.obstacleGroupBotR, this.obstacleGroupTop]);
            this.cameraTop.ignore([this.playerBot, this.platformGroupTop, this.obstacleGroupTopR, this.obstacleGroupBotR, this.obstacleGroupBot]);
            this.cameraTopR.ignore([this.playerBot, this.playerTop, this.platformGroupTop, this.obstacleGroupTopR, this.obstacleGroupBotR, this.obstacleGroupBot]);
            this.cameraBotR.ignore([this.playerBot, this.playerTop, this.platformGroupTop, this.obstacleGroupTopR, this.obstacleGroupBotR, this.obstacleGroupBot]);

            function collectCrystal(player, crystal) {
                if (crystal.visible) {
                    this.score += 1000;
                }
                crystal.setVisible(false);
            }
        }
        update() {
            this.jumpPlayerTop();
            this.jumpPlayerBot();
            let minDistance = 0
            this.score++;

            var puntuacion = document.getElementById("spPuntuacion");
            puntuacion.textContent = this.score;
            this.addPlatformFloor();
            this.addObstacle();
            if (this.score >= 200 && !this.created) {
                this.created = true
                this.createPJs()
            }
            if (this.score % 200 == 0) {
                this.addCrystal();
            }
            if (this.created) {
                this.jumpPlayerTopR();
                this.jumpPlayerBotR();
            }

        }

        randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        createPJs() {
            this.playerBotR = this.physics.add.sprite(90, 150, 'dudeGreen');
            this.playerBotR.body.setGravityY(300);
            this.playerBotR.setCollideWorldBounds(true);
            this.playerBotRJumps = 0;

            this.playerTopR = this.physics.add.sprite(90, 150, 'dudeRed');
            this.playerTopR.body.setGravityY(300);
            this.playerTopR.setCollideWorldBounds(true);
            this.playerTopRJumps = 0;


            this.cameraBot.ignore([this.playerTopR, this.playerBotR]);
            this.cameraTop.ignore([this.playerBotR, this.playerTopR]);
            this.cameraTopR.ignore([this.playerBotR]);
            this.cameraBotR.ignore([this.playerTopR]);

            this.platformColliderBotR = this.physics.add.collider(this.playerBotR, this.platformGroupTop, function() {

                // play "run" animation if the player is on a platform
                if (!this.playerBotR.anims.isPlaying) {
                    this.playerBotR.anims.play("runGreen");
                    this.playerBotR.body.setVelocityX(100);
                    this.playerBotRJumps = 0;
                }
            }, null, this);

            this.platformColliderTopR = this.physics.add.collider(this.playerTopR, this.platformGroupTop, function() {

                // play "run" animation if the player is on a platform
                if (!this.playerTopR.anims.isPlaying) {
                    this.playerTopR.anims.play("runRed");
                    this.playerTopR.body.setVelocityX(100);
                    this.playerTopRJumps = 0;
                }
            }, null, this);
        }


        addObstacle() {
            if (this.score % 150 == 0 || this.score < 10) {
                this.addObstacleTop();
            }
        }

        addPlatformFloor(posX, posY) {
            this.nPlatformsTop++;
            let platform1;
            if (this.nPlatformsTop % 136 == 0 || this.nPlatformsTop == 1) {
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
                    platform1.body.setVelocityX(-100);
                    platform1.active = true;
                    platform1.visible = true;
                    this.platformGroupTop.add(platform1);
                }
                this.nextPlatformDistance = 800;
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
                crystal1.body.setVelocityX(-100);
                crystal1.setVisible(true);
                crystal1.active = true;
                crystal1.visible = true;
                this.crystalGroup.add(crystal1);
            }
        }
        addObstacleTop(posX, posY) {
            let obstacle1;
            if (this.obstaclePoolTop.getLength()) {
                obstacle1 = this.obstaclePoolTop.getFirst();
                if (posX == undefined && posY == undefined) {
                    obstacle1.x = 1700;
                    obstacle1.y = 480;
                } else {
                    obstacle1.x = posX;
                    obstacle1.y = posY;
                }
                obstacle1.active = true;
                obstacle1.visible = true;
                this.obstaclePoolTop.remove(obstacle1);
                obstacle1.displayWidth = platformWidth;
            } else {
                var random = this.randomIntFromInterval(1, 4);
                if (posX == undefined && posY == undefined) {

                    if (random == 1) {
                        obstacle1 = this.add.tileSprite(2000, 180, 98, 120, "tree");
                    } else if (random == 2) {
                        obstacle1 = this.add.tileSprite(1800, 200, 119, 75, "stone");
                    } else if (random == 3) {
                        obstacle1 = this.add.tileSprite(2000, 185, 101, 110, "snowMan");
                    } else {
                        obstacle1 = this.add.tileSprite(1800, 200, 98, 75, "treeSmall");
                    }
                } else {
                    if (random == 1) {
                        obstacle1 = this.add.tileSprite(posX, posY, 98, 120, "tree");
                    } else if (random == 2) {
                        obstacle1 = this.add.tileSprite(posX, posY, 98, 75, "stone");
                    } else if (random == 3) {
                        obstacle1 = this.add.tileSprite(posX, posY, 101, 110, "snowMan");
                    } else {
                        obstacle1 = this.add.tileSprite(posX, posY, 98, 75, "treeSmall");

                    }
                }
                this.physics.add.existing(obstacle1);
                obstacle1.body.setImmovable(true);
                obstacle1.body.setVelocityX(-100);
                obstacle1.active = true;
                obstacle1.visible = true;

                this.addObstacleToGroup(obstacle1)
            }
            this.nextPlatformDistance = 800;
        }
        addObstacleToGroup(obstacle1) {
            var random = this.randomIntFromInterval(1, 4);
            switch (random) {
                case 1:
                    this.obstacleGroupBot.add(obstacle1);
                    this.cameraBotR.ignore([obstacle1]);
                    this.cameraTopR.ignore([obstacle1]);
                    this.cameraTop.ignore([obstacle1]);
                    break;
                case 2:
                    this.obstacleGroupTop.add(obstacle1);
                    this.cameraBotR.ignore([obstacle1]);
                    this.cameraTopR.ignore([obstacle1]);
                    this.cameraBot.ignore([obstacle1]);
                    break;
                case 3:
                    this.obstacleGroupBotR.add(obstacle1);
                    this.cameraBot.ignore([obstacle1]);
                    this.cameraTopR.ignore([obstacle1]);
                    this.cameraTop.ignore([obstacle1]);
                    break;
                case 4:
                    this.obstacleGroupTopR.add(obstacle1);
                    this.cameraBotR.ignore([obstacle1]);
                    this.cameraBot.ignore([obstacle1]);
                    this.cameraTop.ignore([obstacle1]);
                    break;
            }
        }

        jumpPlayerTop() {
            if (this.cursors.up.isDown && (this.playerTop.body.touching.down || this.playerTopJumps < 23)) { //saltar
                this.playerTopJumps++;

                this.playerTop.anims.stop()
                this.playerTop.setVelocityY(-200);
                this.playerTop.setVelocityX(0);
            }
            if (!this.playerTop.body.touching.down) { //velocidad durante salto
                this.playerTop.setVelocityX(0);
            }
        }

        jumpPlayerBot() {
            if (this.cursors.space.isDown && (this.playerBot.body.touching.down || this.playerBotJumps < 23)) {
                this.playerBotJumps++;
                console.log(this.playerBotJumps);
                this.playerBot.setVelocityY(-200);
                this.playerBot.setVelocityX(0);
                this.playerBot.anims.stop()
            }
            if (!this.playerBot.body.touching.down) {
                this.playerBot.setVelocityX(0);
            }
        }

        jumpPlayerTopR() {
            if (this.cursors.right.isDown && (this.playerTopR.body.touching.down || this.playerTopRJumps < 23)) { //saltar
                this.playerTopRJumps++;
                this.playerTopR.anims.stop();
                this.playerTopR.setVelocityY(-200);
                this.playerTopR.setVelocityX(0);
            }
            if (!this.playerTopR.body.touching.down) { //velocidad durante salto
                this.playerTopR.setVelocityX(0);
            }
        }

        jumpPlayerBotR() {
            if (this.cursors.down.isDown && (this.playerBotR.body.touching.down || this.playerBotRJumps < 23)) {
                console.log(this.playerBotRJumps);
                this.playerBotRJumps++;
                this.playerBotR.setVelocityY(-200);
                this.playerBotR.setVelocityX(0);
                this.playerBotR.anims.stop()
            }
            if (!this.playerBotR.body.touching.down) {
                this.playerBotR.setVelocityX(0);
            }
        }
    }
}

script()