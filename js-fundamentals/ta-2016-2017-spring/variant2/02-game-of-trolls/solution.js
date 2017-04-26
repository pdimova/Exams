// Easy reference: 
// Lsjtujzbo is dangerous - she can lay traps. If a troll steps on a trap, it cannot move out of it, unless another troll comes to help him.
// If for an example Nbslbub falls in a trap, then he cannot move(even if there is such command) until Wboup stands in the same cell as well.
// When Nbslbub is rescued from the trap, the trap is destroyed and he can move freely again.
// The goal of the princess is to escape the field from the bottom right corner (R - 1, C - 1) or to capture both Wboup and Nbslbub in a trap.
// The goal of the trolls in to catch the princess - the princess is considered caught by the trolls if either Wboup or Nbslbub are standing in the same cell as the princess or in a neighboring cell.

function solve(args) {
    'use strict';

    const rows = +args[0].split(' ')[0],
        cols = +args[0].split(' ')[1];

    let initialPositions = args[1].split(';');

    let wboup = {
        r: +initialPositions[0].split(' ')[0],
        c: +initialPositions[0].split(' ')[1],
    },

        nbslbub = {
            r: +initialPositions[1].split(' ')[0],
            c: +initialPositions[1].split(' ')[1],
        },

        lsjtujzbo = {
            r: +initialPositions[2].split(' ')[0],
            c: +initialPositions[2].split(' ')[1],
        };

    let commands = args.slice(2);
    let field = [];

    function movePlayer(player, dir) {
        //The units cannot move out of the field. If a command will take a unit out of the field, don't execute it.
        let deltaR = 0, deltaC = 0;
        switch (dir) {
            case 'u': deltaR = -1; break;
            case 'd': deltaR = 1; break;
            case 'l': deltaC = -1; break;
            case 'r': deltaC = 1; break;
            default:
                break;
        }

        if (!(player.r + deltaR < 0 || player.r + deltaR >= rows || player.c + deltaC < 0 || player.c + deltaC >= cols)) {
            player.r += deltaR;
            player.c += deltaC;
        }
    }

    function isTrollTrapped(troll) {
        return field[troll.r + ' ' + troll.c] === 'T';
    }

    function rescueTroll(troll) {
        field[troll.r + ' ' + troll.c] = '';
        //console.log(`Troll ${troll} untrapped!`);
    }

    function isPrincessCought() {
        //return troll.r === princess.r && troll.c === princess.c;
        if ((wboup.r - lsjtujzbo.r === -1 || wboup.r - lsjtujzbo.r === 0 || wboup.r - lsjtujzbo.r === 1) &&
            (wboup.c - lsjtujzbo.c === -1 || wboup.c - lsjtujzbo.c === 0 || wboup.c - lsjtujzbo.c === 1)) {
            return true;

        } else if ((nbslbub.r - lsjtujzbo.r === -1 || nbslbub.r - lsjtujzbo.r === 0 || nbslbub.r - lsjtujzbo.r === 1) &&
            (nbslbub.c - lsjtujzbo.c === -1 || nbslbub.c - lsjtujzbo.c === 0 || nbslbub.c - lsjtujzbo.c === 1)) {
            return true;
        }
        else {
            return false;
        }

    }

    function isPrincessSaved() {
        //if the princess escapes or both trolls fall into a trap
        if ((lsjtujzbo.r === rows - 1 && lsjtujzbo.c === cols - 1) || (isTrollTrapped(wboup) && isTrollTrapped(nbslbub))) {
            return true;
        }
        return false;
    }

    for (let i = 0; i < commands.length; i++) {
        let currCommand = commands[i].split(' ');

        //type of command
        if (currCommand[0] === 'mv') {

            //move the players
            if (currCommand[1] === 'Wboup') {

                if (isTrollTrapped(wboup)) {
                    continue;
                }

                movePlayer(wboup, currCommand[2]);

                if (isTrollTrapped(nbslbub) && (wboup.r === nbslbub.r && wboup.c === nbslbub.c)) {
                    rescueTroll(nbslbub);
                }

            } else if (currCommand[1] === 'Nbslbub') {

                if (isTrollTrapped(nbslbub)) {
                    continue;
                }

                movePlayer(nbslbub, currCommand[2]);

                if (isTrollTrapped(wboup) && (wboup.r === nbslbub.r && wboup.c === nbslbub.c)) {
                    rescueTroll(wboup);
                }
            }
            else { //Lsjtujzbo
                movePlayer(lsjtujzbo, currCommand[2]);
            }


            if (isPrincessCought()) {
                console.log(`The trolls caught Lsjtujzbo at ${lsjtujzbo.r} ${lsjtujzbo.c}`);
                break;
            }

            if (isPrincessSaved()) {
                console.log(`Lsjtujzbo is saved! ${wboup.r} ${wboup.c} ${nbslbub.r} ${nbslbub.c}`);
                break;
            }
        }
        else {
            //lay trap
            field[lsjtujzbo.r + ' ' + lsjtujzbo.c] = 'T';
        }
    }
}

