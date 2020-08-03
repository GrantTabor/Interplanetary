//import {getUser, getUserThunk, resetUser} from "./actions/userActions"
import Axios from "axios"
import {getPlanetThunk} from "./actions/planetActions"
const initialState = {
    userId: "",
    user: {},
   
}

const GET_USER = 'GET_USER';
const RESET_USER = "RESET_USER";
const INCREASE_ENERGY = "INCREASE_ENERGY"
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
        })
        .catch(err => alert(`Username Already Taken`))
    }
}

export function getUser(user){
    console.log("getting user")
    return{
        type: GET_USER,
        payload: user
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
            console.log(payload)
            return {...state, user: payload}
        case RESET_USER:
            return {...state, userId: "", user: {}}
        default:
            return state;
    }
}