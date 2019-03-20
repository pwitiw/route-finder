import {randForRange} from "./utils";

export default function partialMappedCrossover(generation, parent1Index, parent2Index) {
    const parent1 = generation[parent1Index].path;
    const parent2 = generation[parent2Index].path;
    let {start, end} = createSwath(parent1.length);
    const swath = parent1.slice(start, end);
    const child = parent2.slice(0, start)
        .concat(swath)
        .concat(parent2.slice(end));
    for (var i = start; i < end; i++) {
        if (swath.indexOf(parent2[i]) < 0) {
            const index = findNonSwathElem(i, parent1, parent2, swath);
            child[index] = parent2[i];
        }
    }
    // console.log("PARENT1: " + parent1 + "  PARENT2:  " + parent2 + "    CHILD      " + child + "   SWATH:   " + swath);
    return child;
}

function findNonSwathElem(index, parent1, parent2, swath) {
    const value = parent1[index];
    const indexOfValue = parent2.indexOf(value);
    return swath.indexOf(value) < 0 ? index : findNonSwathElem(indexOfValue, parent1, parent2, swath);
}

function createSwath(size) {
    const swathIndex1 = randForRange(size - 1);
    const swathIndex2 = randForRange(size - 1, swathIndex1);
    const start = Math.min(swathIndex1, swathIndex2);
    const end = Math.max(swathIndex1, swathIndex2);
    return {start, end};
}