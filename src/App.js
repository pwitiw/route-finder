import React, {Component} from 'react';
import logo from 'src/logo.svg';
import 'src/App.css';
import {cities} from 'src/testData';
import {GeneticAlgorithm} from "src/services/algorithm/GeneticAlgorithm";
import {Simulation} from "src/component/simulation/Simulation";

class App extends Component {
    render() {
        new GeneticAlgorithm(cities).run();
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <div>
                    <Simulation/>
                </div>
            </div>
        );
    }
}

export default App;
