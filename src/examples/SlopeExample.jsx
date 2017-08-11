import React from 'react';

import Example from '../Example.jsx';
import Case from '../Case.jsx';
import NumSlider from '../NumSlider.jsx';
import fv from '../fv.js';
import Para from '../Para.jsx';

const SlopeExample = () => {
  return (
    <Example>
      <Case rate={7} period={10}>
        {({ rate, doublingPeriod, period, onRateChange, onPeriodChange }) => {
          const middle = period + 0.5;
          const r = rate / 100;
          const lastYearRate =
            r *
            fv({
              rate: r,
              period: middle
            });
          const prevFv = fv({
            rate: r,
            period
          });
          const nextFv = fv({
            rate: r,
            period: period + 1
          });

          return (
            <div>
              <Para>
                Lets take an investment with interest rate{' '}
                <code>
                  <NumSlider
                    percent
                    num={rate}
                    min={1}
                    max={16}
                    onChange={r => {
                      onRateChange(r);
                    }}
                  />
                </code>. What would be the growth of the investment in year{' '}
                <code>
                  <NumSlider
                    num={period}
                    min={1}
                    max={30}
                    onChange={onPeriodChange}
                  />
                </code>? The investment would have grown to{' '}
                <code>{prevFv.toFixed(2)}</code> the initial amount, at the
                starting of <code>{period}</code>
                . The slope of the line at the middle of the year, ex{' '}
                <code>{middle}</code>
                , is {`\\(r(1+r)^{${middle}}\\)`}
                , which is (as percentage){' '}
                <code>{(lastYearRate * 100).toFixed(2)}%</code>
                . The actual change between year {period} and {period + 1} is{' '}
                <code>{(100 * (nextFv - prevFv)).toFixed(2)}%</code>.
              </Para>

              <Para>
                Play around with different interest rates and year values. The
                approximation is mostly within 1% of the actual value.
              </Para>

              <Para>
                This also gives us a quick way to approximate the percentange
                change in the year when the amount doubles (or quadruples, or
                other multiples of <code>2</code>
                ). At the year of the doubling, \((1+r)^n\) is <code>2</code>
                . So the rate change that year comes out to be \(r*2\). Ex, for
                interest rate {rate}, it would be{' '}
                <code>{r.toFixed(2)} * 2</code> or{' '}
                <code>{r.toFixed(2) * 2}%</code>
                . On the year of the second doubling it would be{' '}
                <code>{r.toFixed(2)} * 4</code> or{' '}
                <code>{r.toFixed(2) * 4}%</code>
                .
              </Para>
            </div>
          );
        }}
      </Case>
    </Example>
  );
};

export default SlopeExample;
