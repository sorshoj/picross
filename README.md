# picross

Progress So Far
- board creation (with eventual customisable board sizes)
- player board to obscure solution from player
- clue generation (the numbers on typically atop the picross board) 
- [11/16] implemented very basic player input/output
- [12/12] have changed to a web version, using javascript and phaser library. Created visual assets for board. reimplemented clue generation and board creation
- [12/15] have implemented scenes and created an endscene & trigger
- [12/29] added an information scene w/ rules about the game


To Do
- make it pretty
- add settings to change board size
- add buttons/options for refreshing, resetting board, etc.
- implement autofill - when all the squares in a row/col are found it is auto filled in with gray
- add an optional timer
- add end of game statistics
- decide on the rules 
    - chill mode : no penalty for wrong guesses, doesnt count mistakes [11/16] for now, implementing this mode
    - will also need to algorithmically decide on multiple solutions/make boards with only 1 solution?

ISSUES
- hitting the preload() whenever doing a new game may be reloading all assets into memory + still holding previous arrays, clues, all vars, etc. Could cause memory issues down the line --> not an issue ATM.



COMPLETED
- change clue color, when completed COMPLETED
- need a create an ending screen / end state. need to create the conditions for ending (i.e. every square is filled in or all squares have been found) COMPLETED [12/29]
- [11/16] want to find a better solution. numpy arrays clash with player intuitive indexing. [12/12] using different language, no longer issue
- make interactive, players need to input guesses [11/16] implement way for players to input a range of guesses that are all either blank/square [12/12] COMPLETED

### END CONDITIONS:
all green squares have been found (green, not greyed)
???
accuracy stat?

