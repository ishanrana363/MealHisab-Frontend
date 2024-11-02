import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import borderStore from '../../api-request/borderApi';
import SpinnerLoader from '../loader/SpinnerLoader';
import toast from 'react-hot-toast';
import bazarStore from '../../api-request/bazarApi';
import Swal from 'sweetalert2';

const InsertBazarForm = () => {
    const { borderNameList, borderNameApi } = borderStore();
    const { bazarInsertApi } = bazarStore();
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        (async () => {
            setLoader(true);
            await borderNameApi();
            setLoader(false);
        })();
    }, []);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const borderId = e.target.borderId.value;
        const price = e.target.price.value;
        const date = e.target.date.value;
        const itemName = e.target.itemName.value;

        if (!borderId) {
            toast.error("Please select a border name");
            return;
        } else if (!price) {
            toast.error("Please enter a price");
            return;
        } else if (!date) {
            toast.error("Please select a date");
            return;
        } else if (!itemName) {
            toast.error("Please enter an item name");
            return;
        }

        const payload = { borderId, price, date, itemName };

        setLoader(true);
        const res = await bazarInsertApi(payload);
        setLoader(false);

        if (res) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Bazar entry has been added successfully",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Failed to add bazar entry",
                showConfirmButton: false,
                timer: 1500
            });
        }
        e.target.reset();
    };

    return (
        <div>
            <Helmet>
                <title>Item Entry Form - Meal Hisab</title>
            </Helmet>
            <div className="max-w-screen-lg mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">
                    {new Date().toLocaleDateString()}
                </h2>
                <h2 className="text-2xl font-bold text-center mb-6">Bazar Entry Form</h2>
                <form onSubmit={handleSubmitForm} className="space-y-4">
                    <div className='grid grid-cols-2 gap-6'>
                        {/* Border ID Field */}
                        <div>
                            <label htmlFor="borderId" className="block text-gray-700 font-medium mt-3">
                                বাজারকারীর নাম
                            </label>
                            <select
                                id="borderId"
                                name="borderId"
                                className="form-select w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring focus:ring-indigo-200"
                            >
                                <option value="">বাজারকারীর নাম </option>
                                {borderNameList && borderNameList.map((border) => (
                                    <option key={border._id} value={border._id}>
                                        {border?.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Field */}
                        <div className='mt-2'>
                            <label htmlFor="date" className="block text-gray-700 font-medium mb-1">
                                তারিখ
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            />
                        </div>

                        {/* Item Name Field */}
                        <div>
                            <label htmlFor="itemName" className="block text-gray-700 font-medium mb-1">
                                বাজারের নাম
                            </label>
                            <input
                                type="text"
                                id="itemName"
                                name="itemName"
                                placeholder="Enter Item Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            />
                        </div>

                        {/* Price Field */}
                        <div>
                            <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
                                প্রাইস
                            </label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                placeholder="Enter price"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            />
                        </div>
                    </div>

                    {/* Submit Button with Loader */}
                    <button
                        type="submit"
                        className={`block mx-auto py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md shadow-md ${loader ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
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
            {loader && (
                <div>
                    <SpinnerLoader />
                </div>
            )}
        </div>
    );
};

export default InsertBazarForm;