// solve([
//     '4 7',
//     '0 1;0 2;1 4',
//     'mv Lsjtujzbo d',
//     'mv Lsjtujzbo l',
//     'mv Lsjtujzbo l',
//     'lay trap',
//     'mv Lsjtujzbo l',
//     'lay trap',
//     'mv Lsjtujzbo d',
//     'mv Lsjtujzbo r',
//     'mv Lsjtujzbo r',
//     'mv Lsjtujzbo r',
//     'mv Lsjtujzbo r',
//     'mv Wboup d',
//     'mv Wboup d',
//     'mv Wboup r',
//     'mv Nbslbub d',
//     'mv Nbslbub d',
//     'mv Nbslbub l',
// ]);

// solve([
//     '4 7',
//     '0 1;0 2;1 4',
//     'mv Lsjtujzbo d',
//     'mv Lsjtujzbo l',
//     'mv Lsjtujzbo l',
//     'lay trap',
//     'mv Lsjtujzbo d',
//     'mv Lsjtujzbo r',
//     'mv Lsjtujzbo r',
//     'mv Lsjtujzbo r',
//     'mv Nbslbub d',
//     'mv Nbslbub d',
//     'mv Nbslbub l',
//     'mv Wboup d',
//     'mv Wboup d',
//     'mv Wboup d',
//     'mv Wboup r',
//     'mv Wboup r',
//     'mv Wboup r'
// ]);

// solve([
//     '4 7',
//     '0 1;0 2;1 4',
//     'mv Lsjtujzbo d',
//     'mv Lsjtujzbo l',
//     'mv Lsjtujzbo l',
//     'lay trap',
//     'mv Lsjtujzbo d',
//     'mv Lsjtujzbo r',
//     'mv Lsjtujzbo r',
//     'mv Lsjtujzbo r',
//     'mv Nbslbub d',
//     'mv Nbslbub d',
//     'mv Nbslbub l',
//     'mv Wboup d',
//     'mv Wboup d',
//     'mv Wboup d',
//     'mv Wboup r',
//     'mv Wboup r',
//     'mv Lsjtujzbo r'
// ]);

// solve([
//     '4 7',
//     '0 1;0 2;1 4',
//     'mv Lsjtujzbo d',
//     'mv Lsjtujzbo l',
//     'mv Lsjtujzbo l',
//     'lay trap',
//     'mv Lsjtujzbo d',
//     'mv Lsjtujzbo r',
//     'mv Lsjtujzbo r',
//     'mv Lsjtujzbo r',
//     'mv Nbslbub d',
//     'mv Nbslbub d',
//     'mv Nbslbub l',
//     'mv Wboup d',
//     'mv Wboup d',
//     'mv Wboup r',
//     'mv Wboup d',
//     'mv Nbslbub r',
//     'mv Nbslbub r',
// ]);

// solve([
//     '5 5',
//     '1 1;0 1;2 3',
//     'mv Lsjtujzbo d',
//     'lay trap',
//     'mv Lsjtujzbo d',
//     'mv Wboup r',
//     'mv Wboup r',
//     'mv Nbslbub d',
//     'mv Nbslbub d',
//     'mv Nbslbub d',
//     'mv Nbslbub d',
//     'mv Nbslbub d',
//     'mv Wboup d',
//     'mv Wboup d'
// ]);

