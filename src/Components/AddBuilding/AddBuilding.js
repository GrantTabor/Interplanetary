import React from "react";
import {connect} from "react-redux"
import Axios from "axios";
import {getPlanetThunk} from "../../redux/actions/planetActions"
function AddBuilding(props){

    function makeBuilding(building_id, planet_id){
        Axios.post(`/api/building`, {building_id, planet_id})
        .then(res =>{
            props.getPlanetThunk(props.reducer.user.user_id);
            props.toggleAddingBuilding();
        })
        .catch(err => alert(err))
    }

    let buildingList = Object.entries(props.planetReducer.buildingDict).map(building =>{
        return (
            <div>
                <span>{building[1].name}</span>
                <span>{`Energy Output: ${building[1].energyGain}`}</span>
                <span>{`Mineral Output: ${building[1].mineralGain}`}</span>
                {building[1].name === `Capital` ? null : <button onClick={()=>makeBuilding(building[0], props.planetReducer.planet.planet_id)} >Construct</button>}
            </div>
        )
    })

    return(
        <div>{buildingList}</div>
    )
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getPlanetThunk})(AddBuilding);