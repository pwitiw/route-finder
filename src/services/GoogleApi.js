import {requestService} from "src/services/RequestService";

export class GoogleApi {

    static getDetails(addresses) {
        const promises = addresses.map((address) => this.getAddressDetail(address));
        return Promise.all(promises);
    }

    static async getAddressDetail(address) {
        const response = await requestService.get("https://maps.googleapis.com/maps/api/geocode/json?key=&address=" + address);
        const body = await response.json();
        const {lat, lng} = body.results[0].geometry.location;
        const name = body.results[0].address_components[0].long_name;
        return {
            name: name,
            y: lat,
            x: lng
        };
    }
//

}