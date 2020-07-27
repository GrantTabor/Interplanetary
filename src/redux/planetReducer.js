import reducer from "./reducer";

const initialState = {
    buildings: [],
    planet: {},
    buildingDict: {
        1: {name: "capital",
            energyGain: 10,
            mineralGain: 10
            }
    }
}

const GET_PLANET = 'GET_PLANET';

export function getPlanet(planet){
    return{
        type: GET_PLANET,
        payload: planet
    }
}

export default function planetReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_PLANET: 
            return {...state, planet: payload}
        default: 
            return state
    }
}