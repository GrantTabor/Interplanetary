import React from 'react';
import logo from './logo.svg';
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
        {this.props.location.pathname === "/" ? <h1>INTERPLANETARY</h1> : <Navbar history={this.props.location}/>}
        {router}
      </div>
    );
  }
  
}

export default withRouter(App);
