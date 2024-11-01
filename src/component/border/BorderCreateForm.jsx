import { useState } from "react";
import { uploadImg } from "../../upload-img/UploadImg";
import borderStore from "../../api-request/borderApi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import SpinnerLoader from "../loader/SpinnerLoader";

const BorderCreateForm = () => {
    const { borderCreateApi } = borderStore()
    const [loader, setLoader] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const father_name = e.target.father_name.value;
        const mother_name = e.target.mother_name.value;
        const dob = e.target.dob.value;
        const father_phone_number = e.target.father_phone_number.value;
        const institute_name = e.target.institute_name.value;
        const img = e.target.img.files[0];

        let imgUrl = ""
        if (!img?.name) {
            imgUrl = ""
        }
        imgUrl = await uploadImg(img);

        const payload = {
            name,
            email,
            phone,
            address,
            father_name,
            mother_name,
            dob,
            father_phone_number,
            institute_name,
            img: imgUrl
        };
        if (!name) {
            toast.error("Please enter a name");
        } else if (!email) {
            toast.error("Please enter a valid email address");
        } else if (!phone) {
            toast.error("Please enter a valid phone number");
        } else if (!address) {
            toast.error("Please enter your address");
        } else if (!father_name) {
            toast.error("Please enter your father's name");
        } else if (!mother_name) {
            toast.error("Please enter your mother's name");
        } else if (!dob) {
            toast.error("Please enter your date of birth");
        } else if (!father_phone_number) {
            toast.error("Please enter a valid father's phone number");
        } else if (!institute_name) {
            toast.error("Please enter your institute's name");
        } else if (!img) {
            toast.error("Please upload a valid image");
        } else {
            setLoader(true);
            const res = await borderCreateApi(payload);
            setLoader(false);
            if (res) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Border account has been created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: "Failed to create border account",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        e.target.reset();
    };

    return (
        <>
            <Helmet>
                <title>Dashboard | Border Create Page </title>
            </Helmet>
            <div>
                <div className="flex items-center justify-center bg-gray-100">
                    <form onSubmit={handleSubmit} className="w-full p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-2xl font-semibold text-center text-gray-800">Registration</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email" placeholder="Enter your email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Phone Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>

                            {/* Address Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Enter your address"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Father's Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                                <input
                                    type="text"
                                    name="father_name"
                                    placeholder="Enter father's name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>

                            {/* Mother's Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
                                <input
                                    type="text"
                                    name="mother_name"
                                    placeholder="Enter mother's name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Date of Birth Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>

                            {/* Father's Phone Number Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Father's Phone Number</label>
                                <input
                                    type="text"
                                    name="father_phone_number"
                                    placeholder="Enter father's phone number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2" >
                            {/* Institute Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Institute Name</label>
                                <input
                                    type="text"
                                    name="institute_name"
                                    placeholder="Enter institute name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            {/* Img  Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Img</label>
                                <input
                                    type="file"
                                    name='img'
                                    placeholder="Enter institute name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={loader}
                            type="submit"
                            className=" px-4 py-2 mx-auto block font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
            {
                loader && (
                    <div>
                        <SpinnerLoader></SpinnerLoader>
                    </div>
                )
            }
        </>
    )
}

export default BorderCreateForm;
