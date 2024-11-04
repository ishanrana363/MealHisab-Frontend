import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { createAlert } from '../../../helper/createAlert';
import riceEntryStore from '../../../api-request/riceEntry';
import borderStore from '../../../api-request/borderApi';
import SpinnerLoader from '../../loader/SpinnerLoader';

const DailyRiceEntryForm = () => {
    const { borderNameList, borderNameApi } = borderStore();
    const { dailyRiceEntryApi } = riceEntryStore();
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        (async () => {
            setLoader(true);
            await borderNameApi();
            setLoader(false);
        })();
    }, [borderNameApi]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const borderId = e.target.borderId.value;
        const pot = e.target.pot.value;
        const date = e.target.date.value;
        const payload = {
            borderId,
            pot,
            date,
        };

        if (!borderId) {
            toast.error("Please select a border");
        } else if (!pot) {
            toast.error("Please enter a total pot");
        } else if (!date) {
            toast.error("Please select a date");
        } else {
            const resp = await createAlert();
            if (resp.isConfirmed) {
                setLoader(true);
                let res = await dailyRiceEntryApi(payload);
                setLoader(false);
                if (res) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Rice Pot Entry Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    e.target.reset();
                } else {
                    Swal.fire({
                        position: "top-center",
                        icon: "error",
                        title: "Failed to Entry Rice Pot",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    e.target.reset();
                }
            }
        }
    };

   

    return (
        <div className='my-2' >
            <Helmet>
                <title>Daily Rice Entry | Meal Hisab</title>
            </Helmet>
            <div className="flex items-center justify-center">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">
                        {new Date().toLocaleDateString()}
                    </h2>
                    <h3 className="text-lg font-medium text-center text-gray-600 mb-4">
                        Daily Rice Entry Form
                    </h3>
                    {/* Border Name Field */}
                    <div className="mb-4">
                        <label htmlFor="borderId" className="block text-gray-700 font-medium mb-2">
                            Border Name
                        </label>
                        <select
                            id="borderId"
                            name="borderId"
                            className="form-select w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring focus:ring-indigo-200"
                        >
                            <option value="">Select Border Name</option>
                            {borderNameList && borderNameList.map((border) => (
                                <option key={border._id} value={border._id}>
                                    {border?.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Total Rice Pot Field */}
                    <div className="mb-4">
                        <label htmlFor="pot" className="block text-gray-700 font-medium mb-2">
                            Total Rice Pot
                        </label>
                        <input
                            type="text"
                            id="pot"
                            name="pot"
                            placeholder="Enter Total Rice Pot"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Date Picker */}
                    <div className="mb-4">
                        <label htmlFor="entry_date" className="block text-gray-700 font-medium mb-2">
                        Entry Date
                        </label>
                        <input
                            type="date"
                            id="entry_date"
                            name="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold transition-colors hover:bg-indigo-700"
                        disabled={loader} // Disable button while loading
                    >
                        {loader ? <SpinnerLoader /> : "Submit"}
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

export default DailyRiceEntryForm;
