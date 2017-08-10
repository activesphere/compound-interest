import React from 'react';

import Example from '../Example.jsx';
import Case from '../Case.jsx';
import NumSlider from '../NumSlider.jsx';

const ValueOf1PercExample = () => {
  return (
    <Example>
      <Case rate={3}>
        {({ rate, doublingPeriod, onRateChange }) =>
          <Case rate={2}>
            {({
              rate: realRate,
              doublingPeriod: realDoublingPeriod,
              onRateChange: onRealRateChange
            }) =>
              <span>
                Lets say your investment is giving you{' '}
                <code>
                  <NumSlider
                    num={rate}
                    percent
                    min={1}
                    max={10}
                    onChange={r => {
                      onRateChange(r);
                      onRealRateChange(r - (rate - realRate));
                    }}
                  />
                </code>{' '}
                interest rate and the management fees is{' '}
                <code>
                  <NumSlider
                    percent
                    num={rate - realRate}
                    min={1}
                    max={3}
                    onChange={x => onRealRateChange(rate - x)}
                  />
                </code>. That <code>{rate - realRate}%</code> is increasing your
                investments doubling period by approximately{' '}
                <code>
                  {Math.round(realDoublingPeriod - doublingPeriod)}
                </code>{' '}
                years.
              </span>}
          </Case>}
      </Case>
    </Example>
  );
};

export default ValueOf1PercExample;
