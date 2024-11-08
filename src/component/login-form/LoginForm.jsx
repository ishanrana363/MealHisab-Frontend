import React, { useState } from 'react';
import { createAlert } from '../../helper/createAlert';
import { loginApi } from '../../api-request/authApi';
import Swal from 'sweetalert2';
import SpinnerLoader from '../loader/SpinnerLoader';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  // State to determine if the form is for admin login or user login
  const [isAdmin, setIsAdmin] = useState(false);
  // State for showing a loading spinner while waiting for login response
  const [loader, setLoader] = useState(false);
  // State to toggle the visibility of the password field
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to toggle password visibility icon (eye/eye-slash)
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Admin login function
  const adminLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const payload = { email, password };

    // Check if email and password are provided
    if (!email) {
      toast.error("Email is required");
      return;
    } else if (!password) {
      toast.error("Password is required");
      return;
    }

    // Show confirmation alert before proceeding with login
    const resp = await createAlert();
    if (resp.isConfirmed) {
      setLoader(true); // Show loading spinner
      const res = await loginApi(payload); // Call API for admin login
      setLoader(false); // Hide loading spinner after response

      if (res) {
        window.location.href = '/dashboard'; // Redirect to dashboard on successful login
        Swal.fire({ position: 'top-center', icon: 'success', title: 'Login successfully', showConfirmButton: false, timer: 1500 });
      } else {
        toast.error("Login failed");
      }
    }
  };

  // User login function
  const userLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const payload = { email, password };

    // Check if email and password are provided
    if (!email) {
      toast.error("Email is required");
      return;
    } else if (!password) {
      toast.error("Password is required");
      return;
    }

    // Show confirmation alert before proceeding with login
    const resp = await createAlert();
    if (resp.isConfirmed) {
      setLoader(true); // Show loading spinner
      const res = await loginApi(payload); // Call API for user login
      setLoader(false); // Hide loading spinner after response

      if (res) {
        window.location.href = '/user-dashboard'; // Redirect to user dashboard on successful login
        Swal.fire({ position: 'top-center', icon: 'success', title: 'Login successfully', showConfirmButton: false, timer: 1500 });
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">

        {/* Toggle between User Login and Admin Login */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setIsAdmin(false)} // Switch to user login
            className={`px-4 py-2 text-white rounded-md ${!isAdmin ? 'bg-green-700' : 'bg-blue-400'}`}
          >
            User Login
          </button>
          <button
            onClick={() => setIsAdmin(true)} // Switch to admin login
            className={`px-4 py-2 text-white rounded-md ${isAdmin ? 'bg-green-700' : 'bg-blue-400'}`}
          >
            Admin Login
          </button>
        </div>

        {/* Conditional Rendering for Admin and User Login Forms */}
        {isAdmin ? (
          // Admin Login Form
          <div>
            <h2 className="text-2xl text-center mb-4">Admin Login</h2>
            <form onSubmit={adminLogin}>
              {/* Admin Email Input */}
              <div className="mb-4">
                <label htmlFor="admin-email" className="block text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Admin Password Input with Toggle Visibility */}
              <div className="mb-4 relative">
                <label htmlFor="admin-password" className="block text-sm">Password</label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="admin-password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 mt-[12px] transform -translate-y-1/2 text-gray-600 focus:outline-none"
                >
                  {isPasswordVisible ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
                </button>
              </div>

              {/* Admin Login Button */}
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md"
                disabled={loader}
              >
                {loader ? "Admin login..." : "Admin Login"}
              </button>
            </form>

            {/* Forgot Password Link for Admin */}
            <Link className="text-center block my-3 hover:underline" to={"/send-email"}>Forget Password</Link>
          </div>
        ) : (
          // User Login Form
          <div>
            <h2 className="text-2xl text-center mb-4">User Login</h2>
            <form onSubmit={userLogin}>
              {/* User Email Input */}
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

              {/* User Password Input with Toggle Visibility */}
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
                  {isPasswordVisible ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
                </button>
              </div>

              {/* User Login Button */}
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md"
                disabled={loader}
              >
                {loader ? "Login..." : "Login"}
              </button>
              <Link className="text-center block my-3 hover:underline" to={"/send-email"}>Forget Password</Link>
            </form>
          </div>
        )}
      </div>

      {/* Show loading spinner if loader is true */}
      {loader && (
        <div>
          <SpinnerLoader />
        </div>
      )}
    </div>
  );
};

export default LoginForm;
