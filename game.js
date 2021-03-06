


var cursorKeys = undefined;
var layer1 = undefined;
var collisionGroup = [];
var isTextDisplayed = false;
var infoText;
var infoRect;






var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 576,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
            overlapBias: 8,
            tileBias: 32,
            fps: 60,
            fixedStep: true
        }
    },
    pixelArt: true,
    scene: [WorldScene, HouseScene]
};
var game = new Phaser.Game(config);