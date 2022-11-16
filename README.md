# picross

Progress So Far
- board creation (with eventual customisable board sizes)
- player board to obscure solution from player
- clue generation (the numbers on typically atop the picross board) 
- [11/16] implemented very basic player input/output


To Do
- beautify the board, will need to establish visual way to assign clues to col/row
- [11/16] want to find a better solution. numpy arrays clash with player intuitive indexing.
- make interactive, players need to input guesses [11/16] implement way for players to input a range of guesses that are all either blank/square
- decide on the rules 
    - chill mode : no penalty for wrong guesses, doesnt count mistakes
    - will also need to algorithmically decide on multiple solutions/make boards with only 1 solution?

