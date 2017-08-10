import React from 'react';

import NumSlider from '../NumSlider.jsx';
import Example from '../Example.jsx';
import Case from '../Case.jsx';

export default () =>
  <Example>
    <Case rate={7}>
      {({ rate, doublingPeriod, multiple, onRateChange }) =>
        <span>
          {' '}With an interest rate of{' '}
          <code>
            <NumSlider
              num={rate}
              percent
              step={1}
              min={1}
              max={20}
              onChange={onRateChange}
            />
          </code>
          , in <code>{Math.round(doublingPeriod)}</code> years (which is
          approximately <code>72/{rate}</code>
          ) your initial investment will double.
        </span>}
    </Case>
  </Example>;
