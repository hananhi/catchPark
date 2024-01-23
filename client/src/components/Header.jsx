import React from 'react'

export default function Header() {
  return (
    <div className="bg-gray-100 p-[1%]  flex flex-row justify-between ">

    <div className='text-[#007FFF] font-bold mt-4'>CatchPark App</div>
    
    <div>
    <img
            src='preview.gif' 
            alt="Moving GIF"
            className='w-20 h-15 '
          
          />
    </div>
          </div>
  )
}
