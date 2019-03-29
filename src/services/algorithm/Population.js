import Individual from "./Individual";

export class Population {

    constructor(size, seed, pC, pM) {
        const seedCopy = seed.slice(0, seed.length);
        this.currentPop = this.generate(size, seedCopy);
        this.currentFitnesses = this.currentPop.map(individual => individual.getFitness());
        this.probCross = pC;
        this.probMuta = pM;
        this.genNumber = 0;
    }

    generate(size, seed) {
        const startingPop = new Individual(seed);
        const array = Array(size - 1).fill(null).map(() => new Individual(this.shuffle(seed, this.fisherSwap)));
        array.push(startingPop);
        return array;
    };

    nextGeneration() {
        let evolvedPop = [];

        while (evolvedPop.length < this.currentPop.length) {
            evolvedPop = [...evolvedPop, ...this.createChildren()];
        }

        if (evolvedPop.length > this.currentPop.length) evolvedPop.splice(-1, 1);
        this.currentPop = evolvedPop;
        this.currentFitnesses = evolvedPop.map(individual => individual.getFitness());
        this.genNumber++;
        // console.log("GENERACJA: "+ this.genNumber+ "   FITNESS: " +this.currentFitnesses);
        return this;
    };

    createChildren() {
        const mom = this.select();
        const dad = this.select();
        const possiblyCrossed = Math.random() < this.probCross ? this.crossover(mom, dad) : [mom, dad];

        let children = possiblyCrossed
            .map(individual => individual.mutate(this.probMuta))
            .map(individual => individual.optimize());

        return children;
    };

    select() {
        const fitnessArr = this.currentFitnesses;
        const fitnessSum = fitnessArr.reduce((sum, fitness) => sum + fitness, 0);
        let roll = Math.random() * fitnessSum;

        for (let i = 0; i < this.currentPop.length; i++) {
            if (roll < fitnessArr[i]) return this.currentPop[i];
            roll -= fitnessArr[i];
        }
    };

    crossover(mom, dad) {
        let num1 = Math.floor(mom.dna.length * Math.random());
        let num2 = Math.floor(dad.dna.length * Math.random());

        const segmentStart = Math.min(num1, num2);
        const segmentEnd = Math.max(num1, num2);

        const firstOffspring = this.orderedCross(segmentStart, segmentEnd, mom, dad);
        const secOffspring = this.orderedCross(segmentStart, segmentEnd, dad, mom);
        return [new Individual(firstOffspring), new Individual(secOffspring)];
    };

    orderedCross(startInd, endInd, segParent, otherParent) {
        const childDNA = segParent.dna.slice(startInd, endInd);
        const dnaLength = segParent.dna.length;

        for (let index = 0; index < dnaLength; index++) {
            const parentInd = (endInd + index) % dnaLength;
            const parentLoc = otherParent.dna[parentInd];

            if (!childDNA.some(location => this.sameLocation(location, parentLoc))) {
                childDNA.push(parentLoc);
            }
        }
        return this.rotate(childDNA, startInd);
    }

    sameLocation(location1, location2) {
        return location1.x === location2.x && location1.y === location2.y;
    }

    getFittest = function () {
        const fittestIndex = this.currentFitnesses.reduce((fittestInd, currentScore, i, scores) => {
            if (currentScore > scores[fittestInd]) return i;
            return fittestInd;
        }, 0);

        return this.currentPop[fittestIndex];
    };

    rotate(array, index) {
        const offset = array.length - index;
        return [...array.slice(offset), ...array.slice(0, offset)];
    }

    // Fisher-yates shuffle...
    shuffle(array, swapper) {
        let index = array.length;
        while (index !== 0) {
            index -= 1;
            swapper(array, index);
        }
        return array;
    }

    fisherSwap(array, index) {
        const rand = Math.floor(Math.random() * (index + 1));
        const temp = array[index];
        array[index] = array[rand];
        array[rand] = temp;
    }

}