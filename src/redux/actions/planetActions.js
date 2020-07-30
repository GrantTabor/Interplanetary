import Axios from "axios";

const GET_PLANET = 'GET_PLANET';
const GET_BUILDINGS = 'GET_BUILDINGS';

export function getPlanetThunk(userId){
    console.log('getPlanetThunk')
    return (dispatch) => {
        return Axios.get(`/api/planet/${userId}`)
        .then(res => {
            console.log('inside planet');
            console.log(res.data)
            dispatch(getPlanet(res.data))
        })
        .catch(err => alert(err))
    }
}

export function getPlanet(planet){
    return{
        type: GET_PLANET,
        payload: planet
    }
}


//getBuildingsThunk(planetId)

export function getBuildings(buildings){
    return{
        type: GET_BUILDINGS,
        payload: buildings
    }
}