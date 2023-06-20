import React from 'react'

export default function Incrementador({quantity,increment,decrement}) {

  return (
    <div className="flex  mb-4 h-12 w-1/4 justify-between items-center p-4 border rounded-md ">
      <p  className='cursor-pointer select-none' onClick={decrement}>-</p>
      <input className='w-6 text-lg text-center' type="number" defaultValue={quantity} />
      <p className='cursor-pointer select-none' onClick={increment}>+</p>
    </div>
  );
}