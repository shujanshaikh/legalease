"use client"

export default function SignUp(){
    return <div className="flex flex-col justify-center items-center">
       <div className="text-4xl m-10">Signin Page</div>
        <input 
        type="text" 
        placeholder="Username"
        className="text-gray-900 m-5 bg-white px-8 py-5 border rounded-full focus:outline-none text-xl"
        />
   <input type="password"
    placeholder="Password" 
    className="text-gray-900 m-5 bg-white px-8 py-5 border rounded-full focus:outline-none text-xl"
   />
<button className="px-4 py-2 m-5 rounded-lg text-lg bg-accent text-dark">Signin</button>
    </div>
}