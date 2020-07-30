import {createStore, combineReducers, applyMiddleware} from "redux";
import reducer from "./reducer";
import planetReducer from "./planetReducer"
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    reducer, 
    planetReducer
})
export default createStore(rootReducer, {}, applyMiddleware(thunk))
