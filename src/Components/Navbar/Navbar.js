import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import {resetUser} from "../../redux/reducer"
import Axios from "axios";
import {withRouter} from "react-router-dom";

class Navbar extends React.Component {
    constructor(props){
        super(props);
    }
    handleLogout = () =>{
        this.props.resetUser();
        
        Axios.get("/auth/logout")
    }

    render(){
        return(
            <div>
                <Link to="/" onClick={() => this.handleLogout()}>Log Out</Link>
                {this.props.location.pathname === "/Home" ? <Link to="/Attack">Attack</Link> : <Link to="/Home">Home</Link> }
            </div>
        )
    }
}

export default withRouter(connect(null, {resetUser})(Navbar));