import React, { useState } from 'react'
import { Link , useNavigate } from "react-router-dom";
import axios from '../config/axios.js';

export const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPasswors] = useState('');
    const navigate = useNavigate();

    function submitHandler (e){
        e.preventDefault()
        axios.post('/users/login',{
            email,
            password,
        }).then((res) => {
            console.log(res.data);
            navigate('/');
        }).catch((err) => {
            console.log(err.response.data);
        })
    }

  return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="bg-gray-300 p-8 rounded-2xl shadow-xl w-full max-w-sm">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Login
            </h1>
            <form onSubmit={submitHandler} >
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  onChange={(e) => setPasswors(e.target.value)}
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-center mt-4 text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
  )
}
