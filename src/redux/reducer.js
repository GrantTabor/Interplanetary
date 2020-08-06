//import {getUser, getUserThunk, resetUser} from "./actions/userActions"
import Axios from "axios"
import {getPlanetThunk} from "./actions/planetActions"
const initialState = {
    userId: "",
    user: {},
   userEnergy: 0,
   userMinerals: 0
}

const GET_USER = 'GET_USER';
const RESET_USER = "RESET_USER";
const CHANGE_ENERGY = "CHANGE_ENERGY";
const CHANGE_MINERALS = "CHANGE_MINERALS"
/*
export function myThunkFunc(id, myObject) {
    return function thisIsTheActualFunc(dispatch) {
        return Axios.get('').then(result => {
            dispatch(action(result))
        })
    }
}*/
export function getUserThunk(username, password) {
  
    return function(dispatch) {
      
        return Axios.post(`/auth/login`, {username, password})
        .then(res =>{

            dispatch(getUser(res.data))
            dispatch(getPlanetThunk(res.data.user_id))
            console.log(res.data.energy)
            console.log(res.data.minerals)
            dispatch(changeEnergy(res.data.energy))
            dispatch(changeMinerals(res.data.minerals))
            //dispatch(getPlanet(initialState.user.user_id))
        })
        
        .catch(err => {
            alert(`Username or password incorrect`)

        })
    }
}

export function registerUserThunk(username, password, email){
    return function register(dispatch){
        return Axios.post(`/auth/register`, {username, password, email})
        .then(res =>{
            dispatch(getUser(res.data))
            dispatch(getPlanetThunk(res.data.user_id))
            dispatch(changeEnergy(res.data.energy))
            dispatch(changeMinerals(res.data.minerals))
        })
        .catch(err => alert(`Username Already Taken`))
    }
}

export function getUser(user){
    return{
        type: GET_USER,
        payload: user
    }
}

export function changeEnergy(energy){
    return{
        type: CHANGE_ENERGY,
        payload: energy
    }
}
export function changeMinerals(minerals){
    return{
        type: CHANGE_MINERALS,
        payload: minerals
    }
}

export function resetUser(){
    return{
        type: RESET_USER,
        payload: ""
    }
}


export default function reducer(state = initialState, action){
    const {type, payload} = action;
    console.log(type)
    switch(type){
        case GET_USER:
            return {...state, user: payload}
        case RESET_USER:
            return {...state, userId: "", user: {}}
        case CHANGE_ENERGY:
            console.log(payload)
            return{...state, userEnergy: payload}
        case CHANGE_MINERALS:
            return{...state, userMinerals: payload}
        default:
            return state;
    }
}