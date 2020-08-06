import React from "react";
import Axios from "axios";
import './Auth.scss';
import {connect} from "react-redux";
import {getUserThunk, registerUserThunk} from "../../redux/reducer"
import {getPlanetThunk} from "../../redux/actions/planetActions";
import {Redirect} from 'react-router-dom';
class Auth extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            isRegistering: false,
            isEnteringBadName: false,
            isEnteringBadPassword: false
        }
        this.createUser = this.createUser.bind(this);
        this.login = this.login.bind(this);
    }
    
    createUser(){
        if(this.state.username !== ""  && this.state.password !== ""){
            const {username, password, email} = this.state;
        this.props.registerUserThunk(username, password, email);
        let userId = this.props.reducer.user.user_id
        this.props.getPlanetThunk(userId)
        this.props.history.push(`/Home`)
        }
        else if (this.state.username !== ""){
            this.setState({isEnteringBadPassword: true, isEnteringBadName: false})
        }
        else if (this.state.password !== ""){
            this.setState({isEnteringBadName: true, isEnteringBadPassword: false})
        }
        else {
            this.setState({isEnteringBadName: true, isEnteringBadPassword: true})
        }
        
        
    }
    login(){
        if(this.state.username !== ""  && this.state.password !== ""){
            const {username, password} = this.state;
        this.props.getUserThunk(username, password);
        let userId = this.props.reducer.user.user_id
        this.props.getPlanetThunk(userId)
        
          
        }
        else if (this.state.username !== ""){
            this.setState({isEnteringBadPassword: true, isEnteringBadName: false})
        }
        else if (this.state.password !== ""){
            this.setState({isEnteringBadName: true, isEnteringBadPassword: false})
        }
        else {
            this.setState({isEnteringBadName: true, isEnteringBadPassword: true})
        }

        
    }
    toggleRegister = () =>{
        this.setState({isRegistering: !this.state.isRegistering})
    }
    render(){
        return(
            <div className="Auth" >
                
                <input placeholder="Enter Username" onChange={e => this.setState({username: e.target.value})}/>
                {this.state.isEnteringBadName === false ? "" : <span>Must Enter Username</span>}
                <input placeholder="Enter Password" type="password" onChange={e => this.setState({password: e.target.value})}/>
                {this.state.isEnteringBadPassword === false ? "" : <span>Must Enter Password</span>}
                {this.state.isRegistering == true ? <input placeholder="Enter Email (Optional)" onChange={e => this.setState({email: e.target.value})}/> : ""}
                <section className="buttons">
                    {this.state.isRegistering === true ? <button onClick={this.toggleRegister}>Back</button> : <button onClick={this.toggleRegister}>Register</button>}
                    {this.state.isRegistering === true ? <button onClick={this.createUser}>Create Account</button> : <button onClick={this.login}>Log in</button>}
                </section>
                {this.props.reducer.isUserAuthenticated ? <Redirect to={'/Home'}/> : null}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUserThunk, registerUserThunk, getPlanetThunk})(Auth);