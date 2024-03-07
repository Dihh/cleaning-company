export function setCoordinates(body: any){
    let coordinates
    if(body.coordinates && body.coordinates[0] >= 0 && body.coordinates[1] >= 0){
        coordinates = [parseInt(body.coordinates[0]), parseInt(body.coordinates[1])]
    }
    return coordinates
}