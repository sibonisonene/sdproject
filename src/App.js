// App.js

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; 
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import RemoveUser from "./components/auth/RemoveUser";
import Dashboard from "./components/Dashboard";
import Fines from "./components/Fines";
import Issues from "./components/Issues";
import Maintenance from "./components/Maintenance";
import PrivateRoute from "./PrivateRoute"; 
import Navbar from "./components/Navbar";
import AddAdmin from "./components/auth/AddAdmin";
import Modal from './components/Modal'; 
import { useState } from "react";
import Profile from "./components/Profile";

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
            <PrivateRoute path="/components/auth/RemoveUser" component={RemoveUser} isAdminRoute={true} />
            <PrivateRoute path="/components/Dashboard" component={Dashboard} />
            <PrivateRoute path="/components/Fines" component={Fines}/>
            <PrivateRoute path="/components/Issues" component={Issues}/>
            <PrivateRoute path="/components/Profile" component={Profile}/>
            <PrivateRoute path="/components/Maintenance" component={Maintenance} isAdminRoute={true} />
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
