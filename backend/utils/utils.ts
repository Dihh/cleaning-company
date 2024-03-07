export function setCoordinates(body: any) {
    let coordinates
    if (body.coordinates && !isNaN(body.coordinates[0]) && body.coordinates[0] !== null && !isNaN(body.coordinates[1]) && body.coordinates[1] !== null) {
        coordinates = [parseInt(body.coordinates[0]), parseInt(body.coordinates[1])]
    }
    return coordinates
}