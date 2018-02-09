import React from 'react';

const Input = ({ text, value, handler }) => {
  return (
    <div >
      {text}
      <input value={value} onChange={handler} />
    </div>
  )
}

export default Input
