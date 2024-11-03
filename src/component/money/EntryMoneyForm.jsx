import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import borderStore from '../../api-request/borderApi';

const EntryMoneyForm = () => {
    const { borderNameApi, borderNameList } = borderStore();

    useEffect(() => {
        (async () => {
            await borderNameApi();
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit");
    };

    return (
        <div>
            <Helmet>
                <title>Mill Hisab | Money Entry</title>
            </Helmet>
            <div className="flex items-center justify-center ">
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
                            type="number"
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
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EntryMoneyForm;
