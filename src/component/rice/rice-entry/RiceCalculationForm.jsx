import React, { useEffect, useState } from 'react';
import borderStore from '../../../api-request/borderApi';
import riceEntryStore from '../../../api-request/riceEntry';
import toast from 'react-hot-toast';
import RiceCalculationTable from './RiceCalculationTable';

const RiceCalculationForm = () => {
    const { borderNameApi, borderNameList } = borderStore();
    const { totalRiceDataApi, borderRiceDataList, totalRiceData } = riceEntryStore();
    const [loader, setLoader] = useState(false);
    const [show, setShow] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ borderId: '', startDate: '', endDate: '' });

    useEffect(() => {
        (async () => {
            setLoader(true);
            await borderNameApi();
            setLoader(false);
        })();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { borderId, startDate, endDate } = formData;
        const payload = { borderId, startDate, endDate };

        if (!borderId) {
            toast.error("Select a border name");
            return;
        } else if (!startDate) {
            toast.error("Enter a valid start date");
            return;
        } else if (!endDate) {
            toast.error("Enter a valid end date");
            return;
        }

        try {
            setIsSubmitting(true); // Start submitting
            setLoader(true);
            await totalRiceDataApi(payload); // Fetch data based on the payload
            setShow(true); // Show the table
        } catch (error) {
            toast.error("Failed to fetch data");
        } finally {
            setIsSubmitting(false); // End submitting
            setLoader(false);
        }
        e.target.reset();
    };

    return (
        <div>
            <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Rice Calculation</h2>
                <form onSubmit={handleSubmit}>
                    <div className='flex items-center justify-center gap-8'>
                        {/* Border Name Field */}
                        <div className="mb-7">
                            <label htmlFor="borderId" className="block text-gray-700 font-medium mt-3">
                                Border Name
                            </label>
                            <select
                                id="borderId"
                                name="borderId"
                                onChange={handleChange}
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
                        {/* Start Date Field */}
                        <div className="mb-4">
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name='startDate'
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-opacity-50"
                            />
                        </div>
                        {/* End Date Field */}
                        <div className="mb-4">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                                End Date
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name='endDate'
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-opacity-50"
                            />
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`btn btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting} // Disable button when submitting
                        >
                            {isSubmitting ? (
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
                    </div>
                </form>
            </div>
            {/* Show Loader if data is being fetched */}
            {loader && <div className="text-center">Loading...</div>}
            {/* Show the Rice Calculation Table if data is available */}
            {show && borderRiceDataList.length > 0 ? (
                <RiceCalculationTable riceList={borderRiceDataList} totalPot={totalRiceData} />
            ) : show && borderRiceDataList.length === 0 ? (
                <div className="text-center mt-4">
                    <h1>No data found for the selected criteria.</h1>
                </div>
            ) : null}
        </div>
    );
}

export default RiceCalculationForm;
