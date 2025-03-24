"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/signup", { email, password });
      setResponseMessage(response.data.message);
      router.push("/signin");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data?.message || "Something went wrong. Please try again.");
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  }

  return (
<div className="bg-dark">
<Link href="/home">Back</Link>
    <div className="flex flex-col justify-center items-center min-h-screen bg-dark">
  
      <form
        onSubmit={handleSignup}
        className="flex flex-col items-center bg-white p-10 rounded-3xl shadow-md"
      >
        <div className="text-4xl font-bold m-10">Signup Page</div>
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
          Signup
        </button>
        <div>
        <Link href="/signin" className="hover:underline text-blue-500">Already Have an account? SignIn</Link>  
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
