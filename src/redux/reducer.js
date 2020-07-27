const initialState = {
    userId: "",
    user: {}
}

const GET_USER = 'GET_USER';
const GET_USER_ID = "GET_USER_ID";
const RESET_USER = "RESET_USER"
export function getUser(user){
    return{
        type: GET_USER,
        payload: user
    }
}
export function getUserId(userId){
    return{
        type: GET_USER_ID,
        payload: userId
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
        case GET_USER_ID:
            return {...state, userId: payload}
        case RESET_USER:
            return {...state, userId: "", user: {}}
        default:
            return state;
    }
}