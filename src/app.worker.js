import {GeneticAlgorithm} from "src/services/algorithm/GeneticAlgorithm";
import {City} from "src/services/algorithm/City";

self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
    if (!e) return;
    const cities = e.data.map(city => new City(city.name, city.x, city.y));
    const start = performance.now();
    const result = new GeneticAlgorithm(cities).run();
    const time = Math.round(performance.now() - start) / 1000;
    console.log("Czas: " + time + " s");
    postMessage(result);
});
