


/**
 * Draws blue guidelines & toggle button on canvas
 * @param context
 */
var drawGuidelines = function(context)
{
    let square_length = context.square_length;
    let margin = context.margin;

    // drawing the guidelines
    context.graphics.lineStyle(3, 0x1023ED, 1.0);

    context.graphics.beginPath();
    context.graphics.lineBetween(margin+(square_length*context.x/2), margin-5,margin+(square_length*context.x/2), margin+(square_length*context.y)+5)
    context.graphics.lineBetween(margin-5, margin+(square_length*context.y/2), margin+(square_length*context.x)+5, margin+(square_length*context.y/2));
    context.graphics.closePath();
    context.graphics.strokePath();

    // creating button
    context.guideline_butt = context.add.image(750,255, 'square').setOrigin(0,0).setInteractive();
    context.guideline_butt.setTint(0x1023ED);
    context.add.text(805, 270, 'Toggle Guidelines', {font : '20px Arial'});
    context.guideline_butt.on('pointerdown', listenerGuidelines, context);
    context.guideline_butt.setTint(0x1023ED);
};

// listener function to toggle guidelines visibility using tint
var listenerGuidelines = function(){   
    // if fn has never been called before
    if (!this.registry.has('guidelines')) {
        this.registry.set('guidelines', 1);
    }

    if (this.registry.get('guidelines') == 0) {
        this.registry.set('guidelines', 1);
        this.graphics.setAlpha(1.0);
        this.guideline_butt.setTint(0x1023ED);
    } else {
        this.registry.set('guidelines', 0);
        this.graphics.setAlpha(0.0);
        this.guideline_butt.clearTint();
    }
    return;
}

var drawClues = function(context){
    // add xclues to screen
    // offset from the font size
    let margin = context.margin;
    let square_length = context.square_length;
    let ypos = margin + (square_length/2 - 10);
    let xpos = margin / 3;
    for (let i = 0; i < context.xclues.length; i++) {
        context.add.text(xpos, ypos, "" + context.xclues[i], {font : '20px Arial'});
        ypos += square_length;
    }

    // add yclues to screen
    xpos = margin + (square_length/2 - 5);
    for (let i = 0; i < context.yclues.length; i++) {
        ypos = margin / 3;
        for (let j = 0; j < context.yclues[i].length; j++){
            context.add.text(xpos, ypos, "" + context.yclues[i][j], {font: '20px Arial'});
            ypos+=20;
        }
        xpos += square_length;
    }
    return;
}

/**
 * Helper function. Sets all given squares to appropriate color. 
 * Changes 'found' data of selected squares.
 * @TODO might be able to eliminate found = 2
 * Changes 'color' data of selected squares
 * @param {array} squares - array of indexes
 * @param {boolean} isGrey - true: set to grey, false: set to red|green
 */
var setAllTint = function(squares, isGrey, context){
    for (let i = 0; i < squares.length; i++) {
        let currSquare = context.player_board[squares[i]];
        if (currSquare.getData('found') != 1) {
            if (isGrey) {
                if (currSquare.getData('found') == 2) {
                    currSquare.clearTint();
                    currSquare.setData('found', 0);
                    currSquare.setData('color', 0);
                } else {
                    // grey
                    currSquare.setTint(0x828282);
                    currSquare.setData('found', 2);
                    currSquare.setData('color', 0x828282);
                }
            } else {
                if (currSquare.getData('board') == 1) {
                    // green
                    currSquare.setTint(0x05fa46);
                    currSquare.setData('color', 0x05fa46);
                    context.registry.set('board_green', context.registry.get('board_green')+1);
                } else {
                    // red
                    currSquare.setTint(0xff0000);
                    currSquare.setData('color', 0xff0000);
                    context.registry.set('player_red', context.registry.get('player_red')+1);
                }
                currSquare.setData('found', 1);
            }
        }
    }
    return;
}


/**
 * Helper function for game board generation
 * @param {int} x - x size of board
 * @param {int} y - y size of board
 * Returns an array of listed objects
 * @return {array} temp_xclues - clues on x axis
 * @return {array} temp_yclues - clues on y axis
 * @return {array} temp_board - x by y nested array representation of the game board
 * @return {int} board_green - number of '1' squares AKA green squares
 */
var boardGeneration = function(x, y) {

    let temp_yclues = new Array(y);
    let temp_xclues = new Array(x);
    let temp_board = new Array((x*y));
    let board_green = 0;

    // fill for edge cases
    for (let i = 0; i < y; i++) {
        temp_yclues[i] = [0];
    }
    for (let i = 0; i < x; i++) {
        temp_xclues[i] = [0];
    }


    let previous_row = []

    for (let i = 0; i < x; i++) {

        let current_row = [];
        for (let j = 0; j < y; j++) {
            
            // NUMBER SELECTION
            let num = Math.floor(Math.random() * 2);

            temp_board[(i*x)+j] = num;
            current_row.push(num);

            // CLUE LOGIC
            if (num == 1) {

                board_green += 1;

                // 1. if temp_xclues[i] has a 0 (AKA empty)
                // 2. if this is first val in current_row
                // 3. if the prev val in current_row is 1
                // 4. else push 1 to temp_xclues

                let x_index = current_row.length - 1;

                if (temp_xclues[i][0] == 0) {
                    temp_xclues[i][0] = 1;
                } 
                else if (x_index == 0) {
                    temp_xclues[i].push(1);
                } 
                else if (current_row[x_index-1] == 1) {                    
                    let xclues_index = temp_xclues[i].length - 1;
                    let x_clue = temp_xclues[i][xclues_index] + 1;
                    temp_xclues[i][xclues_index] = x_clue;
                } 
                else {
                    temp_xclues[i].push(1);
                }


                // 1. if temp_yclues[i] has a 0 (AKA empty)
                // 2. if previous_row[j] is 1 & temp_yclues not empty
                // 3. else push 1 to temp_yclues

                if (temp_yclues[j][0] == 0) {
                    temp_yclues[j][0] = 1;
                }
                else if (previous_row[j] == 1 && temp_yclues[j].length != 0) {
                    let yclues_index = temp_yclues[j].length - 1;
                    let y_clue = temp_yclues[j][yclues_index] + 1;
                    temp_yclues[j][yclues_index] = y_clue;
                } 
                else {
                    temp_yclues[j].push(1);
                }
            }
        }
        previous_row = current_row;
    }

    //console.log(temp_board.toString());

    // TODO what other assertions can be made?

    // ASSERTIONS
    console.assert(temp_yclues.length == y, "y clues are an incorrect length");
    console.assert(temp_xclues.length == x, "x clues are an incorrect length");

    return [temp_xclues, temp_yclues, temp_board, board_green];
}
