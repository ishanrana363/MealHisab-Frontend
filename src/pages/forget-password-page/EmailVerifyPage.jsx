import React, { useState } from 'react'
import { otpVerifyApi } from '../../api-request/forgetPasswordApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const EmailVerifyPage = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const otp = e.target.otp.value;
    const payload = {
      email,
      otp,
    }
    setLoader(true);
    let res = await otpVerifyApi(payload);
    setTimeout(() => {
      setLoader(false);
    }, 2000); 
    if(res){
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Verification Successful",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/forget-password");
      e.target.reset();
    }else{
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Verification Failed",
        showConfirmButton: false,
        timer: 1500
      })
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-700">Email and OTP Verification</h2>

          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* OTP Input Field */}
          <div>
            <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-600">
              OTP Code
            </label>
            <input
              type="number"
              id="otp"
              name="otp"
              placeholder="Enter OTP"
              maxLength="6"
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Verify Button with Loader */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center justify-center"
            disabled={loader}
          >
            {loader ? (
              <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              "Verify"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EmailVerifyPage
