import React from "react";
import {connect} from "react-redux"
import Axios from "axios";
import "./addBuilding.scss";
import {changeEnergy, changeMinerals} from "../../redux/reducer"
import {getPlanetThunk} from "../../redux/actions/planetActions"
function AddBuilding(props){

    function makeBuilding(building_id, planet_id){
        const user_id = props.reducer.user.user_id
        const energyCost = props.planetReducer.buildingDict[building_id].cost[0];
        const mineralCost = props.planetReducer.buildingDict[building_id].cost[1];
        if(props.planetReducer.planet.buildings.length < 20 && props.reducer.userEnergy >= props.planetReducer.buildingDict[building_id].cost[0] && props.reducer.userMinerals >= props.planetReducer.buildingDict[building_id].cost[1]){
            Axios.post(`/api/building`, {building_id, planet_id})
        .then(res =>{
            props.getPlanetThunk(props.reducer.user.user_id);
            
            Axios.put(`/api/decrease`, {user_id, energyCost, mineralCost})
            .then(userRes =>{
                console.log("this is working")
                props.changeEnergy(userRes.data[0].energy);
                props.changeMinerals(userRes.data[0].minerals);
            })
            props.toggleAddingBuilding();
        })
        .catch(err => alert(err))
        }
        else if (props.reducer.userEnergy < energyCost || props.reducer.userMinerals < mineralCost){

            alert("NOT ENOUGH RESOURCES")
        }
        else {
            alert("TOO MANY BUILDINGS")
        }
        
    }

    let buildingList = Object.entries(props.planetReducer.buildingDict).map(building =>{
        return (
            <div className="constructable" >
                <span>{building[1].name}</span>
                <div><span className="energy" >{`Energy Output: ${building[1].energyGain}`}</span></div>
                
                <span className="minerals" >{`Mineral Output: ${building[1].mineralGain}`}</span>
                <div>{building[1].name === `Capital` ? null : <span>Cost: <span className="energy" >{building[1].cost[0]}</span> <span className="minerals" >{building[1].cost[1]}</span></span>}</div>
                
                {building[1].name === `Capital` ? null : <button onClick={()=>makeBuilding(building[0], props.planetReducer.planet.planet_id)} >Construct</button>}
            </div>
        )
    })

    return(
        <div className="add-building" >{buildingList}</div>
    )
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getPlanetThunk, changeEnergy, changeMinerals})(AddBuilding);