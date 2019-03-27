import React from 'react';
import 'src/App.css';
import {SearchForm} from "src/component/search-form/SearchForm";
import {LoadingBanner} from "src/component/common/loading-banner/LoadingBanner";
import {MapView} from "src/component/map-view/MapView";
import {GoogleApi} from "src/services/GoogleApi";
import {GeneticAlgorithm} from "src/services/algorithm/GeneticAlgorithm";
import {cities} from "src/testData";
import worker from './app.worker.js';
import WebWorker from "src/WebWorker";


class App extends React.Component {

    //TODO lista z kolejnoscia miast
    //TODO wydrukuj?


    constructor(props) {
        super(props);
        this.state = {
            cities: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.webworker = this.webworker.bind(this);
    }

    render() {
        const mapContent = this.getMapContent();
        return (
            <div className="App">
                <div className="Form">
                    <SearchForm onSearch={this.webworker}/>
                </div>
                <div className="MapPlaceholder">
                    {mapContent}
                </div>
            </div>
        );
    }

    getMapContent() {
        let content;
        if (this.state.loading) {
            content = <LoadingBanner/>;
        } else if (this.state.done) {
            content = <MapView cities={this.state.cities}/>;
        }
        return content;
    }

    async handleSearch(addresses) {
        this.setState({loading: true});
        const cities = await GoogleApi.getDetails(addresses);
        const result = new GeneticAlgorithm(cities).run();
        this.setState({cities: result, done: true, loading: false});
    }

    async webworker(addresses) {
        this.setState({loading: true});
        const webWorker = new WebWorker(worker);
        webWorker.postMessage(() => new GeneticAlgorithm(cities).run());
        webWorker.onmessage = (event => {
            this.setState({cities: event.data, done: true, loading: false});
        });
        webWorker.onerror = (error) => {
            console.log("BLĄD");
            console.info(error);
            this.setState({loading: false});
        };
    }
}

export default App;
