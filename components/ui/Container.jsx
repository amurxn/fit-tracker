import React from 'react';

const Container = ({ children, id }) => {
  return (
    <div id={id} className="p-10 flex items-center">
      {children}
    </div>
  );
};

export default Container;