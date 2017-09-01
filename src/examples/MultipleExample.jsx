import NumSlider from '../NumSlider.jsx';
import React from 'react';
import Currency from '../CurrentCurrency.jsx';
import Case from '../Case.jsx';
import Example from '../Example.jsx';

class MultipleExample extends React.Component {
  mainBody = ({ rate, period, multiple, onRateChange, onPeriodChange }) => {
    return (
      <div>
        With{' '}
        <code>
          <NumSlider
            num={rate}
            min={1}
            max={16}
            percent
            onChange={onRateChange}
          />
        </code>{' '}
        interest rate, in{' '}
        <code>
          <NumSlider
            num={period}
            step={1}
            min={1}
            max={40}
            onChange={onPeriodChange}
          />
        </code>{' '}
        years your initial investment would grow approximately{' '}
        <code>{multiple}</code> times. In other words,{' '}
        <Currency currency={this.props.currency} amount={1000} /> would grow to{' '}
        <Currency currency={this.props.currency} amount={1000 * multiple} /> and{' '}
        <Currency currency={this.props.currency} amount={1000000} /> would grow
        to{' '}
        <Currency currency={this.props.currency} amount={1000000 * multiple} />
        .
      </div>
    );
  };
  render() {
    const { rate, period } = this.props;

    return (
      <Example>
        <Case rate={rate} period={period}>
          {({ multiple, ...props }) =>
            this.mainBody({
              ...props,
              multiple: multiple && multiple.toFixed(2)
            })}
        </Case>
      </Example>
    );
  }
}

export default MultipleExample;
