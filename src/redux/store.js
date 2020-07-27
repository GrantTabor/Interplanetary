import {createStore, combineReducers} from "redux";
import reducer from "./reducer";
import planetReducer from "./planetReducer"

const rootReducer = combineReducers({
    reducer, 
    planetReducer
})
export default createStore(rootReducer)
