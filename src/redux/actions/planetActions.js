import Axios from "axios";

const GET_PLANET = 'GET_PLANET';
const GET_BUILDINGS = 'GET_BUILDINGS';
const GET_ENEMY_PLANETS = "GET_ENEMY_PLANETS"
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

export function getEnemyPlanetThunk(userId){
    return(dispatch) =>{
        return Axios.get(`/api/attackingplanets/${userId}`)
        .then(res => {
            dispatch(getEnemyPlanets(res.data))
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

export function getEnemyPlanets(planets){
    return{
        type: GET_ENEMY_PLANETS,
        payload: planets
    }
}
//getBuildingsThunk(planetId)

export function getBuildings(buildings){
    return{
        type: GET_BUILDINGS,
        payload: buildings
    }
}