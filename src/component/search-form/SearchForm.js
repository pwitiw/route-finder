import React from "react";
import {LabelWithInput} from "src/component/common/label-with-text/LabelWithInput";
import {Button, ButtonType} from "src/component/common/button/Button";
import {List} from "src/component/common/list/List";
import {i18n} from "src/utils/i18n";
import "src/component/search-form/SearchForm.css";
import {City} from "src/services/algorithm/City";
import {AddressUtils} from "src/services/AddressUtils";

export class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newCity: "",
            startingPos: "Twardogóra",
            cities: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddLocation = this.handleAddLocation.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleStartingPosChange = this.handleStartingPosChange.bind(this);
    }

    render() {
        const cities = this.state.cities.map(city => city.name);
        const addBtnDisabled = this.state.newCity.length === 0;
        return (
            <div className="SearchForm">
                <LabelWithInput label={i18n.cityForm.startingPoing}
                                value={this.state.startingPos}
                                onChange={this.handleStartingPosChange}/>
                <form className="Form" onSubmit={this.handleAddLocation}>
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
            const searchBtnDisabled = this.state.cities.length < 3;
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

    handleStartingPosChange(event) {
        this.setState({startingPos: event.target.value});
    }

    handleRemove(indexToRemove) {
        const updatedCities = this.state.cities.filter((city, index) => index !== indexToRemove);
        this.setState({
            cities: updatedCities
        });
    }

    handleAddLocation(event) {
        event.preventDefault();
        const newCity = this.state.newCity.trim();
        const exists = this.state.cities.filter(city => AddressUtils.areEqual(city.name, newCity)).length > 0;
        if (newCity !== "" && !exists) {
            this.setState({
                cities: this.state.cities.concat(new City(newCity))
            });
        }
        this.setState({newCity: ""});
    }

    handleSearch() {
        this.props.onSearch([].concat(new City(this.state.startingPos), this.state.cities));
    }
}