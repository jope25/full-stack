import React from 'react';

const Input = ({ text, searchTerm, handler }) => {
  return (
    <div >
      {text}
      <input value={searchTerm} onChange={handler} />
    </div>
  )
}

export default Input
