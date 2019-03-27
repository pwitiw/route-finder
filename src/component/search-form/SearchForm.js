import React from "react";
import {LabelWithInput} from "src/component/common/label-with-text/LabelWithInput";
import {Button} from "src/component/common/button/Button";
import {CityList} from "src/component/search-form/city-list/CityList";
import {i18n} from "src/utils/i18n";
import "src/component/search-form/SearchForm.css";
import {cities} from "src/testData";

export class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newCity: "",
            cities: cities.map(city => city.name)
            // cities: ["wrocław kręta" , "wrocław karmelkowa 5", "wrocław grabiszyńska 255", "siechnice tuwima", "wrocław kmieca 3", "kiełczów", "wrocław zakrzowska", "wrocław tęczowa", "wrocław białych goździków", "szymanów" ]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddLocation = this.handleAddLocation.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    render() {
        const searchBtnDisabled = this.state.cities.length === 0;
        const addBtnDisabled = this.state.newCity.length === 0;
        return (
            <div className="SearchForm">
                <div className="NewCity">
                    <LabelWithInput label={i18n.cityForm.address}
                                    value={this.state.newCity}
                                    onChange={this.handleChange}/>
                    <Button value={i18n.add}
                            icon="plus"
                            disabled={addBtnDisabled}
                            onClick={this.handleAddLocation}/>
                </div>
                <CityList cities={this.state.cities}
                          onRemove={this.handleRemove}/>
                <Button value={i18n.search}
                        icon="route"
                        disabled={searchBtnDisabled}
                        onClick={this.handleSearch}/>
            </div>
        );
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
            cities: this.state.cities.concat(this.state.newCity)
        });
    }

    handleSearch() {
        this.props.onSearch(this.state.cities);
    }
}