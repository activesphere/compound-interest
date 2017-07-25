import React from 'react';
import Chart from './Chart.jsx';
import * as d3 from 'd3';
import fv from './fv.js';
import afv from './afv.js';
import doublingPeriod from './doublingPeriod.js';

import NumSlider from './NumSlider.jsx';
import Case from './Case.jsx';
import MultipleExample from './examples/MultipleExample.jsx';
import TimeValue from './charts/TimeValue.jsx';

const showComments = true;

const Comments = ({ children }) => {
  if (showComments) {
    return (
      <span style={{ color: 'chocolate' }}>
        {' '}{children}{' '}
      </span>
    );
  }
  return null;
};

class PersonalFinance extends React.Component {
  render() {
    return (
      <div className="content">
        <h1>Compound Interest</h1>
        <div>
          TL:DR;{' '}
          <b>
            Invest early and often, with best real interest rates you can get.
            Let compounding do the rest.
          </b>
          <ul>
            <li>Compounding gives better results with time. Invest early.</li>
            <li>
              Think of compounding as multiplication factor. Invest amount \(A\)
              and get back \(x*A\) after some time. Where \(x\) depends on time
              and interest rate. You can split the investment and the net effect
              is same (without consider risk etc). Ex: \(x*(A1 + A2 + A3)\).{' '}
            </li>
            <li>
              <code>1%</code> matters a lot for low interest rates.
            </li>
          </ul>
        </div>
        <section>
          <Comments>
            A button to hide explanations. Shows just the few important parts.
            Graphs and conclusions.
          </Comments>
          <p>
            Compound interest is a crucial part of personal finance. Why might
            it be useful to understand compound interest better? Because it
            grows your money! The intent of this article is to build a better
            mental modal about properties of compound interest. If you don't
            know what compound interest is, probably skim through the{' '}
            <a href="https://en.wikipedia.org/wiki/Compound_interest">
              Wikipedia article
            </a>.
          </p>

          <p style={{ display: 'none' }}>
            Compound interest is an exponential process. Our brains are not yet
            (probably never will be) good at thinking about exponential
            processes. One way to think about compounding interests is through
            the doubling time of investment.{' '}
            <a href="https://en.wikipedia.org/wiki/Rule_of_72">
              Rule of <code>72</code>
            </a>{' '}
            is a method to obtain estimate of doubling time of interest rates.
            This, being a linear phenomenon, is much easier for our brain to
            play aorund with. We build rest of the observations on the same
            line. We will look at both the normal compounding, and annuaty. Its
            mostly properties of curves, and some maths.
          </p>

          <p style={{ display: 'none' }}>
            To start, here are a few scenarios. See if you have a mental modal
            to think about them.{' '}
          </p>
          <p style={{ display: 'none' }}>
            Imagine you have two investment options. 1) A low risk investment
            with <code>3%</code> interest rate and 2) a medium risk investment
            with <code>4%</code> interest rate? Which one would you choose? How
            about if the options are <code>16%</code> and <code>17%</code>? In
            other words, does it make sense to change your risk appetite based
            on interest rates available to you?
          </p>
          <p style={{ display: 'none' }}>
            How do you think about management fees? What is effect of you giving{' '}
            <code>1%</code> management fees, for an investment which gives{' '}
            <code>3%</code> returns. What about <code>3%</code> management fees,
            in a investment which gives <code>16%</code> returns?
          </p>

          <p>
            In this article we wont consider risk,{' '}
            <a href="https://en.wikipedia.org/wiki/Real_interest_rate">
              real interest rate
            </a>
            , taxes or other factors that might (and do) effect investments.
            Those are topics for separate blog post.
          </p>

          <p>
            <Comments>
              Assumptions in the article. Interest rates are assumed to be
              annual.
            </Comments>{' '}
          </p>

          <p>
            <Comments>
              Note that inflation is also a exponential process.{' '}
            </Comments>
          </p>

