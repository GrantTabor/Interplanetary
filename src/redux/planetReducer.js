import reducer from "./reducer";
import {getPlanet, getBuildings} from "./actions/planetActions"

const initialState = {
    planet: {},
    buildingDict: {
        1: {name: "Capital",
            energyGain: 10,
            mineralGain: 10
            },
        2: {name: "Generator",
            energyGain: 20,
            mineralGain: 0
            }
    }
}


const GET_PLANET = "GET_PLANET";
const GET_BUILDINGS = "GET_BUILDINGS";
const RESET_PLANET = "RESET_PLANET";

export function resetPlanets(){
    return{
        type: RESET_PLANET,
        payload: ""
    }
}


export default function planetReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_PLANET: 
            console.log(payload)
            return {...state, planet: payload}
        case GET_BUILDINGS:
            return{...state, buildings: payload}
        case RESET_PLANET:
            return{...state, planet: {}}
        default: 
            return state
    }
}