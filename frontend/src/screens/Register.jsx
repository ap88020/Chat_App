import React, { useState , useContext } from 'react'
import { Link , useNavigate} from "react-router-dom";
import axios from '../config/axios';
import { UserContext } from '../context/user.context';
export const Register = () => {
    const [email,setEmail] = useState(''); 
    const [password,setPassword] = useState('');
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();
    function submitHandler (e){
        e.preventDefault()
        axios.post('/users/register',{
            email,
            password,
        }).then((res) => {
            console.log(res.data);
            localStorage.setItem('token',res.data.token);
            setUser(res.data.user);
            navigate('/');
        }).catch((err) => {
            console.log(err);
        })
    }
  return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="bg-gray-300 p-8 rounded-2xl shadow-xl w-full max-w-sm ">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Register
            </h1>
            <form onSubmit={submitHandler}>
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
                  onChange={(e) => setPassword(e.target.value)}
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
              all ready have account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
  )
}
