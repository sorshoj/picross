/**
 * Main working file for the picross game
 * 
 * need to divide to make more readable in future.
 */

//const customCanvas = document.createElement('canvas');
//customCanvas.style = "top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:5px solid #212529";



class GameScene extends Phaser.Scene {
    constructor ()
    {
        super('GameScene');
        console.log('hit the constructor');

    }

    preload ()
    {
        // TODO move these loads to a different scene
        // these are reloaded every new game

        this.load.image('square', 'assets/square_v2.png');
        this.load.image('newgame', 'assets/newgame_v2.png');
        this.load.image('infobutton', 'assets/info_button_v2.png');
        console.log('hit the preload');
        this.load.image('select', 'assets/temp.png');

        // RESET VARIABLES FOR NEW GAME
        this.x = 10;
        this.y = 10;
        this.margin = 150;
        this.square_length = 50;
        let a = boardGeneration(this.x, this.y);
        this.xclues = a[0];
        this.yclues = a[1];
        this.Board = a[2];
        this.board_green = a[3];
        
        this.registry.set('lastSquare', -1);
        this.registry.set('board_green', 0);
        this.registry.set('player_red', 0);
        this.registry.set('time_start', Date.now());
        
        this.player_green = 0;
        this.player_board = new Array(this.x*this.y);

        this.graphics = this.add.graphics();
        this.graphics.setDepth(100);

    }