          {/* meta: talk about how it was done. */}
          <p>
            Lets start the equation for compounding. If you invest amount \(P\)
            with an annualy compounded interest \(r\), in \(n\) years the total
            amount \(P'\) would be: {`$$P' = { P(1 + r)^n } $$`}{' '}
          </p>
        </section>

        <section>
          <section>
            <h2>Multiple</h2>
            <div>
              <p>
                Its difficult to gain understanding of the growth, with this
                equation. One thing to note though, is that the return \(P'\) is
                a multiple of initial investment \(P\). All the observations in
                the article depend on this property. In other words, we can
                write the equation as:
                {`$$P'/P = { (1 + r)^n } $$`}
                Which essentially means, we could talk about how much the
                investment grows in a certain period of time. Irrespective of
                how much money you invest initially.{' '}
              </p>
              <MultipleExample rate={7} period={5} />
            </div>
          </section>

          <section>
            <h2>
              Rule of <code>72</code>
            </h2>
            <p>
              {`$$Approximate\\ doubling\\ period = { 72 \\over Interest\\ rate }$$`}
              This is a way to approximate the doubling time of investment. In
              other words, if you invest amount \(A\) at interest rate \(r\),
              your investment would become \(2*A\) in approximately \(72/r\)
              years. Again, refer to{' '}
              <a href="https://en.wikipedia.org/wiki/Rule_of_72">
                Wikipedia article
              </a>{' '}
              for details. And again, doubling period doesn't depend on how much
              money you put it.{' '}
              <Comments>
                Note on accuracy being low, when interest rates are high (which
                is not common in real life). And better works with yearly
                compounding etc. Added advantage, is that its easy to calculate.{' '}
              </Comments>
            </p>
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
                  ), your initial investment will double.
                </span>}
            </Case>
          </section>
          <section>
            <h2>Doubling continues</h2>
            <div>
              <p>
                Note that the Rule of <code>72</code> gives us a number to
                compare. But its only one doubling time. If you continue with
                the investment, your whole amount will double every \(72/r\)
                years.
              </p>
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
                    interest will have doubling period of approx{' '}
                    <code>{Math.round(doublingPeriod)}</code> years. By year 30,
                    your investment has grown <code>8</code> times. And if you
                    wait another <code>10</code> years, it will grow{' '}
                    <code>16</code> times the initial value. In case you are all
                    to exited, finding{' '}
                    <a href="https://en.wikipedia.org/wiki/Real_interest_rate">
                      real interest rate
                    </a>{' '}
                    of 7% might not be easy.
                  </div>}
              </Case>
            </div>
          </section>

          {/* <Case amount={10} rate={8} period={10} >
              {(props) => (
              <p>
              Its difficult to have an intuition about exponential growth. Ex, lets say you invest
              <DraggableInput step={1} range={{ min: 1, max: 10 }} />
              <Currency amount={100} changeAmount />, in a investment option, which
              guarantees you <code>7%</code> interest. How much would you get back
              after <code>10</code> years? (show answer here) What would you get back in <code>10</code> years if
              the interest rate is <code>10%</code>? I always have to open up excel
              or some such tool, to figure out the answer.
              </p>
              )}
              </Case> */}

          <section>
            <h3>Value of 1%</h3>
            <p>
              How much difference does a 1% increase in interest rate make? Here
              is a curve of doubling periods. Hover over the curve to see the
              doubling time for interest rate.
            </p>

            <div>
              <Chart
                xLabel="Interest rate"
                yLabel="Doubling period (years)"
                tooltipLabel="years"
                data={[
                  {
                    label: (x, y) => `${y} years, for ${x} interest rate`,
                    x: d3.range(0.5, 20, 0.1),
                    y: d3
                      .range(0.5, 20, 0.1)
                      .map(x => doublingPeriod({ rate: x / 100 }))
                  }
                ]}
              />
            </div>

            <p>
              Notice how <code>1%</code> makes a huge difference, when the
              interest rates are low. I guess this was the biggest surprise to
              me. Think about how it effects your investment. Try out different
              values of interest rate in the example below.{' '}
            </p>

            <Case rate={3}>
              {({ rate, doublingPeriod, onRateChange }) =>
                <Case rate={2}>
                  {({
                    rate: realRate,
                    doublingPeriod: realDoublingPeriod,
                    onRateChange: onRealRateChange
                  }) =>
                    <span>
                      If your investment is giving you{' '}
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
                      interest rate and your broker is taking{' '}
                      <code>
                        <NumSlider
                          percent
                          num={rate - realRate}
                          min={1}
                          max={3}
                          onChange={x => onRealRateChange(rate - x)}
                        />
                      </code>{' '}
                      from it, its essentially delaying about{' '}
                      {Math.round(realDoublingPeriod - doublingPeriod)} years
                      from your doubling period.{' '}
                    </span>}
                </Case>}
            </Case>

            <p>
              Lets say the market around you provides investments with interest
              rates mostly around 3%. With a slightly higher risk, you could
              find investments with <code>4%-5%</code> returns. What would you
              do? Think about how many years it saves in doubling. On the other
              hand, what if most investment options are around {' '}
              <code>15%-16%</code>
              , would you consider <code>17%-18%</code> interest rate
              investments with slightly higher risk?{' '}
            </p>
          </section>

          <section>
            <h2>Value of interest rate</h2>
            <p>
              The chart below show different interest rates returns. The higher
              the interest rate, the steaper the curve.
            </p>
            <TimeValue />
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
                      period. Lets compare{' '}
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
                      {smallDoublingPeriod && smallDoublingPeriod.toFixed(2)}
                      ) interest rates. Difference between their doubling period
                      is {(smallDoublingPeriod - doublingPeriod).toFixed(2)}
                      . In other words, for your money to grow by <code>
                        8
                      </code>{' '}
                      times (which is <code>3</code> doublings),{' '}
                      <code>{smallRate}%</code> investment would take{' '}
                      <code>
                        3*
                        {(smallDoublingPeriod - doublingPeriod).toFixed(2)}
                      </code>{' '}
                      or{' '}
                      <code>
                        {(3 * (smallDoublingPeriod - doublingPeriod)).toFixed(
                          2
                        )}
                      </code>{' '}
                      more years than <code>{rate}%</code>
                      .
                    </span>}
                </Case>}
            </Case>
          </section>
          <section>
            <h2>Value of time</h2>
            <p>
              Each of the curves below represents a time period (ex:{' '}
              <code>40</code>
              , <code>30</code>
              , <code>20</code> years). x axis is the interest rate, and y the
              multiple of the investment. Again, the longer you let your
              investment grow, the bigger the returns. Note how fast the curve
              grows for high interest rates and long periods. {' '}
            </p>
            <Chart
              xLabel="Interest rate"
              yLabel="Multiple"
              tooltipLabel="times"
              data={[
                {
                  label: (x, y) => `40 years: ${y} times with ${x} interest`,
                  x: d3.range(1, 16, 0.1),
                  y: d3
                    .range(1, 16, 0.1)
                    .map(x => fv({ rate: x / 100, period: 40 }))
                },
                {
                  label: (x, y) => `30 years: ${y} times with ${x} interest`,
                  x: d3.range(1, 16, 0.1),
                  y: d3
                    .range(1, 16, 0.1)
                    .map(x => fv({ rate: x / 100, period: 30 }))
                },
                {
                  label: (x, y) => `20 years: ${y} times with ${x} interest`,
                  x: d3.range(1, 16, 0.1),
                  y: d3
                    .range(1, 16, 0.1)
                    .map(x => fv({ rate: x / 100, period: 20 }))
                }
              ]}
            />
            <p>
              With interest rate of <code>12%</code>
              , after 40 years, your investment would have grown 100 times!
            </p>
          </section>
          <section>
            <div>
              <h2>Systematic investment</h2>
              <Chart
                xLabel="Period"
                yLabel="Multiple"
                tooltipLabel="times"
                data={[
                  {
                    label: (x, y) =>
                      `Single: 4% interest, ${x} years => A * ${y}`,
                    x: d3.range(1, 25, 0.1),
                    y: d3
                      .range(1, 25, 0.1)
                      .map(x => fv({ rate: 4 / 100, period: x }))
                  },
                  {
                    label: (x, y) => `SIP: 4% interest, ${x} years => A * ${y}`,
                    x: d3.range(1, 25, 0.1),
                    y: d3
                      .range(1, 25, 0.1)
                      .map(x => afv({ rate: 4 / 100, period: x }))
                  },
                  {
                    label: (x, y) => `SIP: 7% interest, ${x} years => A * ${y}`,
                    x: d3.range(1, 25, 0.1),
                    y: d3
                      .range(1, 25, 0.1)
                      .map(x => afv({ rate: 7 / 100, period: x }))
                  },
                  {
                    label: (x, y) =>
                      `Single: 7% interest, ${x} years => A * ${y}`,
                    x: d3.range(1, 25, 0.1),
                    y: d3
                      .range(1, 25, 0.1)
                      .map(x => fv({ rate: 7 / 100, period: x }))
                  }
                ]}
              />
            </div>
          </section>
        </section>

        <section>
          <a href="https://en.m.wikipedia.org/wiki/Time_value_of_money">
            Time value of money
          </a>
          .
        </section>
      </div>
    );
  }
}

export default PersonalFinance;
