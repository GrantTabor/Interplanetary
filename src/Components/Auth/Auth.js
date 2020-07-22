import React from "react";
import Axios from "axios";

class Auth extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        }
        this.createUser = this.createUser.bind(this);
    }
    
    createUser(){
        const {username, password, email} = this.state;
        Axios.post('/auth/register', {username, email, password})
        .then(res =>{
            alert("success");
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
            </div>
        )
    }
}

export default Auth;