import {Population} from "./Population";

const MAX_GENERATIONS = 500;
const POPULATION = 50;
const CROSSOVER_PROBABILITY = 0.1;
const MUTATION_PROBABILITY = 0.1;

export class GeneticAlgorithm {

    constructor(cities) {
        this.cities = cities;
    }

    run() {
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