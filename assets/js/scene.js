/**
 * Contains classes for end scene and info scene
 */

class EndScene extends Phaser.Scene {
    constructor ()
    {
        super('EndScene');
    }
    preload() 
    {
        this.load.image('endscene', 'assets/endscene_v2.png');                
    }

    create ()
    {
        this.add.image(100, 100, 'endscene').setOrigin(0,0).setAlpha(0.85);

        // new game button
        let newgame_butt = this.add.image(337.5, config.height-100, 'newgame').setOrigin(0,0).setInteractive();
        newgame_butt.on('pointerdown', this.newgame, this);
        
        // display accuracy statistic
        let board_green = this.registry.get('board_green');
        let player_red = this.registry.get('player_red');
        this.add.text(150, config.height-100, "Accuracy: " + Math.round(board_green/(player_red+board_green)*10000)/100 + "%", {font : '20px Arial'});

        let time = Math.floor((Date.now() - this.registry.get('time_start')) / 1000);
        let minutes = Math.floor(time/60);
        let seconds = time % 60;
        this.add.text(150, config.height-75, "Time: " + minutes + ":" + seconds, {font : '20px Arial'});
    }

    newgame ()
    {
        console.log('new game');
        this.scene.start("GameScene");
    }
}


class InfoScene extends Phaser.Scene {
    constructor ()
    {
        super('InfoScene');
    }
    preload () {
        this.load.image('info', 'assets/infoscene_v2.png');
    }
    create () {
        this.add.image(100, 100, 'info').setOrigin(0,0).setAlpha(0.90);
        this.input.once('pointerdown', this.disappear, this);
    }
    disappear () {
        this.scene.stop();
        this.scene.resume("GameScene");
    }
}