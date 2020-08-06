import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import {resetUser, deAuthenticateUser} from "../../redux/reducer"
import {resetPlanets} from "../../redux/planetReducer"
import Axios from "axios";
import {withRouter} from "react-router-dom";
import "./Navbar.scss"
class Navbar extends React.Component {
    constructor(props){
        super(props);
    }
    handleLogout = () =>{
        this.props.deAuthenticateUser();
        this.props.resetUser();
        this.props.resetPlanets();
        Axios.get("/auth/logout")
    }

    render(){
        return(
            <div className="Navbar" >
                <Link to="/" onClick={() => this.handleLogout() }  className="log-out">Log Out</Link>
                <h2>INTERPLANETARY</h2>
                {this.props.location.pathname === "/Home" ? <Link to="/Attack" className="attack">Attack</Link> : <Link to="/Home" className="home">Home</Link> }
            </div>
        )
    }
}

export default withRouter(connect(null, {resetUser, deAuthenticateUser, resetPlanets})(Navbar));