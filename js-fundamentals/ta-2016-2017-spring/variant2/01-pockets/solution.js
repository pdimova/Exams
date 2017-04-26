function solve(args) {
    'use strict';

    let heights = args[0].split(' ').map(Number);
    let peaks = [];
    let pocket = 0;

    for (let i = 1; i < heights.length - 1; i += 1) {
        if (isPeak(heights[i], heights[i - 1], heights[i + 1])) {
            peaks[i] = 'peak';
        }
    }

    for (let j = 1; j < heights.length - 1; j += 1) {
        if (isValley(heights[j], heights[j - 1], heights[j + 1])) {
            if (areNeighboursPeaks(j, peaks)) {
                pocket += heights[j];
            }
        }
    }
    //console.log(peaks);
    //console.log(heights);
    console.log(pocket);

    function isPeak(currElement, left, right) {
        return currElement > left && currElement > right;
    }

    function isValley(currElement, left, right) {
        return currElement <= left && currElement <= right;
    }

    function areNeighboursPeaks(index, peaks) {
        return peaks[index - 1] === 'peak' && peaks[index + 1] === 'peak';
    }

}
solve(
    ["53 20 1 30 2 40 3 10 1"]
);
solve([
    "53 20 1 30 30 2 40 3 10 1"
])
solve(
    ["53 20 1 30 2 40 3 3 10 1"]
);