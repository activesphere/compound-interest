import React from 'react';

const Para = ({ children, ...props }) => {
  return (
    <div className="mv3" {...props}>
      {children}
    </div>
  );
};

export default Para;
