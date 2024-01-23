import React from 'react'

export default function Header() {
  return (
    <div className="bg-gray-100 p-[1%]  flex flex-row justify-between ">

    <div className='text-[#007FFF] font-bold mt-4'>CatchPark App</div>
    
    <div>
    <img
            src='https://assets.materialup.com/uploads/5cbe5836-469c-49f0-90df-09faf39e853b/preview.gif' 
            alt="Moving GIF"
            className='w-20 h-15 '
          
          />
    </div>
          </div>
  )
}
