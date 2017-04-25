function solve(args) {
    'use strict';

    let mazeSize = args.splice(0, 1)[0].split(' '),
        R = +mazeSize[0],
        C = +mazeSize[1];

    let maze = createMaze(args);

    let currentPosition = { r: Math.ceil(R / 2) - 1, c: Math.ceil(C / 2) - 1 },
        currentCell;

    let delta = {
        3: [-1, 0], //UP
        2: [0, 1],  //RIGTH
        1: [1, 0],  //DOWN
        0: [0, -1], //LEFT

    };

    let gameover = false;
    while (!gameover) {

        // Get current cell
        currentCell = +maze[currentPosition.r][currentPosition.c];

        // Mark visited
        maze[currentPosition.r][currentPosition.c] = true;

        // Transform to binary
        let directions = getBinary(currentCell);


        for (let i = directions.length - 1; 0 <= i; i--) {
            let direction = +directions[i];

            if (direction) {
                let nextPosition = {};
                nextPosition.r = currentPosition.r + delta[i][0];
                nextPosition.c = currentPosition.c + delta[i][1];

                if (isOutside(nextPosition)) {
                    console.log(`No rakiya, only JavaScript ${currentPosition.r} ${currentPosition.c}`);
                    gameover = true;
                    break;
                }

                if (!isVisited(nextPosition)) {
                    currentPosition.r = nextPosition.r;
                    currentPosition.c = nextPosition.c;
                    break;
                }
            }

            if (i === 0) {
                console.log(`No JavaScript, only rakiya ${currentPosition.r} ${currentPosition.c}`);
                gameover = true;
                break;
            }
        }

    }

    function isVisited(position) {
        return maze[position.r][position.c] === true;
    }

    function isOutside(position) {
        return (position.r < 0 || position.r >= R) || (position.c < 0 || position.c >= C);
    }

    function createMaze(mazeAsString) {
        let maze = [];

        mazeAsString.map(function (row) {
            let cols = row.split(' ');
            maze.push(cols);
        });

        return maze;
    }

    function getBinary(num) {
        let binary = num.toString(2);
        while (binary.length != 4) {
            binary = '0' + binary;
        }
        return binary;
    };

}

let test1 = [
    '5 7',
    '9 5 3 11 9 5 3',
    '10 11 10 12 4 3 10',
    '10 10 12 7 13 6 10',
    '12 4 3 9 5 5 2',
    '13 5 4 6 13 5 6'
];

solve(test1);

let test2 = [
    '7 5',
    '9 3 11 9 3',
    '10 12 4 6 10',
    '12 3 13 1 6',
    '9 6 11 12 3',
    '10 9 6 13 6',
    '10 12 5 5 3',
    '12 5 5 5 6'
];
solve(test2);

