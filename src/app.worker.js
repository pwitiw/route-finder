// import {GeneticAlgorithm} from "src/services/algorithm/GeneticAlgorithm";

export default () => {
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        console.log("dzuala");
        const result = e.data();
        postMessage(result);
    });

    self.onmessage = (event)=>{
        importScripts(event.data.content);

    }
    // self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
    //     if (!e) return;
    //     const result = new GeneticAlgorithm(e.data).run();
    //     postMessage(result);
    // })
}