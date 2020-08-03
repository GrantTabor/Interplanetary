import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import Auth from "./Components/Auth/Auth"
import Home from "./Components/Home/Home"
import Attack from "./Components/Attack/Attack"
export default (
    <Switch>
        <Route exact path = "/" component={Auth}/>
        <Route path = "/Home" component={Home}/>
        <Route path = "/Attack" component={Attack} />
        
    </Switch>
)