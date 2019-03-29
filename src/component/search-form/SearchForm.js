import React from "react";
import {LabelWithInput} from "src/component/common/label-with-text/LabelWithInput";
import {Button, ButtonType} from "src/component/common/button/Button";
import {List} from "src/component/common/list/List";
import {i18n} from "src/utils/i18n";
import "src/component/search-form/SearchForm.css";
import {cities} from "src/testData";
import {City} from "src/services/algorithm/City";

export class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newCity: "",
            cities: cities
            // cities: ["wrocław kręta" , "wrocław karmelkowa 5", "wrocław grabiszyńska 255", "siechnice tuwima", "wrocław kmieca 3", "kiełczów", "wrocław zakrzowska", "wrocław tęczowa", "wrocław białych goździków", "szymanów" ]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddLocation = this.handleAddLocation.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    render() {
        const cities = this.state.cities.map(city => city.name);
        const addBtnDisabled = this.state.newCity.length === 0;
        const submit = (e) => {
        };

        return (
            <div className="SearchForm">
                <form className="Form">
                    <LabelWithInput label={i18n.cityForm.address}
                                    value={this.state.newCity}
                                    onChange={this.handleChange}/>
                    <Button value={i18n.add}
                            icon="plus"
                            disabled={addBtnDisabled}
                            onClick={this.handleAddLocation}/>
                </form>
                <List cities={cities}
                      onRemove={this.handleRemove}/>
                {this.createActionButton()}
            </div>
        );
    }

    createActionButton() {
        let button;
        if (!this.props.processing) {
            const searchBtnDisabled = this.state.cities.length === 0;
            button = <Button value={i18n.search}
                             icon="route"
                             disabled={searchBtnDisabled}
                             onClick={this.handleSearch}/>
        } else {
            button = <Button value={i18n.abort}
                             icon="times"
                             type={ButtonType.WARNING}
                             onClick={this.props.onAbort}/>
        }
        return button;
    }

    handleChange(event) {
        this.setState({newCity: event.target.value});
    }

    handleRemove(indexToRemove) {
        const updatedCities = this.state.cities.filter((city, index) => index !== indexToRemove);
        this.setState({
            cities: updatedCities
        });
    }

    handleAddLocation() {
        this.setState({
            newCity: "",
            cities: this.state.cities.concat(new City(this.state.newCity))
        });
    }

    handleSearch() {
        this.props.onSearch(this.state.cities);
    }
}