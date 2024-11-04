import { Helmet } from "react-helmet-async";
import borderStore from "../../../api-request/borderApi";
import { useEffect, useState } from "react";
import { createAlert } from './../../../helper/createAlert';
import riceEntryStore from "../../../api-request/riceEntry";
import Swal from "sweetalert2";
import SpinnerLoader from "../../loader/SpinnerLoader";
import toast from "react-hot-toast";

const RiceEntryForm = () => {
    const { borderNameList, borderNameApi } = borderStore();
    const { riceInsertApi } = riceEntryStore();
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
        const totalPot = e.target.totalPot.value;
        const date = e.target.date.value;
        const payload = {
            borderId,
            totalPot,
            date,
        };

        console.log(borderId)

        if (!borderId) {
            toast.error("Please select a border")
        } else if (!totalPot) {
            toast.error("Please enter a total pot")
        } else if (!date) {
            toast.error("Please select a date")
        }
        else {
            const resp = await createAlert();
            if (resp.isConfirmed) {
                setLoader(true);
                let res = await riceInsertApi(payload);
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
    }

    return (
        <div>
            <Helmet>
                <title>Rice Pot Entry | Meal Hisab</title>
            </Helmet>
            <div className="flex items-center justify-center">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">
                        {new Date().toLocaleDateString()}
                    </h2>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rice Pot Form</h2>
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
                        <label htmlFor="totalRicePot" className="block text-gray-700 font-medium mb-2">
                            Total Rice Pot
                        </label>
                        <input
                            type="text"
                            id="totalRicePot"
                            name="totalPot"
                            placeholder="Enter Total Rice Pot"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* date */}
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            placeholder="Enter Total Rice Pot"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-grdate text-white py-2 rounded-md font-semibold  transition-colors"
                    >
                        Submit
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
        </div>
    );
};

export default RiceEntryForm;
