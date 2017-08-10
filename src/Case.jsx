import React from 'react';
import doublingPeriod from './doublingPeriod.js';
import fv from './fv.js';

class Case extends React.Component {
  state = {
    rate: null,
    period: null,
    multiple: null,
    initialAmount: null,
    returnAmount: null
  };

  componentWillMount() {
    const { rate, period, initialAmount } = this.props;

    this.setState(
      {
        rate,
        period,
        initialAmount
      },
      this.update
    );
  }

  onRateChange = newRate => {
    this.setState({ rate: newRate }, this.update);
  };

  onPeriodChange = newPeriod => {
    this.setState({ period: newPeriod }, this.update);
  };

  getPeriod = () => {
    if (this.props.period) {
      return this.state.period;
    }
    return null;
  };

  getRate = () => {
    if (this.props.rate) {
      return this.state.rate;
    }

    return null;
  };

  update = () => {
    const { amount } = this.state;
    const rate = this.getRate();
    let period = this.getPeriod();

    const dPeriod = doublingPeriod({ rate: rate / 100 });
    period = period || dPeriod;

    const multiple = fv({ rate: rate / 100, period });
    const returnAmount = amount * multiple;

    this.setState({
      doublingPeriod: dPeriod,
      period,
      multiple,
      returnAmount
    });
  };

  render() {
    const { children } = this.props;

    /* style={{ backgroundColor: '#eae6d5', padding: '1rem' }}*/
    return (
      <span>
        {' '}{children({
          ...this.state,
          onRateChange: this.onRateChange,
          onPeriodChange: this.onPeriodChange
        })}{' '}
      </span>
    );
  }
}

export default Case;
