import React from 'react';
import 'src/App.css';
import {SearchForm} from "src/component/search-form/SearchForm";
import {LoadingBanner} from "src/component/common/loading-banner/LoadingBanner";
import MyWorker from "./app.worker.js";
import {ResultView} from "src/component/result-view/ResultView";
import {GeneticAlgorithm} from "src/services/algorithm/GeneticAlgorithm";
import GoogleApi from "src/services/GoogleApi";

// TODO przetestowac cache
// TODO cache - normalizacja polskich znakow: ł - l, ą -a, ż-z.
// TODO wyszukiwania miast przy dodawaniu
// TODO ulice wroclawia przetestowac

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAbort = this.handleAbort.bind(this);
        this.handleRepeat = this.handleRepeat.bind(this);
    }

    render() {
        const mapContent = this.getResultContent();
        return (
            <div className="App">
                <SearchForm onSearch={this.handleSearch} processing={this.state.processing} onAbort={this.handleAbort}/>
                {mapContent}
            </div>
        );
    }

    getResultContent() {
        let content;
        if (this.state.processing) {
            content = <LoadingBanner/>;
        } else if (this.state.done) {
            content = <ResultView cities={this.state.cities} onRepeat={this.handleRepeat}/>;
        }
        return content
    }

    handleRepeat() {
        this.handleSearch(this.state.cities);
    }

    async handleSearch(addresses) {
        this.setState({processing: true});
        const cities = await GoogleApi.getDetails(addresses);
        this.webWorker = new MyWorker();
        this.webWorker.postMessage(cities);
        this.webWorker.onmessage = (event => {
            this.setState({cities: event.data, done: true, processing: false});
            this.webWorker.terminate();
        });
        this.webWorker.onerror = (error) => {
            console.info(error);
            this.setState({processing: false});
            this.webWorker.terminate();
        };
    }

    handleAbort() {
        this.webWorker && this.webWorker.terminate();
        this.setState({processing: false, done: false})
    }
}

export default App;
