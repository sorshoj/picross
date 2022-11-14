
import numpy as np




def main():
    #execute game
    # instantiate the board
    np.random.seed(42)
    x = 10
    y = 10
    board = np.random.randint(low=0, high=2, size=(x,y))
    print(board)
    xlist = []

#  do i need to be concerned with preserving order ? with lists?
    
    for i in np.arange(x):
        xcount = []
        a = 0
        curr = False
        for j in np.arange(y):
            if board[i][j] == 1:
                a+= 1
                curr = True
            else:
                if curr == True:
                    xcount.append(a)
                curr = False
                a = 0
        if curr == True:
            xcount.append(a)
        xlist.append(xcount)

        
    print(xlist)











if __name__ == "__main__":
    main()
