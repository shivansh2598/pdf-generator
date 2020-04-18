import React from "react";
import HomePage from "./HomePage";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import "./App.css"
import TopBar from "./TopBar";

const history = createHistory();

function App(){
  return(
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Route 
          path="/"
          exact
          component={props => (
            <HomePage {...props} documentStore={documentStore} />
          )}
        />
      </Router>
    </div>
  )
}
export default App;