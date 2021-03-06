class MyScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    mario = undefined;
    cursorKeys =undefined;

    create() {
        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    preload () {
        this.load.setBaseURL('http://localhost:7777/');
        this.load.image('tiles', 'tiles.png');
        this.load.image('mario', 'mario.png');
    }

    update() {
        var isUpDown = this.cursorKeys.up.isDown;
        var isDownDown = this.cursorKeys.down.isDown;
        var isLeftDown = this.cursorKeys.left.isDown;
        var isRightDown = this.cursorKeys.right.isDown;
        var isSpaceDown = this.cursorKeys.space.isDown;
        var isShiftDown = this.cursorKeys.shift.isDown;
        var speed= 576/2;

        

        if(isUpDown) {
            this.mario.body.setVelocityY (-speed)
        }
        if(isDownDown) {
            this.mario.body.setVelocityY (+speed)
        }
        if(!isDownDown && !isUpDown) {
            this.mario.body.setVelocityY (0)
        }
        if(isLeftDown) {
            this.mario.body.setVelocityX (-speed)
        }
        if(isRightDown) {
            this.mario.body.setVelocityX (speed)
        }
        if(!isRightDown && !isLeftDown) {
            this.mario.body.setVelocityX (0)
        }
        if(isSpaceDown){
            this.removeText();
        }
    }
}