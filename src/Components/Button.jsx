import React from 'react';

import { useDispatch } from 'react-redux';
import { setIsClicked } from '../features/theme/themeSlice'; 

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, buttontype =  'default' }) => {

  const dispatch = useDispatch();

   // Handle button click
   const handleClick = () => {
    dispatch(setIsClicked({ [buttonType]: true }));

  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;