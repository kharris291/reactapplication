import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './css/index.css';

import TotalList from './js/TotalList';


class NumberAdditionTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number1: '',
      number2: '',
      total:'',
      previousAdditions:[]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  //handle input changes and add them to the state
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  //handle the submit of the information
  async handleSubmit() {
    //use axios post methos to send message to spring application to do the addition
    let response = await axios.post('http://localhost:8083/addNumbers', 
      JSON.stringify({
        number1: this.state.number1,
        number2: this.state.number2
      }), {
        headers: { 
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
    //store previous additions
    const newAdditionsList = this.state.previousAdditions.concat(response.data);
    this.setState({
      previousAdditions: newAdditionsList,
      total: response.data.total 
    });
  }

  render() {
    //build up Totals list to render to screen
    const totalList = this.state.previousAdditions.map((item, i) => (
            <TotalList state={item} key={i}/>
    ));
    return (
      <div>
          <label>
          Number 1:
          <input type="number" name="number1" value={this.state.number1} onChange={this.handleChange} />
          </label>
          <label>
          Number 2:
          <input type="number" name="number2" value={this.state.number2} onChange={this.handleChange} />
          </label>
          <input type="submit" onClick={this.handleSubmit} value="Submit" />
        {this.state.total !== '' && <h2> currentTotal: {this.state.total}</h2>}
        {this.state.total !== '' && <h2> Previous Additions </h2>  }
        {totalList}
      </div>
    );
  }
}


ReactDOM.render(
  <NumberAdditionTemplate />,
  document.getElementById('root')
);
