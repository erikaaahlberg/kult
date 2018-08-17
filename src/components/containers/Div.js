import React from 'react';

const Div = (props) => {
    return(
      <div className = { props.class } id = { props.id }>
        { props.children }
      </div>
    )
}
  
export default Div;