import React from 'react';

const Wrapper = (props) => {
    return (
      <div className = { props.class } id = { props.id }>
        { props.children }
      </div>
    );
}
  
export default Wrapper;