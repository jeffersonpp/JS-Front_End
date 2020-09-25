import React, { Component } from "react";
import ClientDataService from "../service/client.service";

export default class AddClient extends Component 
{
  constructor(props) 
  {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.saveClient = this.saveClient.bind(this);
    this.newClient = this.newClient.bind(this);

    this.state = 
    {
      id: null,
      name: "",
      address: "", 
      published: false,

      submitted: false
    };
  }

  onChangeName(e) 
  {
    this.setState({
      name: e.target.value
    });
  }

  onChangeAddress(e) 
  {
    this.setState({
      address: e.target.value
    });
  }

  saveClient() 
  {
    var data = 
    {
      name: this.state.name,
      address: this.state.address
    };

    ClientDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          address: response.data.address,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newClient() 
  {
    this.setState({
      id: null,
      name: "",
      address: "",

      submitted: false
    });
  }

  render() 
  {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newClient}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  required
                  value={this.state.address}
                  onChange={this.onChangeAddress}
                  name="address"
                />
              </div>
  
              <button onClick={this.saveClient} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
}