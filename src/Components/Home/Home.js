import React from "react";
import "./Home.scss"
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
        let userMinerals = this.props.reducer.user.minerals;
        let userEnergy = this.props.reducer.user.energy;
        let mappedBuildings = "";
        let buildingNum = "";
        let energy = 0;
        let minerals = 0;
        if (buildings){
            buildingNum = buildings.length;
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
            <div className="Home" >
                    <h3>{planetName} </h3>
                    <section className="output">
                        <span className="energy" >Energy Output: {energy}</span>
                        <span className="minerals" >Mineral Output: {minerals}</span>
                        
                    </section>
                    <section className="total">
                        <span className="energy" >Total Energy: {userEnergy}</span>
                        <span className="minerals" >Total Minerals: {userMinerals}</span>
                    </section>
                    <span>Buildings: {buildingNum}/20</span>
                {this.state.addingBuilding === false ? 
                <div className="not-building" >
                    <section className="buildings">
                     {mappedBuildings}
                    </section>
                    <button onClick={() => this.setState({addingBuilding: true})} className="adding-button" >Add Building</button>
                </div> : <div><AddBuilding toggleAddingBuilding={this.toggleAddingBuilding} /><button onClick={()=>this.setState({addingBuilding: false})} >Return</button></div> }
                
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;


export default connect(mapStateToProps, {getPlanetThunk})(Home);