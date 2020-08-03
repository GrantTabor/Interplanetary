import React from "react";
import {connect} from "react-redux";
import Axios from "axios";
import PlanetView from "../PlanetView/PlanetView"
import AddBuilding from "../AddBuilding/AddBuilding"
import {getPlanetThunk} from "../../redux/actions/planetActions"
//import {getPlanet} from "../../redux/planetReducer"
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: this.props.reducer.user.user_name,
            planetName: "",
            addingBuilding: false
        }
        this.toggleAddingBuilding = this.toggleAddingBuilding.bind(this)
    }
    componentDidUpdate(prevProps){
        if (prevProps !== this.props){
            this.setState({username: this.props.reducer.user.user_name})
        }
    }
    toggleAddingBuilding(){
        this.setState({addingBuilding: !this.state.addingBuilding});
    }


    render(){
        const planet = this.props.planetReducer.planet;
        const planetName = planet ? planet.planet_name : '';
        const buildings = planet.buildings;
        let mappedBuildings = "";
        let energy = 0;
        let minerals = 0;
        if (buildings){
            mappedBuildings = buildings.map(building =>{
                energy += this.props.planetReducer.buildingDict[building.building_id].energyGain;
                minerals += this.props.planetReducer.buildingDict[building.building_id].mineralGain;
                return(
                    <div>
                        <PlanetView key={building} building={building}  />
                    </div>
                )
            })
        }
        Axios.put(`/api/user/${this.props.reducer.user.user_id}`, {energy, minerals})
        .then()
        .catch(err => console.log(err))
        return(
            <div>
                {planetName}
                {this.state.addingBuilding === false ? 
                <div>
                    {mappedBuildings}
                    <button onClick={() => this.setState({addingBuilding: true})}>Add Building</button>
                </div> : <div><AddBuilding toggleAddingBuilding={this.toggleAddingBuilding} /><button onClick={()=>this.setState({addingBuilding: false})} >Return</button></div> }
                
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;


export default connect(mapStateToProps, {getPlanetThunk})(Home);