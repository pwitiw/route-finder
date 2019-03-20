export function randForRange(range, exclude) {
    const result = Math.round(Math.random() * range);
    return result !== exclude ? result : randForRange(range, exclude);
}

export function display(ranking, iteration) {
    console.log("iteracja: " + iteration);
    ranking.forEach((row) => console.log("[" + row.path.join(", ") + "  " + 1/ row.fitness + "]"));
}