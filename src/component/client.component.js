import React, { Component } from "react";
import ClientDataService from "../service/client.service";

export default class Client extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.getClient = this.getClient.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);

    this.state = {
      currentClient: {
        id: null,
        name: "",
        address: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getClient(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          name: name
        }
      };
    });
  }

  onChangeAddress(e) 
  {
    const address = e.target.value;
    
    this.setState(prevState => ({
      currentClient: {
        ...prevState.currentClient,
        address: address
      }
    }));
  }

  getClient(id)
  {
    ClientDataService.get(id)
      .then(response => {
        this.setState({
          currentClient: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateClient() 
  {
    ClientDataService.update(
      this.state.currentClient.id,
      this.state.currentClient
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The client was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteClient() 
  {    
    ClientDataService.delete(this.state.currentClient.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/clients')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentClient } = this.state;

    return (
      <div>
        {currentClient ? (
          <div className="edit-form">
            <h4>Client</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentClient.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={currentClient.address}
                  onChange={this.onChangeAddress}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteClient}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateClient}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Client</p>
          </div>
        )}
      </div>
    );
  }
}