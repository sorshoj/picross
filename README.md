# Picross

Static Site Here: https://picross-jzara.ondigitalocean.app/

### Progress So Far
- board creation (with eventual customisable board sizes)
- player board to obscure solution from player
- clue generation (the numbers on typically atop the picross board) 
- [11/16] implemented very basic player input/output
- [12/12] have changed to a web version, using javascript and phaser library. Created visual assets for board. reimplemented clue generation and board creation
- [12/15] have implemented scenes and created an endscene & trigger
- [12/29] added an information scene w/ rules about the game
- [1/19] changed board generation algorithm. progress in making entire doc more in line w/ JS best practices
- [2/8] now hosting this project on Digital Ocean as a static page
- [2/9] changed the visual assets, [2/10] added guidelines

### To Do
- edge case --> rows with 0 auto fill with grey after the first click (what is expected response here?)
- use this.registry to share info inbetween scenes 
- add settings to change board size
- add buttons/options for refreshing, resetting board, etc.
- add an optional timer
- add end of game statistics
- decide on the rules 
    - chill mode : no penalty for wrong guesses, doesnt count mistakes [11/16] for now, implementing this mode
    - will also need to algorithmically decide on multiple solutions/make boards with only 1 solution?

### Open Issues
- hitting the preload() whenever doing a new game may be reloading all assets into memory + still holding previous arrays, clues, all vars, etc. Could cause memory issues down the line --> not an issue ATM.


### Completed
- make it pretty
- fix y clues for large boards. clues are unreadable at 10x10 COMPLETED [1/24]
- implement autofill - when all the squares in a row/col are found it is auto filled in with gray COMPLETED [1/19]
- change clue color, when completed COMPLETED
- need a create an ending screen / end state. need to create the conditions for ending (i.e. every square is filled in or all squares have been found) COMPLETED [12/29]
- [11/16] want to find a better solution. numpy arrays clash with player intuitive indexing. [12/12] using different language, no longer issue
- make interactive, players need to input guesses [11/16] implement way for players to input a range of guesses that are all either blank/square [12/12] COMPLETED


### Reference
- Blue Color on Buttons is 0x1023ED