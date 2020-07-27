import React from "react";
import Axios from "axios";
import {connect} from "react-redux";
import {getUser, getUserId} from "../../redux/reducer"
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
        Axios.post('/auth/register', {username, email, password})
        .then(res =>{
            this.props.getUser(res.data)
            this.props.history.push("/Home");
        })
        .catch(err => alert(err));
    }
    login(){
        const {username, password} = this.state;
        Axios.post('/auth/login', {username, password})
        .then(res=>{
            this.props.getUser(res.data)
            //this.props.getUserId(res.data.userId)
            this.props.history.push("/Home")
        })
        .catch(err => alert(err));
    }
    render(){
        return(
            <div>
                Auth
                <input placeholder="Enter Username" onChange={e => this.setState({username: e.target.value})}/>
                <input placeholder="Enter password" onChange={e => this.setState({password: e.target.value})}/>
                <input placeholder="Enter Email" onChange={e => this.setState({email: e.target.value})}/>
                <button onClick={this.createUser}>Register</button>
                <button onClick={this.login}>Log in</button>
            </div>
        )
    }
}



export default connect(null, {getUser, getUserId})(Auth);