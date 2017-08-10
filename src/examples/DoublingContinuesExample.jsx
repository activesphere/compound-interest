import React from 'react';

import Example from '../Example.jsx';
import Case from '../Case.jsx';
import NumSlider from '../NumSlider.jsx';

const DoublingContinuesExample = () => {
  return (
    <Example>
      <Case rate={7}>
        {({ rate, doublingPeriod, multiple, onRateChange }) =>
          <div>
            <code>
              <NumSlider
                num={rate}
                percent
                step={1}
                min={1}
                max={20}
                onChange={onRateChange}
              />
            </code>{' '}
            interest has doubling period of approx{' '}
            <code>{Math.round(doublingPeriod)}</code> years. By year{' '}
            {Math.round(doublingPeriod * 3)} (3 doubling years) , your
            investment would grow to <code>8</code> times the intial investment.
            And if you wait another <code>
              {Math.round(doublingPeriod)}
            </code>{' '}
            years, it will grow to <code>16</code> times. In case you are all to
            exited, finding{' '}
            <a href="https://en.wikipedia.org/wiki/Real_interest_rate">
              real interest rate
            </a>{' '}
            of 7% might not be easy.
          </div>}
      </Case>
    </Example>
  );
};

export default DoublingContinuesExample;
