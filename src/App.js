import React from 'react';
import logo from './logo.svg';
import './App.css';
import router from "./router"
import Navbar from "./Components/Navbar/Navbar"
import {withRouter} from "react-router-dom";
class App extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="App">
        {this.props.location.pathname === "/" ? null : <Navbar history={this.props.location}/>}
        {router}
      </div>
    );
  }
  
}

export default withRouter(App);
