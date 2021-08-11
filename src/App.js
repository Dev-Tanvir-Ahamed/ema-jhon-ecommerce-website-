import React, { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import Shipment from "./components/Shipment/Shipment";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ManageInventory from "./components/ManageInventory/ManageInventory";
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        Name : <h3>{loggedInUser.email}</h3>
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/review"></Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment />
            </PrivateRoute>
            <PrivateRoute path="/manageInventory">
              <ManageInventory />
            </PrivateRoute>
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
