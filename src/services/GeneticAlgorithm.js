import partialMappedCrossover from "./partialMappedCrossover";
import {randForRange, display} from "./utils"
import Individual from "./Individual";

// TODO poczatkowa populacja moze byc wybierana naiwnie
// TODO wybieramy czesc populacji zeby stworzyc nowa generacje
// TODO reparation method - do ulepszenia powstalego wyniku

const ITERATIONS = 100;
const POPULATION = 50;
const GENERATION = 40;
const MUTATION_FACTOR = 0.1;
let inkrementator = 0;

export class GeneticAlgorithm {

    constructor(startingPos, cities) {
        this.startingPos = startingPos;
        this.cities = cities;
    }

    run() {
        let bestResult;
        let population = this.populate(this.cities.length);
        bestResult = this.rank(population, bestResult);
        const generation = population.slice(0, GENERATION);
        for (var i = 0; i < ITERATIONS; i++) {

            const {parent1Id, parent2Id} = this.selection(generation.slice(0, 15));
            this.crossover(population, parent1Id, parent2Id);
            bestResult = this.rank(generation, bestResult);
            // display(generation, i);
        }
        const result = this.toCitySequence(bestResult);
        console.log(result.map((city) => city.name).join(", "));
        return result;
    }

    rank(population, actual) {
        population.forEach((sequence) => sequence.getFitness(this.startingPos, this.cities));
        population.sort((seq1, seq2) => seq2.fitness - seq1.fitness);
        if (!actual || actual.fitness < population[0].fitness) {
            console.log(++inkrementator);
        }
        return !actual || actual.result < population[0].result ? population[0] : actual;
    }

    selection(population) {
        const totalFitness = population.reduce((total, sequence) => total += sequence.fitness, 0);
        const probabilities = [];
        let sumOfProbabilities = 0;
        population.forEach((sequence, index) => {
            probabilities[index] = sumOfProbabilities + (sequence.fitness / totalFitness);
            sumOfProbabilities = probabilities[index];
        });
        const parent1Id = this.roulette(probabilities);
        const parent2Id = this.roulette(probabilities);
        // console.log("ID1: " + parent1Id + "  , ID2: " + parent2Id);
        return {parent1Id, parent2Id};
    }

    crossover(population, parent1Id, parent2Id) {
        const childDna = partialMappedCrossover(population, parent1Id, parent2Id);
        const child = new Individual(childDna);
        const parent1Fitness = population[parent1Id].getFitness(this.startingPos, this.cities);
        const parent2Fitness = population[parent2Id].getFitness(this.startingPos, this.cities);
        const childFitness = child.getFitness(this.startingPos, this.cities);
        this.mutate(child);
        if (parent1Fitness < childFitness || parent2Fitness < childFitness) {
            const replacementId = parent1Fitness > parent2Fitness ? parent1Id : parent2Id;
            population[replacementId] = child;
        }
    };

    roulette(probabilities) {
        const nr = Math.random();
        for (let i = 0; i < probabilities.length; i++) {
            if (nr <= probabilities[i]) {
                return i;
            }
        }
        return -1;
    }

    mutate(sequence) {
        const dna = sequence.dna;
        if (Math.random() > MUTATION_FACTOR) {
            return;
        }
        const index1 = randForRange(dna.length - 1);
        const index2 = randForRange(dna.length - 1, index1);
        const start = Math.min(index1, index2);
        const stop = Math.max(index1, index2);
        for (let i = 0; i < Math.max(1, Math.round((stop - start) / 2)); i++) {
            const temp = dna[start + i];
            dna[start + i] = dna[stop - i];
            dna[stop - i] = temp;
        }
    };

    populate(size) {
        const populations = [];
        for (var i = 0; i < POPULATION; i++) {
            const dna = Array.from(Array(size).keys());
            for (var j = 0; j < size; j++) {
                const temp = dna[j];
                const rand = randForRange(size - 1);
                dna[j] = dna[rand];
                dna[rand] = temp;
            }
            populations.push(new Individual(dna));
        }
        return populations;
    }

    toCitySequence(sequence) {
        const result = sequence.dna.map((index) => this.cities[index]);
        return []
            .concat(this.startingPos)
            .concat(result);
    }
}