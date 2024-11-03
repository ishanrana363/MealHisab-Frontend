import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import borderStore from '../../api-request/borderApi';
import moneyStore from '../../api-request/moneyApi';
import Swal from 'sweetalert2';
import SpinnerLoader from './../loader/SpinnerLoader';

const EntryMoneyForm = () => {
    const { borderNameApi, borderNameList } = borderStore();
    const [loader, setLoader] = useState(false);
    const { moneyInsertApi } = moneyStore();

    useEffect(() => {
        (async () => {
            await borderNameApi();
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const borderId = e.target.borderId.value;
        const totalMoney = e.target.totalMoney.value;
        const date = e.target.date.value;
        const payload = {
            borderId,
            totalMoney,
            date,
        };

        setLoader(true);
        let res = await moneyInsertApi(payload);
        setLoader(false);
        if (res) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Money Entry Successful",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Failed to add Money",
                showConfirmButton: false,
                timer: 1500
            });
        }
        e.target.reset();
    };

    return (
        <div>
            <Helmet>
                <title>Mill Hisab | Money Entry</title>
            </Helmet>
            <div className="flex items-center justify-center">
                <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Border Form</h2>

                    <div className="mb-4">
                        {/* Border Name Field */}
                        <div className="mb-7">
                            <label htmlFor="borderId" className="block text-gray-700 font-medium mt-3">
                                Border Name
                            </label>
                            <select
                                id="borderId"
                                name="borderId"
                                className="form-select w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            >
                                <option value="">Select Border Name</option>
                                {borderNameList && borderNameList.map((border) => (
                                    <option key={border._id} value={border._id}>
                                        {border?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="totalMoney" className="block mb-2 text-sm font-medium text-gray-600">Total Money</label>
                        <input
                            type="text"
                            id="totalMoney"
                            name="totalMoney"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter total money"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-600">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary ${loader ? 'opacity-50 cursor-not-allowed' : ''}`}
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
            {
                loader && (
                        <SpinnerLoader />
                )
            }
        </div>
    );
};

export default EntryMoneyForm;
