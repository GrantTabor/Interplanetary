import React from "react";
import Axios from "axios";
import './Auth.scss';
import {connect} from "react-redux";
import {getUserThunk, registerUserThunk} from "../../redux/reducer"
import {getPlanetThunk} from "../../redux/actions/planetActions"
class Auth extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        }
        this.createUser = this.createUser.bind(this);
        this.login = this.login.bind(this);
    }
    
    createUser(){
        const {username, password, email} = this.state;
        this.props.registerUserThunk(username, password, email);
        let userId = this.props.reducer.user.user_id
        this.props.getPlanetThunk(userId)
        this.props.history.push(`/Home`)
        
        
    }
    login(){
        const {username, password} = this.state;
        this.props.getUserThunk(username, password);
        let userId = this.props.reducer.user.user_id
        this.props.getPlanetThunk(userId)
        this.props.history.push("/Home");
        
        
    }
    render(){
        return(
            <div className="Auth" >
                
                <input placeholder="Enter Username" onChange={e => this.setState({username: e.target.value})}/>
                <input placeholder="Enter password" type="password" onChange={e => this.setState({password: e.target.value})}/>
                <input placeholder="Enter Email" onChange={e => this.setState({email: e.target.value})}/>
                <section className="buttons">
                    <button onClick={this.createUser}>Register</button>
                    <button onClick={this.login}>Log in</button>
                </section>
                
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUserThunk, registerUserThunk, getPlanetThunk})(Auth);