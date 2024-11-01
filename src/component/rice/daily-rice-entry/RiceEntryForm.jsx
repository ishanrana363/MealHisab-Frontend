import { Helmet } from "react-helmet-async";
import borderStore from "../../../api-request/borderApi";
import { useEffect, useState } from "react";
import { name } from './../../../../node_modules/jiti/dist/jiti';

const RiceEntryForm = () => {
    const { borderNameList, borderNameApi } = borderStore();
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        (async () => {
            setLoader(true);
            await borderNameApi();
            setLoader(false);
        })();
    }, [borderNameApi]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const borderName = e.target.borderName.value;
        const totalPot = e.target.totalPot.value;
        const payload = {
            borderName,
            totalPot
        }
    }

    return (
        <div>
            <Helmet>
                <title>Rice Pot Entry | Meal Hisab</title>
            </Helmet>
            <div className="flex items-center justify-center">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rice Pot Form</h2>

                    {/* Loader */}
                    {loader && <p className="text-center text-blue-500 mb-4">Loading...</p>}

                    {/* Border Name Field */}
                    <div className="mb-4">
                        <label htmlFor="borderName" className="block text-gray-700 font-medium mb-2">
                            Border Name
                        </label>
                        <select
                            id="borderName"
                            name="borderName"
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
                        <label htmlFor="totalRicePot" className="block text-gray-700 font-medium mb-2">
                            Total Rice Pot
                        </label>
                        <input
                            type="number"
                            id="totalRicePot"
                            name="totalPot"
                            placeholder="Enter Total Rice Pot"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RiceEntryForm;
