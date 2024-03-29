import React , { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

     
    async function login( email , password,tokenMethod ){
        try {
      
          const response= await fetch('http://localhost:5000/auth/logIn',{
          method:'POST',
          body:JSON.stringify({
        email,
       password,
       tokenMethod
          }),
          headers:{
            "content-type":"application/json"
          }
          
        })
        if (!response.ok) {
          // Handle error responses (non-2xx status codes)
          console.error('Error:', response.statusText);
          return;
      }
      
      const data = await response.json();
      console.log('Response from server:', data);
      
      const token =data.token ;
      localStorage.setItem('token',token)
      console.log('token',token);

      
      
      // Do something with the data (if needed)
      } catch (error) {
      console.error('Fetch error:', error);
      }
      
      }


      function getUsers(endpoint){

        const token=localStorage.getItem('token')
        console.log(token);
        fetch(`http://localhost:5000/users/${endpoint}`,{
headers:{
    'authorization':`Bearer ${token}`
}
        })
        .then(res=>res.text())
        .then(res=>{
            console.log('res get users header ',res)
        })
      }

  return (
    <div className="w-screen h-screen flex justify-center items-center
    bg-gradient-to-br from-[#007FFF] to-[#bfc8db]">
        <form className=" bg-white rounded-xl drop-shadow-lg space-y-5  py-20 px-5 " action="">
            <h1 className="text-center text-3xl text-[#007FFF] font-bold">Welcome</h1>
            <div className="flex flex-col space-y-2">
                <label className=" font-light text-[#007FFF]" for="email">Email</label>
                <input className="w-96 px-3 py-2 rounded-md border border-slate-400" type="email" placeholder="Your Email"
                  value={email}  onChange={e=>setEmail(e.target.value)}  required/>
            </div>
            <div className="flex flex-col space-y-2">
                <label className=" font-light text-[#007FFF]" for="password">Password</label>
                <input className="w-96 px-3 py-2 rounded-md border border-slate-400" type="password"
                    placeholder="Your Password" name="password" id="password " value={password} onChange={e=>setPassword(e.target.value)}required/>
            </div>


            <button className="w-full px-10 py-2 bg-[#007FFF] text-white rounded-md
            hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in" type="submit" onClick={login}>
                Log  In
            </button>

            <p className="text-right"><a class="text-[#007FFF] text-sm font-light hover:underline"
                    href="/SignUp"> Don't have Accout? <span className='font-bold'>Regitser Now</span></a></p>
        </form>
    </div>

  )
}
