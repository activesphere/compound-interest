import cls from 'classnames';
import React from 'react';

import Chart from './Chart.jsx';
import * as d3 from 'd3';
import fv from './fv.js';
import doublingPeriod from './doublingPeriod.js';

import NumSlider from './NumSlider.jsx';
import Case from './Case.jsx';
import HoverNote from './HoverNote.jsx';
import TimeValue from './charts/TimeValue.jsx';
import Currency from './CurrentCurrency.jsx';

import MultipleExample from './examples/MultipleExample.jsx';
import DoublingExample from './examples/DoublingExample.jsx';
import DoublingContinuesExample from './examples/DoublingContinuesExample.jsx';
import ValueOf1PercExample from './examples/ValueOf1PercExample.jsx';
import ValueOfInterestExample from './examples/ValueOfInterestExample.jsx';
import SlopeExample from './examples/SlopeExample.jsx';
import Para from './Para.jsx';

class PersonalFinance extends React.Component {
  state = {
    mathsOk: true
  };

  toggleMaths = () => {
    this.setState({ mathsOk: !this.state.mathsOk });
  };

  render() {
    const mathsCls = { dn: !this.state.mathsOk };
    const noMathsCls = { dn: this.state.mathsOk };

    return (
      <div className="center measure-wide pv2 black-70 ph3 ph0-ns">
        <h1 className="f3">
          On Compound Interest
          <br />
          <div className="f5 black-50 p">
            How interest rates and time period of investment, effects return
          </div>
        </h1>
        <section>
          <p>When should you start investing?</p>
          <Para>
            Let say, you find an investment which gives <code>7%</code> annual
            interest rate, for 30 years
            <HoverNote>
              In real world, the interest rate would change. Also, inflation and
              taxes would change the real returns you get. But to understand
              compounding better, lets consider this simplification.
            </HoverNote>
            . If you put <Currency amount={1000} /> in the investment. How much
            money would you get back in 30 years? What if put{' '}
            <Currency amount={100000} />
            , instead of <Currency amount={1000} />
            ?
          </Para>

          <Para>
            Investments have risk associated with them. Should your risk
            appetite change based on the interest rates available to you? Lets
            say the safe investments available to you
            <HoverNote>
              In the same region/country, and around the same time.
            </HoverNote>{' '}
            are giving interest rates of <code>2%-3%</code>
            . Would you consider slightly risky investment options which give on
            average <code>1%</code> more interest rate? If safe investments are
            giving around <code>15%-16%</code> interest rates, would you still
            consider slightly risky investments which promise slightly better
            interest rates?
          </Para>
          <p>
            Questions like these are attempted better with an understanding of
            compound interest. Here we collect some ways to build that
            understanding.
          </p>
          <Para>
            <span className={cls(mathsCls)}>
              If you would like to avoid maths, click{' '}
              <a onClick={this.toggleMaths}>here</a> to see less of it.
              Although, I would suggest, to try.{' '}
            </span>
            <span className={cls(noMathsCls)}>
              If you would be ok with some maths, click{' '}
              <a onClick={this.toggleMaths}>here</a>.
            </span>
            You should still be able to make sense of the article. There are
            some interactive parts in the article. Numbers which show up like
            <Case rate={7}>
              {({ rate, onRateChange }) =>
                <code>
                  <NumSlider num={rate} onChange={onRateChange} />
                </code>}
            </Case>{' '}
            can be clicked. It opens up a slider to change the number. And
            hovering over charts show some details.
          </Para>
          <hr />
        </section>
        <Para>
          TL: DR;{' '}
          <p>
            Invest early and often, with best real interest rates you can get.
            Let compounding do the rest.
          </p>
          <ul>
            <li>Compounding gives better results with time. Invest early.</li>
            <li className={cls(noMathsCls)}>
              If the interest rates are same, you can split your money in
              multiple investments. The return would be the same as putting them
              in a single investment with that interest rate. Ex, two{' '}
              <Currency amount={100} /> investments, or a single investment of{' '}
              <Currency amount={200} />, both will give the same returns.
            </li>

            <li className={cls(mathsCls)}>
              Think of compounding as multiplication factor. Invest amount \(A\)
              and get back \(x*A\) after some time. Where \(x\) depends on time
              and interest rate. You can split the investment and the net effect
              is same (without consider risk etc). Ex: \(x*(A1 + A2 + A3)\).{' '}
            </li>
            <li>
              Keep the rule of 72 in mind: Divide <code>72</code> by interest
              rate, to get doubling time. Helps with estimating returns, in
              head. Ex, for <code>7%</code> interest rate, your amount will
              double every <code>10</code> years. No matter what that amount is.
            </li>
            <li>
              <code>1%</code> change in interest rate matters a lot for low
              interest rates.
            </li>
          </ul>
          <hr />
        </Para>
        <section>
          <div className={cls(noMathsCls)}>
            If you are new to the concept of investment and compound interest,
            think of investment as a way to grow your money. And compounding as
            the effect of investing back the extra money you get. Its a process
            where every year the interest earned in the investment, is invested
            back and earns you interest next time. With <code>7%</code>
            , interest rate compounded annually the table below shows the
            returns.
            <pre>
              <table
                className="collapse striped--near-white"
                style={{
                  margin: '0 auto',
                  fontSize: '0.8rem'
                }}
              >
                <tbody>
                  <tr>
                    {d3.range(1, 11, 1).map(y =>
                      <td className="pa2 ba b--light-gray" key={y}>
                        year {y}
                      </td>
                    )}
                  </tr>
                  <tr>
                    {d3.range(1, 11, 1).map(y =>
                      <td className="pa2 ba b--light-gray" key={y}>
                        <div>
                          {(100 * fv({ rate: 0.07, period: y - 1 })).toFixed(2)}
                          <br />
                          <span className="b">
                            +{' '}
                            {(100 * fv({ rate: 0.07, period: y }) -
                              100 * fv({ rate: 0.07, period: y - 1 })).toFixed(
                              2
                            )}
                          </span>
                        </div>
                      </td>
                    )}
                  </tr>
                  <tr>
                    {d3.range(1, 11, 1).map(y =>
                      <td className="pa2 ba b--light-gray" key={y}>
                        {(100 * fv({ rate: 0.07, period: y })).toFixed(2)}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </pre>
            If you didn't invest back the interest. Your{' '}
            <Currency amount={100} /> would have given returns of{' '}
            <Currency amount={100 + 100 * 0.07 * 10} /> (or{' '}
            <code>
              100 + <span className="b">100 * 0.07 * 10</span>
            </code>
            ). Compound interest is a crucial part of personal finance. It grows
            your money!{' '}
          </div>

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

          <Para>
            In this article we wont consider risk,{' '}
            <a href="https://en.wikipedia.org/wiki/Real_interest_rate">
              real interest rate
            </a>
            , taxes or other factors that might (and do) effect investments
            <HoverNote>
              Many of these factors, ex, taxes and inflation reduce the actual
              interest rate that you get
            </HoverNote>
            .
          </Para>

          <p>
            Throught the article, to simplify the arguments, we assume interest
            rates to be annual. And sometimes work with fractional years. These
            are approximations, but help with building intuition.
          </p>
          <p className={cls(mathsCls)}>
            Lets start the equation for compounding. If you invest amount \(P\)
            with an annualy compounded interest \(r\), in \(n\) years the total
            amount \(P'\) would be: {`$$P' = { P(1 + r)^n } $$`}{' '}
          </p>
        </section>

        <section>
          <section>
            <h2 className="f4">Multiple</h2>
            <Para>
              <p className={cls(mathsCls)}>
                Its difficult to gain understanding of the growth, with this
                equation. One thing to note though, is that the return \(P'\) is
                a multiple of initial investment \(P\). All the observations in
                the article depend on this property. In other words, we can
                write the equation as:
                {`$$P'/P = { (1 + r)^n } $$`}
                Which essentially means, for same interest rate and span of
                time,{' '}
                <span className="b">
                  investment grows the same way, irrespective of how much money
                  you invest initially
                </span>.{' '}
              </p>

              <p className={cls(noMathsCls)}>
                In terms of growh rate, it doesn't matter whether you invest{' '}
                <Currency amount={100} /> or <Currency amount={100000} />
                . They both grow in the same way. What matters is the interest
                rate. Ex, if the interest rate is <code>7%</code>
                , in the first year both of them would grow to <code>
                  1.07
                </code>{' '}
                times the initial value. In the second year, both of them would
                be approximately <code>1.14</code>
                . In the third year, both of them would be approximately{' '}
                <code>1.22</code> times the initial value.{' '}
                <span className="b">
                  So, for the same interest rate, the more money you put in, the
                  more returns you get.
                </span>
              </p>

              <MultipleExample rate={7} period={5} />

              <Para className={cls(noMathsCls)}>
                Another nice property is that there is not difference
                <HoverNote>
                  Given interest rate and duration is same.
                </HoverNote>{' '}
                between splitting the money versus putting it all in a single
                investment.
              </Para>

              <Para className={cls(mathsCls)}>
                Another nice property is that{' '}
                <HoverNote>Given everything else is same</HoverNote> you can
                split the money into multiple investments and get the same
                returns . Ex, you could replace \(P\) with \((P_1 + P_2 + ... +
                P_n)\)
                {`$$P' = (P_1 + P_2 + ... + P_n){ (1 + r)^n } $$`}
              </Para>

              <p>
                This helps with managing risks. Investments have risks
                associated with them. Some of them might fail (or give low
                returns). Splitting your investments (assuming the interest
                rates are similar) wouldn't change the returns (mathematically
                speaking), and allows for better risk management. {' '}
              </p>
            </Para>
          </section>

          <section>
            <h2 className="f4">
              Rule of <code>72</code>
            </h2>
            <Para>
              {`$$Approximate\\ doubling\\ period = { 72 \\over Interest\\ rate }$$`}
              This is a way to approximate the doubling time of investment.
              <DoublingExample />
              Again (I find it interesting and worth repeating), doubling period
              doesn't depend on how much money you put in.
            </Para>
          </section>
          <section>
            <h2 className="f4">Doubling continues</h2>
            <div>
              <p>
                Note that the Rule of <code>72</code> gives us a number to
                compare. But its only one doubling time. Every doubling time
                years, your investment doubles.{' '}
              </p>

              <DoublingContinuesExample />

              <p>
                How much time do you have? Lets say you are 35 now. You probably
                would earn till 65? Thats 30 years. Plan before its too late.
              </p>
            </div>
          </section>

          <section>
            <h2 className="f4">Value of 1%</h2>
            <p>
              What difference does a 1% change in interest rate make? Hover over
              the plot below to see the doubling time for interest rate.
            </p>

            <Chart
              xLabel="Interest rate"
              yLabel="Doubling period (years)"
              tooltipLabel="years"
              xLabelFormat=".0%"
              xHoverFormat=".2%"
              data={[
                {
                  hoverTxt: (x, y) => `${y} years, for ${x} interest rate`,
                  x: d3.range(0.5, 20, 0.1).map(x => x / 100),
                  y: d3
                    .range(0.5, 20, 0.1)
                    .map(x => doublingPeriod({ rate: x / 100 }))
                }
              ]}
            />

            <p>
              Notice how <code>1%</code> makes a big difference, when the
              interest rates are low. This was a big surprise to me. Think about
              how it effects your investment. Try out different values of
              interest rate in the example below.{' '}
            </p>

            <ValueOf1PercExample />

            <p>
              Lets say the market around you provides investments with interest
              rates mostly around <code>3%</code>
              . With a slightly higher risk, you could find investments with{' '}
              <code>4%-5%</code> returns. What would you do? Think about how
              many years it saves in doubling. On the other hand, what if most
              investment options are around <code>15%-16%</code>
              , would you consider <code>17%-18%</code> interest rate
              investments with slightly higher risk?{' '}
            </p>
          </section>

          <section>
            <h2 className="f4">Value of interest rate</h2>
            <p>
              The chart below show return curves for different interest rates.
              The higher the interest rate, the steaper the curve.
            </p>
            <TimeValue />

            <ValueOfInterestExample />
          </section>
          <section>
            <h2 className="f4">Value of time</h2>
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
              withRightLabel
              xLabelFormat=".0%"
              xHoverFormat=".2%"
              data={[
                {
                  label: '40 years',
                  hoverTxt: (x, y) => `40 years: ${y} times with ${x} interest`,
                  x: d3.range(1, 16, 0.1).map(x => x / 100),
                  y: d3
                    .range(1, 16, 0.1)
                    .map(x => fv({ rate: x / 100, period: 40 }))
                },
                {
                  label: '30 years',
                  hoverTxt: (x, y) => `30 years: ${y} times with ${x} interest`,
                  x: d3.range(1, 16, 0.1).map(x => x / 100),
                  y: d3
                    .range(1, 16, 0.1)
                    .map(x => fv({ rate: x / 100, period: 30 }))
                },
                {
                  label: '20 years',
                  hoverTxt: (x, y) => `20 years: ${y} times with ${x} interest`,
                  x: d3.range(1, 16, 0.1).map(x => x / 100),
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
          <Para className={cls(mathsCls)}>
            <h2 className="f4">Value of maths?</h2>
            <p>
              Much of what we figured out, is just maths and looking at curves.
              Lets play around with it a little more.{' '}
            </p>
            <section>
              <h3 className="f5">Where does 72 come from?</h3>
              <Para>
                We will attempt a close enough answer. Lets look at our equation
                again.
                {`$$P'/P = { (1 + r)^n } $$`}
                Doubling means \(P' = 2*P\), or \(P'/P = 2\). In other we need
                to solve for:
                {`$$2 = { (1 + r)^n } $$`}
                Taking natural log on both sides.
                {`$$ln(2) = { n * ln(1 + r) } $$`}
                Or
                {`$$n = { ln(2) \\over ln(1 + r) } $$`}
                Now here comes a cute little trick. Turns out, for small values
                of \(r\), \(ln(1 + r)\) is approximately \(r\). Ex, \(ln(1.01)\)
                its <code>0.01</code>
                , for \(ln(1.2)\) its <code>0.18</code>
                , approximately. So, for most pratical interest rates, we could
                just use:
                {`$$n = { ln(2) \\over r } $$`}
                \(ln(2)\) turns out to be 69, so doubling time could be equated
                to (approximately)
                {`$$n = { 69 \\over r } $$`}
                But we have been using <code>72</code>
                ! Wiki explains the reasons behind choosing <code>
                  72
                </code> (or <code>70</code> or <code>69</code>
                ).
              </Para>
            </section>
            <section>
              <h3 className="f5">Slopes</h3>
              <Para>
                Slopes of curve is one way of figuring out how fast change is
                happening at a cetain point. Lets again start with the compound
                interest equation, and lets call it \(FVM\) (Future Value
                Multiple). {`$$FVM = { (1 + r)^n } $$`}
                Derivative of \(FVM\):
                {`$$ \\frac{dFVM}{dn} = { \\frac{(1 + r)^n}{dn} } $$`}
                which is:
                {`$$ { ln(1 + r)(1 + r)^n } $$`}
                We figured earlier that for small values of r, \(ln(1+r)\) could
                be replaced with \(r\). So, we could write the above equations
                as: {`$$ { r(1 + r)^n } $$`}
                Now, lets consider what this means.
                <SlopeExample />
              </Para>
            </section>
          </Para>
        </section>

        <section>
          <h2 className="f4">What now?</h2>
          <p>Probably plan your finances?</p>

          <p>
            There are many factors to consider for personal finance and
            investment. Mostly they come down to risk and return (which includes
            interest rate, taxes, management fees, entry and exit fees etc).
            Personal finance is a big topic. You cold probably start by reading
            discussions at{' '}
            <a
              className="link dim"
              href="https://www.reddit.com/r/personalfinance/"
            >
              Personalfinance subreddit
            </a>.
          </p>

          <p>
            If you are in Indian context, you could start with{' '}
            <a
              className="link dim"
              href="https://capitalmind.in/wp-content/uploads/downloads/2017/06/How-much-is-enough-Deepak-Shenoy-HBL-BLink.pdf"
            >
              How much is enough{' '}
            </a>
            by Deepak Shenoy. Some articles at{' '}
            <a className="link dim" href="https://capitalmind.in">
              capitalmind.in
            </a>{' '}
            might also be useful.
          </p>
          <p>
            Also, its interesting to note that throught the article, all we did
            was to look at implications of the equation \(P' = P(1 + r)^n\).{' '}
          </p>
        </section>

        <section id="references">
          <h2 className="f4">To learn more</h2>
          <ul className="list ph0">
            <li>
              <a
                className="link dim"
                href="https://en.m.wikipedia.org/wiki/Time_value_of_money"
              >
                Time value of money
              </a>
            </li>
            <li>
              <a
                className="link dim"
                href="https://en.wikipedia.org/wiki/Rule_of_72"
              >
                Rule of 72
              </a>
            </li>
            <li>
              <a
                className="link dim"
                href="https://www.youtube.com/watch?v=O133ppiVnWY"
              >
                Exponential Growth Arithmetic, Population and Energy
              </a>
              <span className="gray"> talk by Al Bartlett</span>
            </li>
            <li>
              <div>
                <a
                  className="link dim"
                  href="https://www.amazon.in/Functions-Graphs-Dover-Books-Mathematics-ebook/dp/B00BLRDHC4"
                >
                  Functions and Graphs{' '}
                </a>
                <span className="gray">
                  by I. M. Gelfand, E. G. Glagoleva, E. E. Shnol
                </span>
              </div>
              <div className="pl2">
                A nice book on properties of functions and graphing them.
              </div>
            </li>
            <li>
              <a className="link dim" href="https://www.desmos.com/">
                Desmos - A tool to chart equations.
              </a>
              <div className="pl2">
                If you are on macos, Grapher.app is also good.
              </div>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default PersonalFinance;
