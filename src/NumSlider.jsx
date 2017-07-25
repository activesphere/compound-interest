import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import ClickOutside from 'react-click-outside';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

/* const createSliderWithTooltip = Slider.createSliderWithTooltip;*/
/* const Range = createSliderWithTooltip(Slider.Range);*/
const Handle = Slider.Handle;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class NumSlider extends React.Component {
  state = {
    showSlider: false
  };

  toggleSlider = () => {
    this.setState({ showSlider: !this.state.showSlider });
  };

  closeSlider = () => {
    this.setState({ showSlider: false });
  };

  render() {
    const { num, min, max, step, onChange } = this.props;

    return (
      <span style={{ cursor: 'pointer', color: 'brown' }}>
        <ClickOutside
          onClickOutside={this.closeSlider}
          style={{
            width: 100,
            display: this.state.showSlider ? 'inline-block' : 'none',
            position: 'absolute',
            marginLeft: -50,
            marginTop: -10
          }}
        >
          <Slider
            min={min}
            max={max}
            step={step || 1}
            defaultValue={num}
            handle={handle}
            onChange={onChange}
          />
        </ClickOutside>
        <span onClick={this.toggleSlider}>
          {num}
        </span>
      </span>
    );
  }
}

export default NumSlider;
