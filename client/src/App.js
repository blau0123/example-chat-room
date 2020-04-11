import React from 'react';
import './App.css';

import Room from "./Room";
import Home from "./Home";
import {BrowserRouter, Route} from "react-router-dom";

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/room/:name" component={Room} />
      </BrowserRouter>
    )
  }
}

export default App;
