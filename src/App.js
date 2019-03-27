import React from 'react';
import 'src/App.css';
import {SearchForm} from "src/component/search-form/SearchForm";
import {LoadingBanner} from "src/component/common/loading-banner/LoadingBanner";
import {MapView} from "src/component/map-view/MapView";
import {GoogleApi} from "src/services/GoogleApi";
import {cities} from "src/testData";

class App extends React.Component {

    //TODO Spis kolejnosci miast
    // TODO mapa tak samo duza jak lewa
    // TODO ogranicz za dluga nazwe
    //TODO wydrukuj?

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            done: true,
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    render() {
        return <div className="App">
            <div className="Search">
                <SearchForm onSearch={this.handleSearch}/>
            </div>
            {this.getMapPlaceholder()}
        </div>
    }

    getMapPlaceholder() {
        let content;
        if (this.state.loading) {
            content = <LoadingBanner/>;
        } else if (this.state.done) {
            content = <MapView cities={cities}/>;
        }

        return <div className="MapPlaceholder">{content}</div>
    }

    async handleSearch(cities) {
        // this.setState({loading: true});
        this.setState({loading: false, done: true});
        const result = await GoogleApi.getDetails(cities);
        console.log(result);
        // return new GeneticAlgorithm(cities).run();

    }
}

export default App;
