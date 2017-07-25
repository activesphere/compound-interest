import React, { Component } from 'react';

class CurrentCurrency extends Component {
  render() {
    return (
      <code>
        ₹{this.props.amount}
      </code>
    );
  }
}

export default CurrentCurrency;
