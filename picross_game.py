
import numpy as np
# likely will not use numpy for the player board as it 
# will hold other data? OR could just represent ex. ? == 3 

# TODO for players will need to convert from 0 indexed arrays to 1 indexed
# TODO coordinates are also flipped from numpy representation to 2d graph

# TODO eventually want to have save states
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

    def update_guess(self, coordinates, guess):
        # guess will be a 0 (blank) or 1 (square)

        # TODO allow coordinates to be a list of points
        self.player_board[coordinates[1]][coordinates[0]] = guess

        # update visual in picross output
        with open("picross_output.txt", "w") as a:
            a.write(np.array2string(self.player_board))
            a.write('\n')
            a.write(str(self.xclues))
            a.write('\n')
            a.write(str(self.yclues))
            a.close()




# want multiple modes and settings

def main():
    board = Board(10, 10)

    with open("picross_output.txt", "w") as a:

        a.write(np.array2string(board.player_board))
        a.write('\n')
        a.write(str(board.xclues))
        a.write('\n')
        a.write(str(board.yclues))
        a.close()

    a = True
    while a:
        text = input("enter x, y: ")
        # TODO do some input checking/cleaning (lowercase)

        # exit statement
        if text == "exit":
            a = False

        # creating the actual gameplay loop
        
        # TODO want input to include multiple coordinates at once
        # turn input into coordinates
        coordinate = text.partition(",")
        if coordinate[0].isnumeric() and coordinate[2].isnumeric():
            coordinate = [int(coordinate[0]), int(coordinate[2])]
            
            # check the coordinate is possible FLIPPED, ZERO INDEX
            if coordinate[0] < board.y and coordinate[1] < board.x and coordinate[0] >= 0 and coordinate[1] >= 0:
                print("You entered: {}, {}".format(coordinate[0], coordinate[1]))
                board.update_guess(coordinate, 1)
            else:
                print("Impossible coordinates")



if __name__ == "__main__":
    main()
