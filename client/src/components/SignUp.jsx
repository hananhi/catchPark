import React from 'react'

import { useNavigate } from 'react-router-dom';


export default function SignUp() {
    const navigate = useNavigate();
    const [userName,setusername]=useState('');
  const [newemail,setnewemail]=useState('');
  const[newPassword,setnewpassword]=useState('')

    function returnback(event){
        const form = event.target.form;

  if (form.checkValidity()) {
    navigate('/Login')
  } else {
    // Prevent the form submission if it's not valid
    event.preventDefault();
    alert('Please fill in all required fields.');
  }

      
    }
  return (
    
      <div className="w-screen h-screen flex justify-center items-center
    bg-gradient-to-br from-[#007FFF] to-[#bfc8db]">
        <form className=" bg-white rounded-xl drop-shadow-lg space-y-5  py-20 px-5 " action="">
            <h1 className="text-center text-3xl text-[#007FFF] font-bold">Create New Account</h1>

            <div className="flex flex-col space-y-2">
                <label className=" font-light text-[#007FFF]" for="email">UserName</label>
                <input className="w-96 px-3 py-2 rounded-md border border-slate-400"  placeholder="Your Username" onChange={e=>setusername(e.target.value)}required/>
            </div>
            <div className="flex flex-col space-y-2">
                <label className=" font-light text-[#007FFF]" for="email">Email</label>
                <input className="w-96 px-3 py-2 rounded-md border border-slate-400" type="email" placeholder="Your Email"
                    name="email" id="email"  onChange={e=>setnewemail(e.target.value)}required/>
            </div>
            <div className="flex flex-col space-y-2">
                <label className=" font-light text-[#007FFF]" for="password">Password</label>
                <input className="w-96 px-3 py-2 rounded-md border border-slate-400" type="password"
                    placeholder="Your Password" onChange={e=>setnewpassword(e.target.value)} required/>
            </div>
  

            <button className="w-full px-10 py-2 bg-[#007FFF] text-white rounded-md " type="submit" onClick={(e)=>returnback(e)}>
                Sign Up
            </button>

        </form>
    </div>

    
  )
}
