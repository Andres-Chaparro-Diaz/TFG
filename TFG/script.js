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
             /*var config = {
                  type: Phaser.AUTO,
                  width: 800,
                  height: 600,

                  physics: {
                      default: "arcade"
                  },
                  scene: {
                      preload: preload,
                      create: create,
                      update: update
                  }
              };*/
         preload() {
             this.load.image('sky', 'assets/sky.png');
             this.load.image('background', 'assets/BG.png')
             this.load.image('ground', 'assets/ground.png');
             this.load.image('star', 'assets/star.png');
             this.load.image('tree', 'assets/Tree_2.png');
             this.load.image('treeSmall', 'assets/Tree_1.png');
             this.load.image('snowMan', 'assets/SnowMan.png');

             this.load.spritesheet('dude', 'assets/dude.png', {
                 frameWidth: 32,
                 frameHeight: 48
             });
         }

         // se crean las animaciones
         create() {
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
             //platforms = this.physics.add.staticGroup();
             //platforms2 = this.physics.add.staticGroup();

             //platforms1.create(400, 568, 'ground').setScale(2).refreshBody();
             //platforms2.create(400, 268, 'ground').setScale(2).refreshBody();

             /*let platform1 = this.add.tileSprite(400, 568, 800, 64, "ground");
             this.physics.add.existing(platform1);
             platform1.body.setVelocityX(-100);
             platform1.body.setImmovable(true);
             platform1.active = true;
             platform1.visible = true;

             let platform2 = this.add.tileSprite(400, 268, 800, 64, "ground");
             this.physics.add.existing(platform2);
             platform2.body.setVelocityX(-100);
             platform2.body.setImmovable(true);
             platform2.active = true;
             platform2.visible = true;*/


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
             this.addPlatformFloorTop(800, 268);
             this.addPlatformFloorBot(800, 568);

             this.playerBot = this.physics.add.sprite(90, 450, 'dude');
             this.playerBot.body.setGravityY(300);
             this.playerBot.setCollideWorldBounds(true);
             this.playerBotJumps = 0;

             this.playerTop = this.physics.add.sprite(90, 150, 'dude');
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

                 //child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); //esto es para que reboten
                 child.setGravityY(300);
                 if (child.body.touching.down) {
                     child.setVelocityX(-100)
                 }
             });


             this.stars2.children.iterate(function(child) {

                 //child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); //esto es para que reboten
                 child.setGravityY(300);
                 if (child.body.touching.down) {
                     child.setVelocityX(-100)
                 }
             });

             /*this.physics.add.collider(this.player, platform1);
             this.physics.add.collider(this.player2, platform2);

             this.physics.add.collider(this.stars, platform1);
             this.physics.add.collider(this.stars2, platform2);*/
             this.platformPlayerColliderBot = this.physics.add.collider(this.playerBot, this.platformGroupBot, function() {

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
                     this.playerTop.anims.play("run");
                     this.playerTop.body.setVelocityX(100);
                     this.playerTopJumps = 0;
                 }
             }, null, this);

             this.platformPlayerColliderTop = this.physics.add.collider(this.playerTop, this.platformGroupTop, function() {

                 // play "run" animation if the player is on a platform
                 if (!this.playerTop.anims.isPlaying) {
                     this.playerTop.anims.play("run");
                     this.playerTop.body.setVelocityX(100);
                     this.playerTopJumps = 0;
                 }
             }, null, this);

             this.platformObstacleColliderBot = this.physics.add.collider(this.obstacleGroupBot, this.platformGroupBot, function() {}, null, this);
             this.platformObstacleColliderTop = this.physics.add.collider(this.obstacleGroupTop, this.platformGroupTop, function() {}, null, this);

             //this.physics.add.overlap(this.playerBot, this.obstacleGroupBot, this.collectStar(), null, this);
             //this.physics.add.overlap(this.playerTop, stars, collectStar, null, this);

             //this.physics.add.overlap(player, stars2, collectStar, null, this);
             //this.physics.add.overlap(this.player2, this.obstacleGroupTop, collectStar(), null, this);
         }
         update() {
             this.jumpPlayerTop();
             this.jumpPlayerBot();
             let minDistance = 0
             this.score++;
             /*this.platformGroup.getChildren().forEach(function(platform) {
               let platformDistance = 64 - 1200 - platform.displayWidth / 2;
               console.log(platformDistance);
               let minDistance = 800;
               if (platformDistance < minDistance) {
                   minDistance = platformDistance;
                   rightmostPlatformHeight = platform.y;
               }
               if (platform.x < -platform.displayWidth / 2) {
                   this.platformGroup.killAndHide(platform);
                   this.platformGroup.remove(platform);
               }
           }, this);
           if (minDistance > this.nextPlatformDistance) {
   
               addPlatformFloorTop(this, nPlatforms);
           }*/

             var puntuacion = document.getElementById("spPuntuacion");
             puntuacion.textContent = this.score;
             this.addPlatformFloorBot();
             this.addPlatformFloorTop();
             if (this.score % 250 == 0 || this.score < 10) {
                 var random = this.randomIntFromInterval(1, 4);
                 if (random == 1 || random == 3) {
                     this.addTreeBot();
                     this.addSmallTreeTop();
                 } else {
                     this.addSmallTreeBot();
                     this.addTreeTop();
                 }
             }
             if (this.score >= 4000 && !this.created) {
                 this.created = true
                 this.createPJs()
             }
             if (this.created) {
                 this.jumpPlayerTop1();
                 this.jumpPlayerBot1();
             }
         }

         randomIntFromInterval(min, max) { // min and max included 
             return Math.floor(Math.random() * (max - min + 1) + min)
         }

         createPJs() {
             this.playerBot1 = this.physics.add.sprite(890, 450, 'dude');
             this.playerBot1.body.setGravityY(300);
             this.playerBot1.setCollideWorldBounds(true);
             this.playerBot1Jumps = 0;

             this.playerTop1 = this.physics.add.sprite(890, 150, 'dude');
             this.playerTop1.body.setGravityY(300);
             this.playerTop1.setCollideWorldBounds(true);
             this.playerTop1Jumps = 0;

             this.platformColliderBot1 = this.physics.add.collider(this.playerBot1, this.platformGroupBot, function() {

                 // play "run" animation if the player is on a platform
                 if (!this.playerBot1.anims.isPlaying) {
                     this.playerBot1.anims.play("run");
                     this.playerBot1.body.setVelocityX(100);
                     this.playerBot1Jumps = 0;
                 }
             }, null, this);

             this.platformColliderTop1 = this.physics.add.collider(this.playerTop1, this.platformGroupTop, function() {

                 // play "run" animation if the player is on a platform
                 if (!this.playerTop1.anims.isPlaying) {
                     this.playerTop1.anims.play("run");
                     this.playerTop1.body.setVelocityX(100);
                     this.playerTop1Jumps = 0;
                 }
             }, null, this);
         }

         collectStar(player, star) {
             star.disableBody(true, true);
         }

         addPlatformFloorBot(posX, posY) {
             this.nPlatformsBot++;
             let platform1;
             if (this.nPlatformsBot % 136 == 0 || this.nPlatformsBot == 1) {
                 if (this.platformPoolBot.getLength()) {
                     platform1 = this.platformPoolBot.getFirst();
                     if (posX == undefined && posY == undefined) {
                         platform1.x = 2400;
                         platform1.y = 568;
                     } else {
                         platform1.x = posX;
                         platform1.y = posY;
                     }
                     platform1.active = true;
                     platform1.visible = true;
                     this.platformPoolBot.remove(platform1);
                     platform1.displayWidth = platformWidth;

                 } else {
                     if (posX == undefined && posY == undefined) {
                         platform1 = this.add.tileSprite(2400, 568, 1600, 64, "ground");
                     } else {
                         platform1 = this.add.tileSprite(posX, posY, 2048, 64, "ground");
                     }
                     this.physics.add.existing(platform1);
                     //platform1.data = "ground" + nPlatforms;
                     platform1.body.setImmovable(true);
                     platform1.body.setVelocityX(-100);
                     platform1.active = true;
                     platform1.visible = true;
                     this.platformGroupBot.add(platform1);
                     //this.physics.add.collider(this.player, platform1);
                 }
                 this.nextPlatformDistance = 800;
             }


             /*if (nPlatforms >= 4) {
                 let gameObjects = scene.children.list
                 for (var i = 0; i < gameObjects.length - 4; i++) {
                     if (gameObjects[i].data != null) {
                         gameObjects[i].destroy;
                         this.children.list[i].destroy;
                     }
                 }
                 nPlatforms = 4
             }
             console.log(this.children.list)*/
         }

         addPlatformFloorTop(posX, posY) {
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

         addTreeBot(posX, posY) {
             let obstacle1;
             if (this.obstaclePoolBot.getLength()) {
                 obstacle1 = this.obstaclePoolBot.getFirst();
                 if (posX == undefined && posY == undefined) {
                     obstacle1.x = 1700;
                     obstacle1.y = 480;
                 } else {
                     obstacle1.x = posX;
                     obstacle1.y = posY;
                 }
                 obstacle1.active = true;
                 obstacle1.visible = true;
                 this.obstaclePoolBot.remove(obstacle1);
                 obstacle1.displayWidth = platformWidth;
             } else {
                 if (posX == undefined && posY == undefined) {
                     obstacle1 = this.add.tileSprite(1700, 480, 98, 120, "tree");
                 } else {
                     obstacle1 = this.add.tileSprite(posX, posY, 98, 120, "tree");
                 }
                 this.physics.add.existing(obstacle1);
                 obstacle1.body.setImmovable(true);
                 obstacle1.body.setVelocityX(-100);
                 obstacle1.active = true;
                 obstacle1.visible = true;
                 this.obstacleGroupBot.add(obstacle1);
             }
             this.nextPlatformDistance = 800;
         }

         addSmallTreeBot(posX, posY) {
             let obstacle1;
             if (this.obstaclePoolTop.getLength()) {
                 obstacle1 = this.obstaclePoolTop.getFirst();
                 if (posX == undefined && posY == undefined) {
                     obstacle1.x = 2000;
                     obstacle1.y = 492;
                 } else {
                     obstacle1.x = posX;
                     obstacle1.y = posY;
                 }
                 obstacle1.active = true;
                 obstacle1.visible = true;
                 this.obstaclePoolTop.remove(obstacle1);
                 obstacle1.displayWidth = platformWidth;
             } else {
                 if (posX == undefined && posY == undefined) {
                     obstacle1 = this.add.tileSprite(2000, 492, 117, 90, "treeSmall");
                 } else {
                     obstacle1 = this.add.tileSprite(posX, posY, 117, 90, "treeSmall");
                 }
                 this.physics.add.existing(obstacle1);
                 obstacle1.body.setImmovable(true);
                 obstacle1.body.setVelocityX(-100);
                 obstacle1.active = true;
                 obstacle1.visible = true;
                 this.obstacleGroupTop.add(obstacle1);
             }
             this.nextPlatformDistance = 800;
         }

         addTreeTop(posX, posY) {
             let obstacle1;
             if (this.obstaclePoolBot.getLength()) {
                 obstacle1 = this.obstaclePoolBot.getFirst();
                 if (posX == undefined && posY == undefined) {
                     obstacle1.x = 2000;
                     obstacle1.y = 180;
                 } else {
                     obstacle1.x = posX;
                     obstacle1.y = posY;
                 }
                 obstacle1.active = true;
                 obstacle1.visible = true;
                 this.obstaclePoolBot.remove(obstacle1);
                 obstacle1.displayWidth = platformWidth;
             } else {
                 if (posX == undefined && posY == undefined) {
                     obstacle1 = this.add.tileSprite(2000, 180, 98, 120, "tree");
                 } else {
                     obstacle1 = this.add.tileSprite(posX, posY, 98, 120, "tree");
                 }
                 this.physics.add.existing(obstacle1);
                 obstacle1.body.setImmovable(true);
                 obstacle1.body.setVelocityX(-100);
                 obstacle1.active = true;
                 obstacle1.visible = true;
                 this.obstacleGroupBot.add(obstacle1);
             }
             this.nextPlatformDistance = 800;
         }

         addSmallTreeTop(posX, posY) {
             let obstacle1;
             if (this.obstaclePoolTop.getLength()) {
                 obstacle1 = this.obstaclePoolTop.getFirst();
                 if (posX == undefined && posY == undefined) {
                     obstacle1.x = 1800;
                     obstacle1.y = 192;
                 } else {
                     obstacle1.x = posX;
                     obstacle1.y = posY;
                 }
                 obstacle1.active = true;
                 obstacle1.visible = true;
                 this.obstaclePoolTop.remove(obstacle1);
                 obstacle1.displayWidth = platformWidth;
             } else {
                 if (posX == undefined && posY == undefined) {
                     obstacle1 = this.add.tileSprite(1800, 192, 117, 90, "treeSmall");
                 } else {
                     obstacle1 = this.add.tileSprite(posX, posY, 117, 90, "treeSmall");
                 }
                 this.physics.add.existing(obstacle1);
                 obstacle1.body.setImmovable(true);
                 obstacle1.body.setVelocityX(-100);
                 obstacle1.active = true;
                 obstacle1.visible = true;
                 this.obstacleGroupTop.add(obstacle1);
             }
             this.nextPlatformDistance = 800;
         }

         jumpPlayerTop() {
             if (this.cursors.up.isDown) {
                 this.playerTopJumps++;
             }
             if (this.cursors.up.isDown && (this.playerTop.body.touching.down || this.playerTopJumps < 23)) { //saltar
                 this.playerTop.anims.stop()
                 this.playerTop.setVelocityY(-200);
                 this.playerTop.setVelocityX(0);
             }
             if (!this.playerTop.body.touching.down) { //velocidad durante salto
                 this.playerTop.setVelocityX(0);
             }
         }

         jumpPlayerBot() {
             if (this.cursors.space.isDown) {
                 this.playerBotJumps++;
             }
             if (this.cursors.space.isDown && (this.playerBot.body.touching.down || this.playerBotJumps < 23)) {
                 console.log(this.playerBotJumps);
                 this.playerBot.setVelocityY(-200);
                 this.playerBot.setVelocityX(0);
                 this.playerBot.anims.stop()

             }
             if (!this.playerBot.body.touching.down) {
                 this.playerBot.setVelocityX(0);
             }
         }

         jumpPlayerTop1() {
             if (this.cursors.down.isDown) {
                 this.playerTop1Jumps++;
             }
             if (this.cursors.down.isDown && (this.playerTop1.body.touching.down || this.playerTop1Jumps < 23)) { //saltar
                 this.playerTop1.anims.stop()
                 this.playerTop1.setVelocityY(-200);
                 this.playerTop1.setVelocityX(0);
             }
             if (!this.playerTop1.body.touching.down) { //velocidad durante salto
                 this.playerTop1.setVelocityX(0);
             }
         }

         jumpPlayerBot1() {
             if (this.cursors.right.isDown) {
                 this.playerBot1Jumps++;
             }
             if (this.cursors.right.isDown && (this.playerBot1.body.touching.down || this.playerBot1Jumps < 23)) {
                 console.log(this.playerBot1Jumps);
                 this.playerBot1.setVelocityY(-200);
                 this.playerBot1.setVelocityX(0);
                 this.playerBot1.anims.stop()

             }
             if (!this.playerBot1.body.touching.down) {
                 this.playerBot1.setVelocityX(0);
             }
         }
     }
 }

 script()