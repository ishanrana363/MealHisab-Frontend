import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { changePasswordApi } from '../../api-request/forgetPasswordApi';
import { changeAlert } from '../../helper/changeAlert';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordPage = () => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const otp = e.target.otp.value;
    const password = e.target.password.value;
    const payload = {
      email,
      otp,
      password,
    };

    if (!email) {
      toast.error("Please enter a valid email");
      return;
    } else if (!otp) {
      toast.error("Please enter a valid OTP");
      return;
    } else if (!password) {
      toast.error("Please enter a valid password");
      return;
    }

    let resp = await changeAlert();
    if (resp.isConfirmed) {
      setLoader(true); // Show loader and disable button
      let res = await changePasswordApi(payload);
      setLoader(false); // Hide loader and enable button after response

      if (res) {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Password Changed Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
        e.target.reset();
      } else {
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: 'Failed to Change Password',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-4 md:p-8 space-y-3 md:space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="md:text-2xl font-semibold text-center text-gray-700">Change Password</h2>

          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="block text-[10px] md:text-[16px] mb-1 md:mb-2 font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full text-[10px] md:text-[16px] px-2 md:px-4 py-2 md:py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* OTP Input Field */}
          <div>
            <label htmlFor="otp" className="block text-[10px] md:text-[16px] mb-1 md:mb-2 font-medium text-gray-600">
              OTP Code
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter OTP"
              maxLength="6"
              className="w-full text-[10px] md:text-[16px] px-2 md:px-4 py-2 md:py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input Field with Icon Toggle */}
          <div>
            <label htmlFor="password" className="block text-[10px] md:text-[16px] mb-1 md:mb-2 font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full text-[10px] md:text-[16px] px-2 md:px-4 py-2 md:py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
              </button>
            </div>
          </div>

          {/* Submit Button with Loader */}
          <button
            type="submit"
            className={`w-full px-2 md:px-4 text-[10px] md:text-[16px] py-2 md:py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center justify-center ${loader ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loader}
          >
            {loader ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