    create ()
    {                
        let start_x = 0;
        let start_y = 0;
        let square_length = this.square_length;
        let margin = this.margin;
        let x = this.x;
        let y = this.y;
        let mod_val = (square_length*x);

        // create interactive image array
        // & click function
        for (let i = 0; i < this.Board.length; i++) {
            let tent = this.add.image(start_x+margin, start_y+margin, 'square').setOrigin(0,0).setInteractive();
            
            tent.setData('index', i);
            tent.setData('board', this.Board[i]);
            tent.setData('found', 0);
            tent.setData('color', 0);

            this.player_board[i] = tent;
            start_x = (start_x + square_length) % mod_val;
            if (start_x == 0){
                start_y = start_y + square_length;
            }

        }


        // PLAYER INPUT
        this.input.on('pointerdown', function(pointer, currentlyOver) {
            if (currentlyOver.length == 0) {
                this.registry.set('lastSquare', -1);

            } else {
                let index1 = currentlyOver[0].getData('index')
                this.registry.set('lastSquare', index1);
            }
        }, this);


        // TODO can make this more efficient
        this.input.on('pointerup', function(pointer, currentlyOver) {
            if (currentlyOver.length == 0) {
                return;
            }
            let currSquare = currentlyOver[0].getData('index')
            let lastSquare = this.registry.get('lastSquare');

            // case : same square ? 

            if (lastSquare >= 0){
                // either the same row
                if (Math.abs(lastSquare-currSquare) <= 9){
                    // check if the same row
                    if (Math.floor(lastSquare/this.x) == Math.floor(currSquare/this.x)){
                        let squares = [];
                        for (let i = Math.min(lastSquare, currSquare); i <= Math.max(lastSquare, currSquare); i++){
                            squares.push(i);
                        }
                        setAllTint(squares, pointer.rightButtonDown(), this);
                    }
                }
                // or the same column
                else if (lastSquare%this.y == currSquare%this.y) {
                    let squares = []
                    for (let i = Math.min(lastSquare, currSquare); i <= Math.max(lastSquare, currSquare); i+=this.x){

                        squares.push(i);
                    }
                    setAllTint(squares, pointer.rightButtonDown(), this);
                }
                else {
                    console.log("NO MATCH");
                }

            }
        }, this);



        // Highlight game squares that are moused over
        this.input.on('pointerover', function(pointer, currentlyOver){
            // check if object is game board square
            if (currentlyOver[0].getData('index')){
                currentlyOver[0].setTint(0xfff691);
            }
            return;
        });

        // Resets the previous color of the square, if any
        this.input.on('pointerout', function(pointer, currentlyOver){
            let color = currentlyOver[0].getData('color');
            if (color == 0) {
                currentlyOver[0].clearTint();
            } else if (color) {
                currentlyOver[0].setTint(color);
            }
            return;
        }, this);

        drawClues(this);

        drawGuidelines(this);
        
        // restart button
        let newgame_butt = this.add.image(margin+5*square_length-62.5, config.height-100, 'newgame').setOrigin(0,0).setInteractive();
        newgame_butt.on('pointerdown', this.newGame, this);

        
        // clue helper algo (auto greys out when row/col completes)
        // TODO make optional in settings
        // TODO can make more efficient?

        this.input.on('pointerup', function() {
            // check rows
            for (let i = 0; i < this.x; i++) {
                let all_green = 0;
                let found_green = 0;
                for (let j = 0; j < this.y; j++) {
                    if (this.Board[i*this.x + j] == 1) {
                        all_green += 1;
                        if (this.player_board[i*this.x + j].getData('found') == 1){
                            found_green += 1;
                        }
                    }
                }
                // all green in row has been found
                if (all_green == found_green) {
                    for (let j = 0; j < this.y; j++) {
                        if (this.player_board[i*this.x+j].getData('found') == 0){
                            this.player_board[i*this.x+j].setTint(0x828282);
                            this.player_board[i*this.x+j].setData('found', 2);
                            this.player_board[i*this.x+j].setData('color', 0x828282);
                        }
                    }
                }
            }

            // check columns
            for (let j = 0; j < this.y; j++) {
                let all_green = 0;
                let found_green = 0;
                for (let i = 0; i < this.x; i++) {
                    if (this.Board[i*this.x + j] == 1) {
                        all_green += 1;
                        if (this.player_board[i*this.x + j].getData('found') == 1){
                            found_green += 1;
                        }
                    }
                }
                // all green in row has been found
                if (all_green == found_green) {
                    for (let i = 0; i < this.x; i++) {
                        if (this.player_board[i*this.x+j].getData('found') == 0){
                            this.player_board[i*this.x+j].setTint(0x828282);
                            this.player_board[i*this.x+j].setData('found', 2);
                            this.player_board[i*this.x+j].setData('color', 0x828282);                                    
                        }
                    }
                }
            }

        }, this);  
        
        // info button
        let info_butt = this.add.image(config.width-100,config.height-100, 'infobutton').setOrigin(0,0).setInteractive();
        info_butt.on('pointerdown', function (pointer) {
            this.scene.pause();
            this.scene.run('InfoScene');
        }, this);


        /**
         * End Scene Listener
         * Counts the number of found green squares.
         * Ends game scene if found equals total.
         * Adds green and red count to registry for statistics.
         * 
         * @TODO can change to a game object listener instead of pointer?
         * @TODO can definitely move green_count to be a global variable
         * @TODO accuracy is wrong now
         */
        this.input.on('pointerup', function(){

            // count the number of found green squares & compare
            let green_count = 0;
            let red_count = 0;
            for (let i = 0; i < this.player_board.length; i++) {
                if (this.player_board[i].getData('board') == 1) {
                    if (this.player_board[i].getData('found') == 1 ){
                        green_count += 1;
                    }
                } else {
                    if (this.player_board[i].getData('found') == 1){
                        red_count += 1;
                    }
                }
            }

            if (this.registry.get('board_green') == this.board_green) {
                // add found green and red to registry
                //this.registry.set('board_green', this.board_green);
                //this.registry.set('player_red', red_count);
                
                // end the game scene
                this.scene.pause();
                newgame_butt.setVisible(0);
                this.scene.run('EndScene');
            }
        }, this);


    }

    /**
     * Listener function, restarts scene.
     */
    newGame(){
        console.log('new game');
        this.scene.restart();
        return;
    }
}
        

var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    parent: 'phaser-example',
    scene: [ GameScene, EndScene, InfoScene],
    //transparent: true,
    backgroundColor: 0x212529,
    canvas: this.canvas2,
    parent:"picross-canvas",
    disableContextMenu: true,
};

var game = new Phaser.Game(config);

        