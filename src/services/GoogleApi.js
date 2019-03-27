import {requestService} from "src/services/RequestService";
import {City} from "src/services/algorithm/City";

export class GoogleApi {

    static async getDetails(addresses) {
        const promises = addresses.map((address) => this.getAddressDetail(address));
        const result = await Promise.all(promises);
        return result;
    }

    static async getAddressDetail(address) {
        const response = await requestService.get("https://maps.googleapis.com/maps/api/geocode/json?region=pl&key=&address=" + address);
        const body = await response.json();
        const {lat, lng} = body.results[0].geometry.location;
        const name = body.results[0].formatted_address;
        // console.log(body.results[0].address_components[0].long_name + "," + lat + "," + lng);
        return new City(name, lat, lng);
    }

//

}