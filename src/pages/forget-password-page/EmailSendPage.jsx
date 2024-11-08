import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { sendEmailApi } from '../../api-request/forgetPasswordApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SpinnerLoader from '../../component/loader/SpinnerLoader';

const EmailSendPage = () => {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        let payload = { email };

        if (!email) {
            toast.error('Please enter email');
            return;
        } else {
            setLoader(true);
            let res = await sendEmailApi(payload);
            setLoader(false);

            if (res) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Email sent successfully',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    allowOutsideClick: false,
                });
                
                navigate("/email-verify");
                e.target.reset();
            } else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Failed to send email',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    allowOutsideClick: false,
                });
                e.target.reset();

                if (res.error === 'EMAIL_NOT_FOUND') {
                    toast.error('Email not found in the system');
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'Email not found in the system',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        allowOutsideClick: false,
                    });
                }
            }
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
                    <h2 className="text-2xl font-semibold text-center text-gray-700">Send Email</h2>

                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center justify-center"
                        disabled={loader}
                    >
                        {loader ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
            {loader && (
                <SpinnerLoader />
            )}
        </div>
    );
};

export default EmailSendPage;
