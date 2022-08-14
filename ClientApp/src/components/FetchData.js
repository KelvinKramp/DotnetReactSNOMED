import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { consults: [], loading: true };
    this.searchNameFunction = this.searchNameFunction.bind(this)
  }

  async searchNameFunction() {
    var val = document.getElementById("nameToSearch").value;
    console.log("Searching based on typed name")
    if (val){
      const response = await fetch('consultationsdb/'+val);
      const data = await response.json();
      console.log(data)
      this.setState({ forecasts: [data], loading: false });
    }
    else {{
      this.populateWeatherData();
    }}
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(consults) {
    return (
      <div>
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthdate</th>
            <th>Gender</th>
            <th>SNOMED description</th>
          </tr>
        </thead>
        <tbody>
          {consults.map(c =>
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.birthDate}</td>
              <td>{c.gender}</td>
              <td>{c.rfe}</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    );
  }

  render() {
    let table = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    // let searchName = FetchData.renderSearchName();

    return (
      <div>
        <h1 id="tabelLabel" > Consultations </h1>
        <p>Demonstrates saved list of consultations.</p>
        <input id="nameToSearch" placeholder="Enter Name" />
      &nbsp;&nbsp;&nbsp;
      <button id="searchName" className="btn btn-primary" onClick={this.searchNameFunction}>Search</button>
        {table}
        <div>


        </div>
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('consultationsdb');
    const data = await response.json();
    console.log(data)
    this.setState({ forecasts: data, loading: false });
  }
}