// solve([
//     '7 7',
//     '0 1;0 2;3 3',
//     'mv Lsjtujzbo l',
//     'lay trap',
//     'mv Lsjtujzbo r',
//     'lay trap',
//     'mv Lsjtujzbo r',
//     'lay trap',
//     'mv Lsjtujzbo d',
//     'mv Lsjtujzbo r',
//     'mv Lsjtujzbo r',
//     'mv Lsjtujzbo r',
//     'mv Lsjtujzbo r',
//     'mv Wboup d',
//     'mv Wboup d',
//     'mv Wboup l',
//     'mv Wboup l',
//     'mv Nbslbub r',
//     'mv Nbslbub r',
//     'mv Nbslbub r',
//     'mv Nbslbub d',
//     'mv Lsjtujzbo d',
//     'mv Lsjtujzbo l',
//     'mv Lsjtujzbo l',
//     'mv Nbslbub l',
//     'mv Nbslbub d',
//     'mv Nbslbub d',
//     'mv Wboup d',
//     'mv Wboup d',
//     'mv Wboup r',
//     'mv Lsjtujzbo d',
//     'mv Wboup d',
//     'mv Wboup d',
//     'mv Wboup r',
//     'mv Lsjtujzbo r',
//     'mv Lsjtujzbo r'
// ]);

// solve([
//     '8 8',
//     '1 3;0 3;5 5',
//     'mv Lsjtujzbo l',
//     'mv Lsjtujzbo l',
//     'lay trap',
//     'mv Lsjtujzbo r',
//     'lay trap',
//     'mv Lsjtujzbo r',
//     'lay trap',
//     'mv Lsjtujzbo d',
//     'lay trap',
//     'mv Lsjtujzbo d',
//     'lay trap',
//     'mv Wboup r',
//     'mv Wboup r',
//     'mv Wboup d',
//     'mv Wboup d',
//     'mv Wboup d',
//     'mv Wboup d',
//     'mv Nbslbub d',
//     'mv Nbslbub d',
//     'mv Lsjtujzbo l',
//     'mv Nbslbub d',
//     'mv Nbslbub r',
//     'mv Nbslbub r',
//     'mv Nbslbub d',
//     'mv Nbslbub d',
//     'mv Nbslbub d'
// ]);

solve([
    '20 20',
'3 0;0 3;10 10',
'lay trap',
'mv Lsjtujzbo d',
'mv Lsjtujzbo l',
'lay trap',
'mv Lsjtujzbo r',
'mv Lsjtujzbo r',
'mv Lsjtujzbo r',
'lay trap',
'mv Lsjtujzbo d',
'mv Wboup d',
'mv Wboup d',
'mv Wboup r',
'mv Wboup r',
'mv Nbslbub r',
'mv Nbslbub r',
'mv Nbslbub r',
'mv Nbslbub d',
'mv Nbslbub d',
'mv Nbslbub d',
'mv Lsjtujzbo d',
'mv Lsjtujzbo d',
'lay trap',
'mv Lsjtujzbo r',
'mv Lsjtujzbo r',
'mv Lsjtujzbo r',
'lay trap',
'mv Wboup d',
'mv Wboup d',
'mv Wboup d',
'mv Wboup r',
'mv Wboup r',
'mv Wboup r',
'mv Nbslbub r',
'mv Nbslbub r',
'mv Nbslbub r',
'mv Nbslbub r',
'mv Lsjtujzbo d',
'lay trap',
'mv Lsjtujzbo l',
'lay trap',
'mv Lsjtujzbo d',
'mv Lsjtujzbo l',
'mv Lsjtujzbo l',
'lay trap',
'mv Lsjtujzbo d',
'mv Lsjtujzbo d',
'lay trap',
'mv Lsjtujzbo r',
'mv Lsjtujzbo r',
'lay trap',
'mv Wboup d',
'mv Wboup d',
'mv Wboup r',
'mv Wboup r',
'mv Nbslbub d',
'mv Nbslbub d',
'mv Nbslbub r',
'mv Nbslbub r',
'mv Wboup d',
'mv Wboup d',
'mv Wboup r',
'mv Lsjtujzbo r',
'mv Lsjtujzbo r',
'lay trap',
'mv Lsjtujzbo u',
'mv Lsjtujzbo u',
'lay trap',
'mv Lsjtujzbo r',
'mv Lsjtujzbo d',
'mv Nbslbub d',
'mv Nbslbub d',
'mv Nbslbub d',
'mv Nbslbub d',
'mv Nbslbub d',
'mv Nbslbub d',
'mv Wboup r',
'mv Wboup r',
'mv Wboup r',
'mv Wboup r',
'mv Wboup u',
'mv Nbslbub d',
'mv Nbslbub d',
'mv Nbslbub d',
'mv Wboup d',
'mv Wboup r',
'mv Wboup r',
'mv Wboup r',
'mv Wboup r',
'mv Wboup d',
'mv Wboup d',
'mv Wboup d',
'mv Wboup r',
'mv Wboup d'
]);