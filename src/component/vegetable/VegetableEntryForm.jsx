import { useEffect, useState } from "react";
import borderStore from "../../api-request/borderApi";
import toast from "react-hot-toast";
import millStore from "../../api-request/millApi";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SpinnerLoader from "../loader/SpinnerLoader";

const VegetableEntryForm = () => {
  const { borderNameList, borderNameApi } = borderStore();
  const { millCreateApi } = millStore();
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
    const mill = e.target.mill.value;
    const millPrice = e.target.millPrice.value;
    const date = e.target.date.value;
    const payload = { borderId, mill, millPrice, date };

    if (!borderId) {
      toast.error("Select a border name");
      return;
    } else if (!mill) {
      toast.error("Enter the total mill");
      return;
    } else if (!millPrice) {
      toast.error("Enter the mill price");
      return;
    } else if (!date) {
      toast.error("Select a date");
      return;
    } else {
      setLoader(true);
      const res = await millCreateApi(payload);
      setLoader(false);

      if (res) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Mill Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Failed to Add Mill",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    e.target.reset()
  };

  return (
    <>
      <Helmet>
        <title>Mill Hisab | Mill Insert Form</title>
      </Helmet>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">
          {new Date().toLocaleDateString()}
        </h2>
        <h2 className="text-2xl font-bold text-center mb-6">Mill Calculation Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-5">

            {/* Border ID Field */}
            <div>
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

            {/* Mill Field */}
            <div>
              <label htmlFor="mill" className="block text-gray-700 font-medium mb-1">
                Total Mill
              </label>
              <input
                type="text"
                id="mill"
                name="mill"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Enter Total Mill"
              />
            </div>

            {/* Mill Price Field */}
            <div>
              <label htmlFor="millPrice" className="block text-gray-700 font-medium mb-1">
                Mill Price
              </label>
              <input
                type="number"
                id="millPrice"
                name="millPrice"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Enter Mill Price"
              />
            </div>

            {/* Date Field */}
            <div>
              <label htmlFor="date" className="block text-gray-700 font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 ${loader ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={loader}
          >
            {loader ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>

      {loader && <SpinnerLoader />}
    </>
  );
};

export default VegetableEntryForm;
