import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';

const HtmlHoverTip = props => {
  return (
    <div className="tooltip">
      <span style={{ fontSize: 14 }}>
        &#9675; {props.text}
      </span>
    </div>
  );
};

let id = 1;

const toInt = n => parseInt(n, 10);

/* https://brendansudol.com/writing/responsive-d3 */
const responsivefy = (svg, id) => {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
    width = toInt(svg.style('width')),
    height = toInt(svg.style('height')),
    aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('perserveAspectRatio', 'xMinYMid')
    .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on(`resize.${id}`, resize);

  // get width of container and resize svg to fit it
  function resize() {
    var targetWidth = toInt(container.style('width'));
    svg.attr('width', targetWidth);
    svg.attr('height', Math.round(targetWidth / aspect));
  }
};

function textSize(text) {
  if (!d3) return;
  var container = d3.select('body').append('svg');
  container.append('text').attr('x', -99999).attr('y', -99999).text(text);
  var size = container.node().getBBox();
  container.remove();
  return { width: size.width, height: size.height };
}

class Chart extends Component {
  state = {
    width: 600,
    height: 300,
    logScale: false
  };

  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
    this.id = id++;
  }

  componentDidMount() {
    this.createChart();
  }

  createChart() {
    const lineColor = '#71a0ae';
    var foWidth = 300;
    var xoffset = 50,
      yoffset = 20;
    var tip = { w: 3 / 4 * xoffset, h: yoffset };

    const {
      data,
      yLabel,
      xLabel,
      xLabelFormat = '.2',
      tooltipLabel,
      logScale,
      withRightLabel
    } = this.props;

    const lineLabelLns = data.map(d => d.label).map(textSize).map(s => s.width);

    const rightLabelWidth = withRightLabel ? d3.max(lineLabelLns) : 0;
    const margin = {
      top: 20,
      right: 20 + rightLabelWidth,
      bottom: 40,
      left: 40
    };
    const width = this.state.width - margin.left - margin.right;
    const height = this.state.height - margin.top - margin.bottom;

    const maxYData = d3.max(data.map(d => d3.max(d.y)));
    const extentXData = d3.extent([].concat(...data.map(d => d.x)));

    const yScale = (logScale ? d3.scaleLog() : d3.scaleLinear())
      .domain([0.1, maxYData + 5])
      .range([height, 0]);

    const xScale = d3.scaleLinear().domain(extentXData).range([0, width]);

    const line = d3
      .line()
      .curve(d3.curveBasis)
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]));

    const self = this;
    function zoomed() {
      g.selectAll('.chart').attr('transform', d3.event.transform);
      g.selectAll('.line').style('stroke-width', 1 / d3.event.transform.k);

      if (self.mouseIn) {
        g.selectAll('.mouse-per-line').attr('transform', function(d, i) {
          /* https://github.com/d3/d3/issues/2889 */
          const curr = d3
            .select(this)
            .style('transform')
            .slice(7, -1)
            .split(',');
          const cx = parseFloat(curr[4]);

          const transform = d3.zoomTransform(g.node());
          const x0 = transform.rescaleX(xScale).invert(cx);

          const bisect = d3.bisector(d => d.data).left;
          const idx = bisect(d.data, x0);

          const y = d.data[idx] && d.data[idx][1];

          d3
            .select(this)
            .select('text')
            .text(`${y && y.toFixed(2)} ${tooltipLabel}`);

          return 'translate(' + cx + ',' + transform.rescaleY(yScale)(y) + ')';
        });
      }

      gx.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
      gy.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));
    }

    function zoomEnd() {}

    var zoom = d3
      .zoom()
      .scaleExtent([1, 15])
      .extent([[0, 0], [width, height]])
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', zoomed)
      .on('end', zoomEnd);

    const svg = d3
      .select(this.node)
      .attr('id', `chart-${this.id}`)
      .call(responsivefy, this.id);

    let g = svg.selectAll('g.content').data([{}]);

    g = g
      .enter()
      .append('g')
      .classed('content', true)
      .merge(g)
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    g
      .append('defs')
      .append('clipPath')
      .attr('id', `clip-${this.id}`)
      .append('rect')
      .attr('fill', 'brown')
      .attr('stroke', 'brown')
      .attr('width', width + rightLabelWidth)
      .attr('height', height);
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(10)
      .tickFormat(d3.format(xLabelFormat));
    const yAxis = d3.axisLeft(yScale).ticks(5);

    let gx = g.selectAll('g.xaxis').data([{}]);

    gx = gx
      .enter()
      .append('g')
      .classed('axis xaxis', true)
      .merge(gx)
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        'translate(10,' +
          (height + margin.top + margin.bottom) / 2 +
          ') rotate(-90)'
      )
      .attr('font-size', 15)
      .attr('letter-spacing', '.1rem')
      .attr('stroke', '#657B83')
      .text(yLabel);

    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        'translate(' +
          (width + margin.left + margin.right) / 2 +
          ',' +
          (height + margin.top + margin.bottom - 4) +
          ')'
      )
      .attr('font-size', 15)
      .attr('letter-spacing', '.1rem')
      .attr('stroke', '#657B83')
      .text(xLabel);

    let gy = g.selectAll('g.yaxis').data([{}]);

    gy = gy
      .enter()
      .append('g')
      .classed('axis yaxis', true)
      .merge(gy)
      .call(yAxis);

    let clipped = g.selectAll('.clipped').data([{}]);

    clipped = clipped
      .enter()
      .append('g')
      .classed('clipped', true)
      .attr('clip-path', `url(#clip-${this.id})`)
      .merge(clipped);

    let chart = clipped.selectAll('g.chart').data([{}]);

    chart.exit().remove();
    chart = chart.enter().append('g').classed('chart', true).merge(chart);

    const lineData = data.map(d => {
      return {
        data: d3.zip(d.x, d.y)
      };
    });
    let path = chart.selectAll('path.line').data(lineData, (d, i) => i);

    path.exit().remove();

    path = path.enter();

    path
      .append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.data))
      .attr('stroke-width', 1)
      .merge(path)
      .attr('fill', 'none')
      .attr('stroke', lineColor);

    path
      .append('text')
      .datum(d => ({
        value: d.data[d.data.length - 1]
      }))
      .attr(
        'transform',
        d => 'translate(' + xScale(d.value[0]) + ',' + yScale(d.value[1]) + ')'
      )
      .attr('x', 3)
      .attr('dy', '.5em');

    g.call(zoom);

    let overlay = g.selectAll('g.overlay').data([{}]);

    overlay = overlay
      .enter()
      .append('g')
      .attr('class', 'overlay')
      .attr('id', 'overlay')
      .merge(overlay);

    overlay
      .append('path') // this is the black vertical line to follow mouse
      .attr('class', 'mouse-line')
      .style('stroke', 'black')
      .style('stroke-width', '1px')
      .style('opacity', '0');

    let mpl = overlay.selectAll('.mouse-per-line').data(
      data.map(d => ({
        data: d3.zip(d.x, d.y),
        tooltipLabelFn: d.hoverTxt,
        label: d.label
      }))
    );

    mpl = mpl.enter().append('g').classed('mouse-per-line', true).merge(mpl);

    function setAttributes(elem, obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          elem.setAttribute(prop, obj[prop]);
        }
      }
    }

    function mousemove() {
      const foreign = svg.selectAll('foreignObject')._groups[0];
      const mouse = d3.mouse(this);
      const transform = d3.zoomTransform(g.node());
      const x0 = transform.rescaleX(xScale).invert(mouse[0]);
      g.select('.mouse-line').attr('d', function() {
        var d = 'M' + mouse[0] + ',' + height;
        d += ' ' + mouse[0] + ',' + 0;
        return d;
      });

      g.selectAll('.mouse-per-line').each(function(d, i) {
        const bisect = d3.bisector(d => d[0]).left;
        const idx = bisect(d.data, x0);
        const y = d.data[idx] && d.data[idx][1];
        let labelText = '';
        let x1 = x0 && d3.format(xLabelFormat)(x0);
        let y1 = y && y.toFixed(2);
        if (d.tooltipLabelFn && x0 && y) {
          labelText = d.tooltipLabelFn(
            x0 && d3.format(xLabelFormat)(x0),
            y.toFixed(2)
          );
        }

        ReactDOM.render(<HtmlHoverTip text={labelText} />, foreign[i]);
      });
    }

    overlay
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseover', () => {
        g.selectAll('.mouse-per-line').each(function(d, i) {
          svg
            .append('foreignObject')
            .attr('x', xoffset)
            .attr('y', i * yoffset)
            .attr('width', foWidth)
            .attr('class', 'svg-tooltip');
        });
        this.mouseIn = true;
        g.select('.mouse-line').style('opacity', '1');
      })
      .on('mouseout', () => {
        this.mouseIn = false;
        svg.selectAll('foreignObject').remove();
        g.select('.mouse-line').style('opacity', '0');
      })
      .on('mousemove', mousemove);
  }

  render() {
    return (
      <svg
        ref={node => {
          this.node = node;
        }}
        width={this.state.width}
        height={this.state.height}
      />
    );
  }
}

export default Chart;
