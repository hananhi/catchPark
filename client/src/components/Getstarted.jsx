import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Getstarted() {
  const navigate = useNavigate();

function goLogin(){

  navigate('/Login')
}


  return (
    <div  className ='relative w-400 h-612'>
      <img
        src='cargif.gif' 
        alt="Moving GIF"
        className='w-screen h-screen'
      
      />

      <h1 className='absolute left-1/2 top-[13%] -translate-x-1/2 -translate-y-1/2 text-[#007FFF] text-4xl font-bold' >CatchPark</h1>
      <button
       className='absolute top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2  text-white bg-[#007FFF] font-bold  cursor-pointer'
        style={{
          borderRadius:'10px',
          padding: '10px 20px',
          fontSize: '18px',
          border: 'none',
         
        }
      }
      onClick={goLogin}
      >
        Get started!
      </button>
    </div>
  )
}
