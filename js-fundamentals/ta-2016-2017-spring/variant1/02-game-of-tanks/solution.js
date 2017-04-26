function solve(args) {
    // Get input
    const move = 'mv';

    let R, C;
    gameFieldSize = args.splice(0, 1)[0].split(' ');
    [R, C] = gameFieldSize.map(Number);

    let debris = args.splice(0, 1)[0].split(';');
    // Debris coordinates are repeating in the input
    debris = debris.filter(function (value, index) {
        return debris.indexOf(value) == index;
    });

    let commandsCount = +args.slice(0, 1),
        commands = args.slice(1);

    const tanks = {
        '0': { r: 0, c: 0 },
        '1': { r: 0, c: 1 },
        '2': { r: 0, c: 2 },
        '3': { r: 0, c: 3 },
        '4': { r: R - 1, c: C - 1 },
        '5': { r: R - 1, c: C - 2 },
        '6': { r: R - 1, c: C - 3 },
        '7': { r: R - 1, c: C - 4 },
    };

    const delta = {
        u: { r: -1, c: 0 },
        r: { r: 0, c: 1 },
        d: { r: 1, c: 0 },
        l: { r: 0, c: -1 },
    }

    let player1 = 4, player2 = 4;

    for (let i = 0; i < commandsCount; i++) {
        let command = commands[i].split(' ');

        let commandType = command[0];
        let tankId = command[1];
        let direction;

        if (commandType === move) {
            let moves = +command[2];
            direction = command[3];

            moveTank(tankId, moves, direction);
        } else { // shoot
            direction = command[2];

            tankShoot(tankId, direction);

            // isGameover
            if (player1 === 0 || player2 === 0) {
                if (player1 === 0) {
                    console.log('Koceto is gg');
                } else {
                    console.log('Cuki is gg');
                }
                break;
            }
        }
    }

    function moveTank(id, moves, dir) {
        // If tank encounters debris, a field border or another tank in the direction it's moving, it stops moving.
        // Expected tank coordinates to chnage
        let tank = tanks[id];

        let canMove = true;
        let nextR, nextC;

        while (canMove && moves > 0) {
            //[nextR, nextC] = [tank.r + delta[dir].r, tank.c + delta[dir].c];
            nextR = tank.r + delta[dir].r;
            nextC = tank.c + delta[dir].c;

            //debris check
            if (isCrashingInDerbis(nextR, nextC)) {
                canMove = !canMove;
                break;
            }

            //fieldBored check
            if (isOutsideTheField(nextR, nextC)) {
                canMove = !canMove;
                break;
            }

            //another tank check
            for (let id in tanks) {
                if (isRunningOverTank(nextR, nextC, id)) {
                    canMove = !canMove;
                    break;
                }
            }

            if (canMove) {
                tank.r = nextR;
                tank.c = nextC;
                moves--;
            }
        }
    }

    function tankShoot(id, dir) {
        let tank = tanks[id];

        let shootCoordinates = { r: tank.r, c: tank.c };
        let shootContinue = true;

        let nextR, nextC;
        while (shootContinue) {
            //[nextR, nextC] = [shootCoordinates.r + delta[dir].r, shootCoordinates.c + delta[dir].c];
            nextR = shootCoordinates.r + delta[dir].r;
            nextC = shootCoordinates.c + delta[dir].c;

            //debris check
            if (isCrashingInDerbis(nextR, nextC)) {
                // destroy debris
                delete debris[debris.indexOf(`${nextR} ${nextC}`)];
                shootContinue = !shootContinue;
                break;
            }

            //fieldBored check
            if (isOutsideTheField(nextR, nextC)) {
                shootContinue = !shootContinue;
                break;
            }

            //another tank check
            for (let id in tanks) {
                if (isRunningOverTank(nextR, nextC, id)) {
                    console.log(`Tank ${id} is gg`);
                    delete tanks[id];
                    +id <= 3 ? player1-- : player2--;
                    shootContinue = !shootContinue;
                    break;
                }
            }

            if (shootContinue) {
                shootCoordinates.r = nextR;
                shootCoordinates.c = nextC;
            }
        }
    }

    function isCrashingInDerbis(r, c) {
        return debris.indexOf(`${r} ${c}`) !== -1;
    }

    function isOutsideTheField(r, c) {
        return r < 0 || r >= R || c < 0 || c >= C;
    }

    function isRunningOverTank(r, c, id) {
        return r === tanks[id].r && c === tanks[id].c;
    }
}

let input = [
    '15 6',
    '13 0;9 5;7 5;8 4;2 4;3 2;1 4;9 2;1 0;2 4;9 5;4 5;1 5;4 4;8 4;11 0;11 2;3 5;3 2;13 0;11 5;3 5;12 2;7 0;6 3;12 5;6 1;1 0;11 4;13 3;8 4;2 1;13 0;9 4;8 4;3 3;3 0;13 4;10 1;13 4;6 1;5 5;13 5;9 3;5 0;2 2;7 2;6 0;10 5;1 4',
    '37',
    'mv 7 1 l',
    'mv 7 3 u',
    'mv 1 1 d',
    'mv 0 1 r',
    'mv 1 2 r',
    'mv 1 1 d',
    'x 1 d',
    'mv 1 3 d',
    'x 7 u',
    'mv 7 3 u',
    'x 1 d',
    'mv 1 3 d',
    'mv 7 1 u',
    'x 1 l',
    'x 1 d',
    'x 6 u',
    'x 6 u',
    'x 6 u',
    'mv 2 1 r',
    'mv 2 5 d',
    'mv 2 1 r',
    'x 2 d',
    'x 2 d',
    'x 2 d',
    'x 5 u',
    'x 5 u',
    'mv 5 9 u',
    'mv 5 1 l',
    'mv 0 2 r',
    'x 0 d',
    'mv 6 1 r',
    'x 0 d',
    'mv 0 6 d',
    'x 7 r',
    'mv 0 1 d',
    'x 0 r',
    'x 7 r',
];

solve(input);