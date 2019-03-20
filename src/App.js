import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {cities, startingPos} from './testData';
import {GeneticAlgorithm} from "./services/GeneticAlgorithm";

class App extends Component {
    render() {
        const result = new GeneticAlgorithm(startingPos, cities).run();
        return (
            <div className="App">
                {result.result}
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
