import React from "react";
import {connect} from "react-redux";
import Axios from "axios";
import {getPlanetThunk} from "../../redux/actions/planetActions"
//import {getPlanet} from "../../redux/planetReducer"
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: this.props.reducer.user.user_name,
            planetName: ""
        }
    }
    componentDidUpdate(prevProps){
        if (prevProps != this.props){
            this.setState({username: this.props.reducer.user.user_name})
        }
    }
    
    

    render(){
        const planet = this.props.planetReducer.planet[0];
        const planetName = planet ? planet.planet_name : '';
        /*
        const mappedBuildings = this.props.planetReducer.map(x =>{
            return(
                <div>
                    BUILDING
                </div>
            )
        })*/
        return(
            <div>
                {this.state.username}
                {this.props.reducer.user.username}
                {planetName}
                
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;


export default connect(mapStateToProps, {getPlanetThunk})(Home);