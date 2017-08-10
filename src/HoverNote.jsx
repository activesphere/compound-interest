import React from 'react';

import './HoverNote.css';

let id = 0;

class HoverNote extends React.Component {
  state = {
    isHovering: false
  };

  id = id++;

  onMouseEnter = () => {
    this.setState({ isHovering: true });
  };

  onMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  render() {
    const { children } = this.props;

    return (
      <span>
        <sup>
          <a
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            style={{ fontSize: '0.8rem' }}
          >
            [{this.id}]
          </a>
        </sup>
        <div
          className="absolute mw5 f5"
          style={{
            display: this.state.isHovering ? 'inline-block' : 'none',
            zIndex: 99
          }}
        >
          <div
            className="shadow-2 ba b--black-30 relative bg-white pa3 HoverNote"
            style={{
              left: '-1em',
              top: '1em',
              marginTop: '.4em'
            }}
          >
            {children}
          </div>
        </div>
      </span>
    );
  }
}

export default HoverNote;
