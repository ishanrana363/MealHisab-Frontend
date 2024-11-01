import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { registrationApi } from "../../api-request/authApi";
import { uploadImg } from './../../upload-img/UploadImg';
import { useState } from "react";
import SpinnerLoader from "../loader/SpinnerLoader";

const RegistrationForm = () => {
    const [loader, setLoader] = useState(false);
    const submitForm = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const img = e.target.img.files[0];
        const email = e.target.email.value;
        const password = e.target.password.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;

        let imgUrl = '';

        if (!img?.name) {
            imgUrl = "";
        }
        imgUrl = await uploadImg(img)



        const payload = {
            username,
            img: imgUrl,
            email,
            password,
            phone,
            address
        };

        if (!username) {
            toast.error("Please enter a username");
        } else if (!password) {
            toast.error("Please enter a password");
        } else if (!phone) {
            toast.error("Please enter a phone number");
        } else if (!address) {
            toast.error("Please enter an address");
        } else if (!img) {
            toast.error("Please select an image");
        } else {
            setLoader(true);
            let res = await registrationApi(payload);
            setLoader(false);
            if (res) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Account create successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }else{
                toast.error("User email already exists");
            }
        }
        e.target.reset();
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form
                    onSubmit={submitForm}
                    className="w-full max-w-xl p-8 space-y-6 bg-white rounded-lg shadow-lg"
                >
                    <h2 className="text-2xl font-semibold text-center text-gray-800">Register</h2>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Username Field */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                            />
                        </div>

                        {/* Image Upload Field */}
                        <div>
                            <label
                                htmlFor="img"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Profile Image
                            </label>
                            <input
                                type="file"
                                id="img"
                                name="img"
                                className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
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

                        {/* Phone Field */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                        />
                    </div>

                    {/* Address Field */}
                    <div>
                        <label
                            htmlFor="address"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            placeholder="Enter your address"
                            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                            rows="3"
                        />
                    </div>

                    {/* Submit Button */}
                    <button disabled = {loader}
                        type="submit"
                        className="w-full py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
                    >
                        Register
                    </button>
                </form>
            </div>
            {
                loader && (
                    <div>
                        <SpinnerLoader></SpinnerLoader>
                    </div>
                )
            }
        </>
    );
};

export default RegistrationForm;
