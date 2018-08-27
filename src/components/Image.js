import React from 'react';

export default function Image({src, className, alt, handleChange}) {
  return (
    <img src={ src } className={ className } alt={ alt } onClick={ handleChange }/>
  );
}