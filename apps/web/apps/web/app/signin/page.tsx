"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Ensure correct import
import { useAuth } from "../../AuthContext";
import Link from "next/link";

export default function SignIn({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { setUser } = useAuth(); // State to store the backend response message
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/signin", { email, password });
      setResponseMessage(response.data.message); 
      localStorage.setItem("token", response.data.token); 
      localStorage.setItem("email", email); 
      setUser({ email }); 
      router.push("/home");

    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setResponseMessage(error.response.data?.message || "Something went wrong. Please try again.");
      } else if (error instanceof Error) {
        setResponseMessage(error.message);
      } else {
        setResponseMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="bg-dark">
     <Link href="/home">Back</Link>
<div className="flex flex-col justify-center items-center min-h-screen">
      <form
        onSubmit={handleSignin}
        className="flex flex-col items-center bg-white p-10 rounded-3xl shadow-md"
      >
        <div className="text-4xl font-bold m-10">Signin Page</div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-gray-900 m-5 bg-gray-50 px-8 py-5 border rounded-full focus:outline-none text-xl w-80"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-gray-900 m-5 bg-gray-50 px-8 py-5 border rounded-full focus:outline-none text-xl w-80"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 m-5 rounded-lg text-lg bg-accent text-dark"
        >
          Signin
        </button>
     <div>
   <Link href="/signup" className="hover:underline text-blue-500">Want to create Account? SignUp</Link> 
   </div>
      </form>
      {responseMessage && (
        <div className="mt-5 text-center bg-green-100 text-green-800 p-4 rounded-md w-96">
          {responseMessage}
        </div>
      )}
    </div>
    </div>
  );
}
