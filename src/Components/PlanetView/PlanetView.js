import React from "react";
import {connect} from "react-redux"
function PlanetView(props) {
    
    return(
        <div>
            {props.planetReducer.buildingDict[props.building.building_id].name}
        </div>
    )
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(PlanetView)