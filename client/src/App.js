import React, { Fragment } from "react";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import EncryptForm from './component/EncryptForm'
import DecryptForm from './component/DecryptForm'
import About from './component/About'

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/encrypt" component={EncryptForm} />
          <Route exact path="/decrypt" component={DecryptForm} />
          <Route exact path="/about" component={About} />
          
        </Switch>
      
        
      </Fragment>
    </Router>
  )
}
export default App;