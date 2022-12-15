# picross

Progress So Far
- board creation (with eventual customisable board sizes)
- player board to obscure solution from player
- clue generation (the numbers on typically atop the picross board) 
- [11/16] implemented very basic player input/output
- [12/12] have changed to a web version, using javascript and phaser library. Created visual assets for board. reimplemented clue generation and board creation


To Do
- beautify the board, will need to establish visual way to assign clues to col/row
- [11/16] want to find a better solution. numpy arrays clash with player intuitive indexing. [12/12] using different language, no longer issue
- make interactive, players need to input guesses [11/16] implement way for players to input a range of guesses that are all either blank/square [12/12] COMPLETED
- decide on the rules 
    - chill mode : no penalty for wrong guesses, doesnt count mistakes [11/16] for now, implementing this mode
    - will also need to algorithmically decide on multiple solutions/make boards with only 1 solution?
- work on UI. clues, assets, etc
- need a create an ending screen / end state. need to create the conditions for ending (i.e. every square is filled in or all squares have been found)
- add buttons/options for refreshing, resetting board, etc.
- change clue color, when completed
