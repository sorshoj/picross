
import numpy as np
# likely will not use numpy for the player board as it 
# will hold other data? OR could just represent ex. ? == 3 


class Board:



    def __init__(self, x, y, seed=42):
        self.x = x
        self.y = y
        np.random.seed(seed)
        self.true_board = np.random.randint(low=0, high=2, size=(self.x,self.y))
        self.player_board = np.zeros(shape = (self.x, self.y))
        self.xclues = self.calculate_clue(self.true_board)
        self.yclues = self.calculate_clue(np.swapaxes(self.true_board,0,1))

        # caluculate xclues


    def calculate_clue(self, board):
        clues = []
        for row in board:
            count = 0
            rowcount_list = []
            for col_value in row:
                if (col_value == 1):
                    count += 1
                else:
                    if (count > 0):
                        rowcount_list.append(count)
                    count = 0
            if (count > 0): rowcount_list.append(count)
            clues.append(rowcount_list)
        return clues



# want multiple modes and settings

def main():
    board = Board(10, 10)

    with open("picross_output.txt", "w") as a:

        a.write(np.array2string(board.player_board))
        a.write('\n')
        a.write(str(board.xclues))
        a.write('\n')
        a.write(str(board.yclues))




def main1():
    #execute game
    # instantiate the board
    #np.random.seed(42)
    x = 10
    y = 10
    board = np.random.randint(low=0, high=2, size=(x,y))
    


    
    xclues = []
    yclues = []
    
    i = 0
    j = 0

    while i < x:
        xcount = 0
        xtemplist = []
        while j < y:
            if board[i][j] == 1:
                xcount += 1
            else:
                if xcount > 0:
                    xtemplist.append(xcount)
                xcount = 0


            j += 1
        if xcount > 0: xtemplist.append(xcount)
        xclues.append(xtemplist)
        j = 0
        i += 1

    i = 0
    j = 0

    while i < x:
        ycount = 0
        ytemplist = []
        while j < y:
            if board[j][i] == 1:
                ycount += 1
            else:
                if ycount > 0:
                    ytemplist.append(ycount)
                ycount = 0


            j += 1
        if ycount > 0: ytemplist.append(ycount)
        yclues.append(ytemplist)
        j = 0
        i += 1


    player_board = ["?" for each in np.arange(x*y)].reshape(x,y)
    print(player_board)


    with open("picross_output.txt", "w") as a:

        a.write(np.array2string(board))
        a.write('\n')
        a.write(str(xclues))
        a.write('\n')
        a.write(str(yclues))




    return





if __name__ == "__main__":
    main()
