import {Population} from "./Population";

// TODO uzaleznic liczbe iteracji od  liczby elementów
// const MAX_GENERATIONS = 900000;
const MAX_GENERATIONS = 9000;
const POPULATION = 300;
const CROSSOVER_PROBABILITY = 0.7;
const MUTATION_PROBABILITY = 0.1;

export class GeneticAlgorithm {

    constructor(cities) {
        this.cities = cities;
    }

    run() {
        const t1 = performance.now();
        let population = new Population(POPULATION, this.cities, CROSSOVER_PROBABILITY, MUTATION_PROBABILITY);
        let bestScore = population.getFittest();
        for (let generation = 0; generation < MAX_GENERATIONS; generation++) {
            population.nextGeneration();
            bestScore = this.getBestScore(bestScore, population.getFittest());
        }
        bestScore = bestScore.reorder(this.cities[0]);
        bestScore.print();

        console.log(performance.now() - t1);
        return bestScore.dna;
    }

    getBestScore(bestScore, fittest) {
        // if (bestScore.getFitness() < fittest.getFitness()) {
        //     fittest.print();
        // }
        return bestScore.getFitness() < fittest.getFitness() ? fittest : bestScore;
    }
}