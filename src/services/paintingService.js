function getBorder(cities) {
    let north = cities[0].y;
    let east = cities[0].x;
    let south = cities[0].y;
    let west = cities[0].x;

    for (let city in cities) {
        north = city.y > north ? city.y : north;
        east = city.x > east ? city.x : north;
        south = city.y < south ? city.y : south;
        west = city.x < west ? city.x : west;
    }

    return {north, east, south, west};
}

function przeskaluj() {
    // TODO dopisac to

}