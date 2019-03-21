export class City {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }

    distance(city) {
        return Math.hypot(this.x - city.x, this.y - city.y);
    }
}