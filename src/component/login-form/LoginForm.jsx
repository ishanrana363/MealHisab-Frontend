import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Importing eye icons
import { Link } from "react-router-dom";
import { loginApi } from "../../api-request/authApi";
import Swal from "sweetalert2";
import SpinnerLoader from "../loader/SpinnerLoader";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loader,setLoader] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const payload = {
      email,
      password,
    };

    console.log(email, password)

    if (!email) {
      toast.error("Please enter a valid email")
    } else if (!password) {
      toast.error("Please enter a valid password")
    } else {
      setLoader(true);
      const res = await loginApi(payload);
      setLoader(false);
      if (res) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "failure",
          title: "Login fail",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>MealHisab | Login</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
            />
          </div>

          {/* Password Field with Toggle */}
          <div className="relative">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? (
                <AiFillEyeInvisible className="w-5 h-5" />
              ) : (
                <AiFillEye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
          >
            Login
          </button>

          {/* Additional Links */}
          <div className="mt-4 text-center">
            <a href="/forgot-password" className="text-sm text-gray-600 hover:text-green-600">
              Forgot Password?
            </a>
            <p className="mt-2 text-sm text-gray-600">
              You have no account?{" "}
              <Link to="/registration" className="text-green-600 hover:underline">
                Please register.
              </Link>
            </p>
          </div>
        </form>
      </div>
      {
        loader && (
          <div>
            <SpinnerLoader></SpinnerLoader>
          </div>
        )
      }
    </div>
  );
};

export default LoginForm;
