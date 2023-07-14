import React from 'react';

const Button = ({ onClick, children, color }) => {

  let bgcolor = 'bg-white';
  let textColor = 'text-black';

  if(color == 'red'){
    bgcolor = 'bg-red'
    textColor = 'text-white'
  }

  return (
    <button className={`${bgcolor} ${textColor} py-3 px-4 rounded-full font-medium`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;