import React from 'react';


class TotalList extends React.Component {
  

  render() {
    return (
      <div>
        <ul>
          <li>Number 2: {this.props.state.number1}, Number 2: {this.props.state.number2}, Total:{this.props.state.total}</li>
        </ul>
      </div>
    );
  }
}


export default TotalList;