import React, { Fragment } from "react";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import EncryptForm from './component/EncryptForm'

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/encrypt" component={EncryptForm} />
        </Switch>
      </Fragment>
    </Router>
  )
}
export default App;