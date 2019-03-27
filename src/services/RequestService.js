class RequestService {

    get(url) {
        return window.fetch(url);
    }
}

export const requestService = new RequestService();