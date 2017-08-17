import React, { Component } from 'react';
import numeral from 'numeral';

class CurrentCurrency extends Component {
  render() {
    return (
      <code>
        ₹{numeral(this.props.amount).format()}
      </code>
    );
  }
}

export default CurrentCurrency;
