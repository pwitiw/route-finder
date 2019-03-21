import {Population} from "./Population";
import Individual from "src/services/algorithm/Individual";

const MAX_GENERATIONS = 1000;
const POPULATION = 100;
const CROSSOVER_PROBABILITY = 0.4;
const MUTATION_PROBABILITY = 0.1;

// TODO przeskalowac te miasta i zobaczyc jak wyjdzie, bo obecnie za mala roznica


export class GeneticAlgorithm {

    constructor(cities) {
        this.cities = cities;
    }

    run() {
        let bestScore = new Individual(this.cities);
        bestScore.print();
        // let bestScore = population.getFittest();
        let population = new Population(POPULATION, this.cities, CROSSOVER_PROBABILITY, MUTATION_PROBABILITY);
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
            console.log("ZMIENIONO NA: ");
            fittest.print();
        }
        return bestScore.getFitness() < fittest.getFitness() ? fittest : bestScore;
    }
}