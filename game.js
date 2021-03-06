import * as Phaser from 'phaser';
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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var cursorKeys = undefined;
var layer1 = undefined;
var mario = undefined;
var collisionGroup = [];
var isTextDisplayed = false;
var infoText;
var infoRect;
function preload() {
    this.load.setBaseURL('http://localhost:7777/');
    this.load.tilemapTiledJSON('tilejson', 'map/test.json');
    this.load.image('tiles', 'tiles.png');
    this.load.image('mario', 'mario.png');
}
function addHouseLayer(scene, map, tileset) {
    var house = map.createLayer('house', tileset, 0, 0);
    var housetop = map.createLayer('housetop', tileset, 0, 0);
    scene.physics.add.existing(house);
    house.setCollisionByProperty({ collide: true }, true, true);
    house.forEachTile(function (tile) {
        if (tile.canCollide) {
            collisionGroup.push(tile);
            // console.log(tile);
        }
    });
    scene.physics.add.existing(housetop);
}
function create() {
    cursorKeys = this.input.keyboard.createCursorKeys();
    var map = this.add.tilemap('tilejson');
    var tileset = map.addTilesetImage('test', 'tiles');
    var ground = map.createLayer('ground', tileset, 0, 0);
    addHouseLayer(this, map, tileset);
    mario = this.physics.add.sprite(300, 300, 'mario').setBounce(1, 1).setCollideWorldBounds(true).setScale(2);
    layer1 = map.createLayer('layerblock', tileset, 0, 0);
    layer1.setCollisionByProperty({ collide: true }, true, true);
    var layerPhysics = this.physics.add.existing(layer1);
    layerPhysics.body.pushable = false;
    mario.collideWorldBounds = true;
    layer1.forEachTile(function (tile) {
        if (tile.canCollide) {
            collisionGroup.push(tile);
        }
    });
    // if(config.physics.debug) {
    //     const debugGraphics = this.add.graphics().setAlpha(0.75);
    //     layerPhysics.renderDebug(debugGraphics, {
    //         tileColor: null, // Color of non-colliding tiles
    //         collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //         faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    //     });
    // }
}
function displayText(scene, text) {
    if (!isTextDisplayed) {
        infoRect = scene.add.rectangle(20, 526, 600, 40, 0xc7ba8b);
        infoText = scene.add.text(20, 516, text, {
            fontFamily: 'Courier',
            fontSize: '16px',
            color: '#000',
            stroke: '#000',
        });
        isTextDisplayed = true;
    }
}
function removeText() {
    if (infoText && infoRect && isTextDisplayed) {
        infoText.destroy();
        infoRect.destroy();
        isTextDisplayed = false;
    }
}
function update() {
    var scene = this;
    var collision = this.physics.collideTiles(mario, collisionGroup, function (colObj1, colObj2) {
        // console.log(colObj2)
        if (colObj2.properties.door) {
            console.log('door');
        }
        if (240 == colObj2.index || 239 == colObj2.index) {
            displayText(scene, 'Schwarzes Brett');
        }
    });
    if (!collision) {
        // removeText()
    }
    var isUpDown = cursorKeys.up.isDown;
    var isDownDown = cursorKeys.down.isDown;
    var isLeftDown = cursorKeys.left.isDown;
    var isRightDown = cursorKeys.right.isDown;
    var isSpaceDown = cursorKeys.space.isDown;
    var isShiftDown = cursorKeys.shift.isDown;
    var speed = 576 / 2;
    if (isUpDown) {
        mario.body.setVelocityY(-speed);
    }
    if (isDownDown) {
        mario.body.setVelocityY(+speed);
    }
    if (!isDownDown && !isUpDown) {
        mario.body.setVelocityY(0);
    }
    if (isLeftDown) {
        mario.body.setVelocityX(-speed);
    }
    if (isRightDown) {
        mario.body.setVelocityX(speed);
    }
    if (!isRightDown && !isLeftDown) {
        mario.body.setVelocityX(0);
    }
    if (isSpaceDown) {
        removeText();
    }
}
export var game = new Phaser.Game(config);
//# sourceMappingURL=game.js.map