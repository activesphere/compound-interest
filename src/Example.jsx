import React from 'react';

const Example = ({ children, ...props }) => {
  return (
    <div className="bg-light-gray mv3 ph2 pv2" {...props}>
      {children}
    </div>
  );
};

export default Example;
