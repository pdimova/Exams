function solve() {
    let input = arguments[0];

    let pathLength = +input.splice(0, 1),
        path = input.slice(0),
        simplifier = Math.pow(2, 10);

    let result;

    // Start jumping
    for (let jumpPosition = 0; jumpPosition < path.length; jumpPosition++) {

        let currentJump = +path[jumpPosition];

        // Coki the rabbit enters on the first number
        if (jumpPosition == 0) {

            result = currentJump % simplifier;

            if (isEven(currentJump)) {
                jumpPosition++;
            }

            continue;
        }


        // Even or odd
        if (!isEven(currentJump)) {
            result *= currentJump;
        } else {
            result += currentJump;

            jumpPosition++;
        }

        // Simplify result
        result = result % simplifier;

        function isEven(value) {
            return value % 2 == 0;
        }
    }
    console.log(result);
}
// Testing odd jumps
solve(['10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
solve(['9', '9', '9', '9', '9', '9', '9', '9', '9', '9']);

// Testing even jumps
solve(['7', '194', '1012', '650', '259', '133', '500', '680']); //112