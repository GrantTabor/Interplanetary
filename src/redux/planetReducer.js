import reducer from "./reducer";
import {getPlanet, getBuildings} from "./actions/planetActions"

const initialState = {
    planet: {},
    buildingDict: {
        1: {name: "capital",
            energyGain: 10,
            mineralGain: 10
            }
    }
}

const GET_PLANET = "GET_PLANET";
const GET_BUILDINGS = "GET_BUILDINGS";

export default function planetReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_PLANET: 
            console.log(payload)
            return {...state, planet: payload}
        case GET_BUILDINGS:
            return{...state, buildings: payload}
        default: 
            return state
    }
}