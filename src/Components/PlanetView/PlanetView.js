import React from "react";
import {connect} from "react-redux"
import Axios from "axios";
import "./PlanetView.scss"
import {getPlanetThunk} from "../../redux/actions/planetActions"
function PlanetView(props) {
    
    function removeBuilding(unique_id){
        console.log(unique_id)
        Axios.delete(`/api/building/${unique_id}`)
        .then(res =>{
            props.getPlanetThunk(props.reducer.user.user_id);
        })
        .catch(err => alert(err))
    }

    return(
        <div className="building" >
            <span>{props.planetReducer.buildingDict[props.building.building_id].name}</span>
            {props.building.building_id != 1 ? <button onClick={() => removeBuilding(props.building.unique_id)} >Deconstruct</button> : ""}
        </div>
    )
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getPlanetThunk})(PlanetView)