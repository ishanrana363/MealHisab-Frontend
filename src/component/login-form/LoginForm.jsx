import React, { useState } from 'react';
import { createAlert } from '../../helper/createAlert';
import { loginApi } from '../../api-request/authApi';
import Swal from 'sweetalert2';
import SpinnerLoader from '../loader/SpinnerLoader';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const LoginForm = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const adminLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    const payload = { email: email, password: password };
    const resp = await createAlert();

    if (resp.isConfirmed) {
      setLoader(true);
      const res = await loginApi(payload);
      setLoader(false);
      if (res) {
        window.location.href = '/dashboard';
        Swal.fire({ position: 'top-center', icon: 'success', title: 'Login successfully', showConfirmButton: false, timer: 1500 });
      } else {
        toast.error("Login failed")
      }
    }
  };

  const userLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    const payload = { email: email, password: password };
    const resp = await createAlert();

    if (resp.isConfirmed) {
      setLoader(true);
      const res = await loginApi(payload);
      setLoader(false);
      if (res) {
        window.location.href = '/user-dashboard';
        Swal.fire({ position: 'top-center', icon: 'success', title: 'Login successfully', showConfirmButton: false, timer: 1500 });
      } else {
        toast.error("Login failed")
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setIsAdmin(false)}
            className={`px-4 py-2 text-white rounded-md ${!isAdmin ? 'bg-green-700' : 'bg-blue-400'}`}
          >
            User Login
          </button>
          <button
            onClick={() => setIsAdmin(true)}
            className={`px-4 py-2 text-white rounded-md ${isAdmin ? 'bg-green-700' : 'bg-blue-400'}`}
          >
            Admin Login
          </button>
        </div>

        {isAdmin ? (
          <div>
            <h2 className="text-2xl text-center mb-4">Admin Login</h2>
            <form onSubmit={adminLogin}>
              <div className="mb-4">
                <label htmlFor="admin-email" className="block text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4 relative">
                <label htmlFor="user-password" className="block text-sm">Password</label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="user-password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 mt-[12px] transform -translate-y-1/2 text-gray-600 focus:outline-none"
                >
                  {isPasswordVisible ? (
                    < FaEye className="h-5 w-5" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md"
                disabled={loader}
              >
                {loader ? "Admin login..." : "Admin Login"}
              </button>
            </form>
            <Link className={`text-center block my-3 hover:underline `} to={"/send-email"}>Forget Password</Link>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl text-center mb-4">User Login</h2>
            <form onSubmit={userLogin}>
              <div className="mb-4">
                <label htmlFor="user-email" className="block text-sm">Email</label>
                <input
                  type="email"
                  id="user-email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4 relative">
                <label htmlFor="user-password" className="block text-sm">Password</label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="user-password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 mt-[12px] transform -translate-y-1/2 text-gray-600 focus:outline-none"
                >
                  {isPasswordVisible ? (
                    < FaEye className="h-5 w-5" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md"
                disabled={loader}
              >
                {loader ? "login..." : "Login" }
              </button>
            </form>
          </div>
        )}
      </div>
      {loader && (
        <div>
          <SpinnerLoader />
        </div>
      )}
    </div>
  );
};

export default LoginForm;