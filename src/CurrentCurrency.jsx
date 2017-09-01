import React, { Component } from 'react';

class CurrentCurrency extends Component {
  render() {
    const num = this.props.amount;

    if (!num.toLocaleString) {
      const symb = this.props.currency === 'INR' ? '₹' : '$';
      return (
        <code>
          {symb}
          {num}
        </code>
      );
    }

    const locale = this.props.currency === 'INR' ? 'hi-IN' : 'en-US';
    return (
      <code>
        {num.toLocaleString(locale, {
          style: 'currency',
          currencyDisplay: 'symbol',
          currency: this.props.currency,
          minimumFractionDigits: 0
        })}
      </code>
    );
  }
}

export default CurrentCurrency;
