// App.js

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; 
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./PrivateRoute"; 
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />  
          <Switch>
            <Route exact path="/">
              <SignIn />
            </Route>
            <Route path="/components/auth/signUp">
              <SignUp />
            </Route>
            <PrivateRoute path="/components/Dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
