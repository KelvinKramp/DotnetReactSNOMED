import React, { Component } from 'react';
import MOCK_DATA from "../MOCK_DATA.json";
import addConsult from "./AddConsult"
// Create searchbare native in react
// https://blog.logrocket.com/create-search-bar-react-from-scratch/



export class NewConsult extends Component {
  static displayName = NewConsult.name;

  constructor(props) {
    super(props);
    this.state = { query: "", term: "", conceptId: null, valueSearchBar: "", ptName: "", birthDate: "", gender: "", termsList: [] };
    this.setQuery = this.setQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clickOnTerm = this.clickOnTerm.bind(this);
    this.clearSearchBar = this.clearSearchBar.bind(this);
    this.setPtName = this.setPtName.bind(this);
    this.fetchSNOMED = this.fetchSNOMED.bind(this);
    this.setGender = this.setGender.bind(this);
  }

  fetchSNOMED = (input) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Accept-Language", "nl");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    console.log("running fetch statement")
    fetch("https://snowstorm.test-nictiz.nl/browser/MAIN%2FSNOMEDCT-NL/descriptions?term=" + input + "&groupByConcept=false&searchMode=STANDARD&offset=0&limit=20", requestOptions)
      .then((response) => response.json())
      .then(data => {
        console.log(data)
        this.state.termsList = data.items
        this.setState({ termsList: data.items })
      });

  }

  setQuery(query_input) {
    console.log("setting query to")
    console.log(query_input)
    this.setState({
      query: query_input
    });
    if (query_input.length > 10) {
      console.log(">10")
      this.fetchSNOMED(query_input)
    }
  }

  setGender() {
    document.getElementsByName("gender")
    .forEach((radio) => {
      if (radio.checked) {
        this.setState({
          gender: radio.value
        })
      }
    })
    console.log("SET GENDER FINISHED RUNNING")
    console.log(this.state.gender)
  }

  onSubmit = (e) => {
    console.log("submit button pressed")
    e.preventDefault()
    addConsult(this.state.ptName, this.state.birthDate, this.state.gender, this.state.term)
  }

  clickOnTerm(term_input, id_input) {
    console.log("clicked on term:")
    console.log(term_input, id_input)
    document.getElementById('RFE').value = term_input;
    this.setState({
      term: term_input
    });
    this.setState({
      conceptId: id_input
    });
    this.setState({
      query: ""
    })
    this.setState({
      termsList: []
    })
    console.log("GENDER")
    console.log(this.state.gender)
  }

  clearSearchBar() {
    document.getElementById('RFE').value = "";
  }

  setPtName(ptName_input) {
    this.setState({
      ptName: ptName_input
    });
  }

  setBirthDate(birthdate_input) {
    this.setState({
      birthDate: birthdate_input
    });
  }



  render() {
    return (
      <div>
        <h1>New Consult</h1>
        <br></br>
        <p>Fill in patient information:</p>
        <form action onSubmit={this.onSubmit}>
          <label for="reason">Name:</label><br></br>
          <input type="text" id="reason" name="fname" value={this.state.ptName} onChange={(e) => this.setPtName(e.target.value)}></input>
          <br></br>
          <br></br>
          <label for="date">Birthdate:</label><br></br>
          <input type="date" id="date" name="date" value={this.state.birthDate} onChange={(e) => this.setBirthDate(e.target.value)}></input>
          <br></br>
          <br></br>
          <div>Gender:</div>
          <div>
            <input class="form-check-input" type="radio" id="female" name="gender"
              value="F" onClick={this.setGender}></input>
            <label for="female">Female</label>
            <input class="form-check-input" type="radio" id="male" name="gender"
              value="M" onClick={this.setGender}></input>
            <label for="male">Male</label>
          </div>
          <br></br>
          <div>
            <label for="RFE">Reason for encounter: </label><br></br>
            <input id="RFE" onChange={e => this.setQuery(e.target.value)} />
          </div>

          {/* {
            MOCK_DATA.filter(SNOMEDTerm => {
              if (this.state.query === '') {
                return "";
              }
              else if (SNOMEDTerm.SNOMED_term.toLowerCase().includes(this.state.query.toLowerCase())) {
                return SNOMEDTerm;
              }
            }).map((term, index) => (
              <div className="box" onClick={() => this.clickOnTerm(term.SNOMED_term, term.Reference_ID)} key={index}>
                <p>{term.SNOMED_term}</p>
                <p>{term.Reference_ID}</p>
              </div>
            ))
          } */}

          {
            (this.state.termsList.length > 0) && this.state.termsList.map((term, index) => (
              <div className="box" onClick={() => this.clickOnTerm(term.term, term.concept.conceptId)} key={index}>
                <p>{term.term}</p>
                <p>{term.concept.conceptId}</p>
              </div>
              )
            )
          }

          <br></br>
          <div>
            <input type='Submit' value='Save Task' className='btn btn-primary'></input>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary" onClick={this.clearSearchBar}>Clear</button>
          </div>
        </form>
      </div>
    );
  }
}
