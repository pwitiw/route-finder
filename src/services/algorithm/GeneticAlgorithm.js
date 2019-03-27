import {Population} from "./Population";

const MAX_GENERATIONS = 1;
const POPULATION = 100;
const CROSSOVER_PROBABILITY = 0.4;
const MUTATION_PROBABILITY = 0.1;

export class GeneticAlgorithm {

    constructor(cities) {
        this.cities = cities;
    }

    run() {
        let population = new Population(POPULATION, this.cities, CROSSOVER_PROBABILITY, MUTATION_PROBABILITY);
        let bestScore = population.getFittest();
        for (let generation = 0; generation < MAX_GENERATIONS; generation++) {
            population.nextGeneration();
            bestScore = this.getBestScore(bestScore, population.getFittest());
        }

        bestScore.print();
        bestScore = bestScore.reorder(this.cities[0]);
        bestScore.print();
        return bestScore
    }

    getBestScore(bestScore, fittest) {
        if (bestScore.getFitness() < fittest.getFitness()) {
            fittest.print();
        }
        return bestScore.getFitness() < fittest.getFitness() ? fittest : bestScore;
    }
}