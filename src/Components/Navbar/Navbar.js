import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import {resetUser} from "../../redux/reducer"
import Axios from "axios";
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
            </div>
        )
    }
}

export default connect(null, {resetUser})(Navbar);