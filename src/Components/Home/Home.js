import React from "react";
import {connect} from "react-redux";
import Axios from "axios";
import {getPlanet} from "../../redux/planetReducer"
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: this.props.reducer.user.username,
            planetName: this.props.planetReducer.planet.planet_name
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount(){
        let userId = this.props.reducer.user.user_id;
        console.log(this.props.reducer.user)
        Axios.get(`/api/planet/${userId}`)
        .then(res =>{
            this.props.getPlanet(res.data[0])
            console.log(res.data[0])
            this.setState({planetName: this.props.planetReducer.planet.planet_name})
        })
        .catch(err => alert(err))
        
    }
    

    render(){
        //console.log(this.props.user)
        console.log(this.props.planetReducer)
        return(
            <div>
                Home
                {this.state.username}
                {this.state.planetName}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;


export default connect(mapStateToProps, {getPlanet})(Home);