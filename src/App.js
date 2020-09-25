import React, { Component } from "react";

import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';


import AddClient from "./component/add-client";
import Client from "./component/client";
import ClientList from "./component/client-list";


class App extends Component {

  Header() {
    // Import result is the URL of your image
    return <img src={logo} alt="Logo" />;
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/clients" className="navbar-brand">
            Jefferson
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/clients"} className="nav-link">
                Clients
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/clients"]} component={ClientList} />
            <Route exact path="/add" component={AddClient} />
            <Route path="/clients/:id" component={Client} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;