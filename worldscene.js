class WorldScene extends MyScene {
    constructor(config) {
        super('WorldScene');
    }



    addHouseLayer(scene, map, tileset) {
        var house = map.createLayer('house', tileset, 0,0);
        var housetop = map.createLayer('housetop', tileset, 0,0);

        scene.physics.add.existing(house)
        house.setCollisionByProperty({collide:true}, true, true);
        house.forEachTile(function(tile) {
            if(tile.canCollide) {
                collisionGroup.push(tile);
                console.log(tile);
            }
        });
        scene.physics.add.existing(housetop)
    }


    displayText( scene, text ) {
        if(!isTextDisplayed){
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

    removeText() {
        if(infoText && infoRect && isTextDisplayed ) {
            infoText.destroy();
            infoRect.destroy();
            isTextDisplayed = false;
        }
    }


    preload () {
        super.preload();
        this.load.tilemapTiledJSON('tilejson', 'map/test.json');
    }

    create ()
    {
        super.create();
        var map = this.add.tilemap('tilejson');
        var tileset = map.addTilesetImage('maintiles', 'tiles');
        var ground = map.createLayer('ground', tileset, 0,0);
        this.addHouseLayer(this,map, tileset);
        
        this.mario = this.physics.add.sprite(300, 300, 'mario').setCollideWorldBounds(true).setScale(2);
        layer1 = map.createLayer('layerblock', tileset, 0,0);
        layer1.setCollisionByProperty({collide:true}, true, true);

        var layerPhysics = this.physics.add.existing(layer1);
        layerPhysics.body.pushable = false;
        
        
        layer1.forEachTile(function(tile) {
            if(tile.canCollide) {
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

    update ()
    {
        super.update();
        var scene = this;
        var collision = this.physics.collideTiles(this.mario, collisionGroup, function(colObj1, colObj2){
            // console.log(colObj2)
            if(colObj2.properties.door) {
                // console.log('door')
                scene.scene.start('HouseScene');
            }
            if(240 == colObj2.index || 239 == colObj2.index) {
                scene.displayText(scene, 'Schwarzes Brett');
                
            } 

        });
        if(!collision) {
            // removeText()
        }
        
    }
}
