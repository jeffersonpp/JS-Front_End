import React, { Component } from "react";
import ClientDataService from "../service/client.service";
import { Link } from "react-router-dom";

export default class ClientsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveClients = this.retrieveClients.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveClient = this.setActiveClient.bind(this);
    this.removeAllClients = this.removeAllClients.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      clients: [],
      currentclient: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveClients();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveClients() {
    ClientDataService.getAll()
      .then(response => {
        this.setState({
          clients: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveClients();
    this.setState({
      currentClient: null,
      currentIndex: -1
    });
  }

  setActiveClient(client, index) {
    this.setState({
      currentClient: client,
      currentIndex: index
    });
  }

  removeAllClients() {
    ClientDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    ClientDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          clients: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() 
  {

    const { searchName, clients, currentClient, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Clients List</h4>

          <ul className="list-group">
            {clients &&
              clients.map((client, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveClient(client, index)}
                  key={index}
                >
                  {client.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllClients}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-8">
          {currentClient ? (
            <div>
              <h4>Client</h4>
                <table className="table">
                  <tbody>
                    
                  <tr>
                    <td><strong>Name: </strong></td>
                    <td>{currentClient.name}</td>
                  </tr>
                  <tr>
                    <td><strong>Address:</strong></td>
                    <td>{currentClient.address}</td>
                  </tr>
                  <tr>
                    <td colSpan='2'>
                      <Link
                      to={"/clients/" + currentClient.id}
                      className="badge badge-warning"
                    >
                      Edit
                    </Link>
                    </td>
                  </tr>
                  </tbody>
                </table>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Client</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}