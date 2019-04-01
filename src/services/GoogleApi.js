import {requestService} from "src/services/RequestService";
import {City} from "src/services/algorithm/City";
import {AddressUtils} from "src/services/AddressUtils";

class Cache {
    constructor() {
        this.addresses = [];
    }

    put(address, response) {
        this.addresses[address] = response;
    }

    get(address) {
        return this.addresses[address];
    }
}

export default class GoogleApi {
    static KEY = "";
    static cache = new Cache();

    static async getDetails(addresses) {
        const promises = addresses.map((address) => this.getAddressDetail(address));
        const result = await Promise.all(promises);
        return result.filter(result => result);
    }

    static async getAddressDetail(address) {
        const cityName = address.name;
        let response = this.cache.get(AddressUtils.normalize(cityName));
        if (!response) {
            response = await requestService.get("https://maps.googleapis.com/maps/api/geocode/json?region=pl&key=" + GoogleApi.KEY + "&address=" + cityName);
            response = await response.json();
            this.cache.put(AddressUtils.normalize(cityName), response);
        }
        if (response.results.length === 0) {
            return null;
        }
        const {lat, lng} = response.results[0].geometry.location;
        const name = response.results[0].formatted_address;
        return new City(name, lat, lng);
    }
}
