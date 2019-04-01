import {Population} from "./Population";

const MAX_GENERATIONS = 1000;
const POPULATION = 50;
const CROSSOVER_PROBABILITY = 0.7;
const MUTATION_PROBABILITY = 0.1;

export class GeneticAlgorithm {

    constructor(cities) {
        this.cities = cities ? cities : [];
    }

    run() {
        if (this.cities.length < 4) {
            return this.cities;
        }
        let population = new Population(POPULATION, this.cities, CROSSOVER_PROBABILITY, MUTATION_PROBABILITY);
        let bestScore = population.getFittest();
        console.log(bestScore);
        for (let generation = 0; generation < MAX_GENERATIONS; generation++) {
            population.nextGeneration();
            bestScore = this.getBestScore(bestScore, population.getFittest());
        }
        bestScore = bestScore.reorder(this.cities[0]);
        bestScore = bestScore.optimize();
        return bestScore.dna;
    }

    getBestScore(bestScore, fittest) {
        return bestScore.getFitness() < fittest.getFitness() ? fittest : bestScore;
    }
}