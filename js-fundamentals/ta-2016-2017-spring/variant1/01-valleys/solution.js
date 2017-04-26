function solve(args) {
    let heights = args[0].split(' ').map(Number);

    let maxValleySum = 0,
        valleySum = heights[0];

    for (let i = 1; i < heights.length; i++) {
        let currHeight = heights[i];

        valleySum += currHeight;

        if (isPeak(currHeight, i, heights)) {
            if (valleySum > maxValleySum) {
                maxValleySum = valleySum;
            }
            valleySum = currHeight;
        }
    }

    console.log(maxValleySum);

    function isPeak(currHeight, index, heights) {
        return index === heights.length - 1 ||
            currHeight > heights[index - 1] && currHeight > heights[index + 1];
        //index === 0 ||

    }
}

solve(["5 1 7 4 8"]);
solve(["5 1 7 6 5 6 4 2 3 8"]);
solve(["32 31 80 50 29 89 42 16 82 36 27 28 40 31 55 67 6 26 78 84 44 93 97 20 79 80 69 7 10 13 85 73 88 1 36 35 2 62 48 46 85 86"]); //327