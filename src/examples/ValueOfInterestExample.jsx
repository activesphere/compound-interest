import React from 'react';

import Example from '../Example.jsx';
import NumSlider from '../NumSlider.jsx';
import Case from '../Case.jsx';
import HoverNote from '../HoverNote.jsx';

const ValueOfInterestExample = () => {
  return (
    <Example>
      <Case rate={10}>
        {({ rate, doublingPeriod, onRateChange }) =>
          <Case rate={7}>
            {({
              rate: smallRate,
              doublingPeriod: smallDoublingPeriod,
              onRateChange: onSmallRateChange
            }) =>
              <span>
                Here is a way to think about the it, in terms of doubling
                period. Lets compare interest rates of {' '}
                <code>
                  <NumSlider
                    percent
                    num={rate}
                    min={1}
                    max={16}
                    onChange={r => {
                      onRateChange(r);
                      if (smallRate >= r) {
                        onSmallRateChange(r - 1);
                      }
                    }}
                  />
                </code>{' '}
                (which has doubling period of{' '}
                {doublingPeriod && doublingPeriod.toFixed(2)} years) and{' '}
                <code>
                  <NumSlider
                    percent
                    num={smallRate}
                    min={1}
                    max={15}
                    onChange={x => {
                      onSmallRateChange(x);
                      if (x >= rate) {
                        onRateChange(x + 1);
                      }
                    }}
                  />
                </code>{' '}
                (which has doubling period{' '}
                <code>
                  {smallDoublingPeriod && smallDoublingPeriod.toFixed(2)}
                </code>
                ). Difference between their doubling period is{' '}
                <code>{(smallDoublingPeriod - doublingPeriod).toFixed(2)}</code>
                . For your money to grow <code>8</code> times, requires{' '}
                <code>3</code> doubling periods. In other words,{' '}
                <span className="b">
                  <code>{smallRate}%</code> investment would take{' '}
                  <code>
                    {(3 * (smallDoublingPeriod - doublingPeriod)).toFixed(2)}
                  </code>
                  <HoverNote>
                    <code>
                      3 *  {(smallDoublingPeriod - doublingPeriod).toFixed(2)}
                    </code>{' '}
                    years.{' '}
                  </HoverNote>{' '}
                   more years, than <code>{rate}%</code>
                  ,  to grow your money by 8 times.
                </span>
              </span>}
          </Case>}
      </Case>
    </Example>
  );
};

export default ValueOfInterestExample;
