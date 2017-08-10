import React from 'react';
import afv from './afv.js';

class Annuity extends React.Component {
  render() {
    return (
      <div>
        <h2 className="f4">Systematic investment</h2>
        <Chart
          xLabel="Period"
          yLabel="Multiple"
          tooltipLabel="times"
          data={[
            {
              hoverTxt: (x, y) => `Single: 4% interest, ${x} years => A * ${y}`,
              x: d3.range(1, 25, 0.1),
              y: d3.range(1, 25, 0.1).map(x => fv({ rate: 4 / 100, period: x }))
            },
            {
              hoverTxt: (x, y) => `SIP: 4% interest, ${x} years => A * ${y}`,
              x: d3.range(1, 25, 0.1),
              y: d3
                .range(1, 25, 0.1)
                .map(x => afv({ rate: 4 / 100, period: x }))
            },
            {
              hoverTxt: (x, y) => `SIP: 7% interest, ${x} years => A * ${y}`,
              x: d3.range(1, 25, 0.1),
              y: d3
                .range(1, 25, 0.1)
                .map(x => afv({ rate: 7 / 100, period: x }))
            },
            {
              hoverTxt: (x, y) => `Single: 7% interest, ${x} years => A * ${y}`,
              x: d3.range(1, 25, 0.1),
              y: d3.range(1, 25, 0.1).map(x => fv({ rate: 7 / 100, period: x }))
            }
          ]}
        />
      </div>
    );
  }
}

export default Annuity;
