// App.js

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; 
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./PrivateRoute"; 
import Navbar from "./components/Navbar";
import AddAdmin from "./components/auth/AddAdmin";
import Modal from './components/Modal'; // Adjust the path as needed
import { useState } from "react";

function App() {

  const [isAddAdminModalOpen, setAddAdminModalOpen] = useState(false);

  const openModal = () => {setAddAdminModalOpen(true)};
  const closeModal = () => setAddAdminModalOpen(false);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar openModal={openModal}/>  
          <Switch>
            <Route exact path="/">
              <SignIn />
            </Route>
            <PrivateRoute path="/components/auth/signUp" component={SignUp} isAdminRoute={true} />
            <PrivateRoute path="/components/Dashboard" component={Dashboard} />
          </Switch>
          <Modal isOpen={isAddAdminModalOpen} onClose={closeModal}>
            <AddAdmin />
          </Modal>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
