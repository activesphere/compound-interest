import React from 'react';
import Chart from '../Chart.jsx';
import fv from '../fv.js';
import * as d3 from 'd3';

class TimeValue extends React.Component {
  render() {
    const fvFn = y => r =>
      d3.range(1, 35, 0.1).map(n => fv({ rate: r / 100, period: n }));

    const x = d3.range(1, 35, 0.1);

    const fv35 = fvFn(35);

    const label = r => (x, y) => `${r}%: ${y} times in ${x} years`;

    return (
      <div className="TimeValue">
        <Chart
          xLabel="years"
          yLabel="Multiple"
          tooltipLabel="times"
          withRightLabel
          data={[
            {
              label: '4% interest rate',
              hoverTxt: label(4),
              x,
              y: fv35(4)
            },
            {
              label: '7% interest rate',
              hoverTxt: label(7),
              x,
              y: fv35(7)
            },
            {
              label: '10% interest rate',
              hoverTxt: label(10),
              x,
              y: fv35(10)
            }
          ]}
        />
      </div>
    );
  }
}

export default TimeValue;
