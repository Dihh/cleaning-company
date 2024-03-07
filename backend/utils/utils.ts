export function setCoordinates(body: any){
    let coordinates
    if(body.coordinates && !isNaN(body.coordinates[0]) && !isNaN(body.coordinates[1])){
        coordinates = [parseInt(body.coordinates[0]), parseInt(body.coordinates[1])]
    }
    return coordinates
}