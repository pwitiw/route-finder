export default class Individual {

    constructor(dna) {
        this.dna = dna;
    }

    getFitness(startingPos, cities) {
        let distance = this.dna.reduce((total, current, index) => {
            if (index !== 0) {
                const destination = cities[this.dna[index - 1]];
                const distance = cities[current].distance(destination);
                total += distance;
                // console.log(cities[current].name + "  ---  " + destination.name + " ==>   " + distance);
            }
            return total;
        }, 0);
        distance += startingPos.distance(cities[this.dna[0]]);
        distance += startingPos.distance(cities[this.dna[this.dna.length - 1]]);
        this.fitness = 1 / Math.pow(distance, 3);
        return this.fitness;
    }

    getDistance(){

    }
    mutate(){

    }
}