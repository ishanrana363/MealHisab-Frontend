import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import bazarStore from '../../api-request/bazarApi';
import toast from 'react-hot-toast';
import SpinnerLoader from '../loader/SpinnerLoader';
import BazarListTable from './BazarListTable';

const BazarList = () => {
  const { bazarDataListApi,bazarDataList,totalBazarMoney } = bazarStore();
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);



  // Submit handler with validation and API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    const startDate = e.target.startDate.value;
    const endDate = e.target.endDate.value;

    // Form validation

    if (!startDate) {
      toast.error("Enter a valid start date");
      return;
    }
    if (!endDate) {
      toast.error("Enter a valid end date");
      return;
    }

    const payload = {startDate, endDate };

    try {
      setLoader(true);
      await bazarDataListApi(payload);
      setShow(true);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoader(false);
    }

    e.target.reset(); // Reset form after submission
  };
  return (
    <div>
      <div>
        <div>
          <Helmet>
            <title>Milhisab | Daily Bazar Calculation </title>
          </Helmet>
          <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">
              {new Date().toLocaleDateString()}
            </h2>
            <h2 className="text-2xl font-bold text-center mb-6">Bazar Calculation</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center gap-8">
                {/* Border Name Field */}


                {/* Start Date Field */}
                <div className="mb-4">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
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
                    name="endDate"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-opacity-50"
                  />
                </div>

                {/* Submit Button */}
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
              </div>
            </form>
          </div>

          {/* Show the Rice Calculation Table if data is available */}
          {show && (
            bazarDataList.length > 0 ? (
              <BazarListTable borderBazarDataList={bazarDataList} totalBazarData={totalBazarMoney} />
            ) : (
              <div className="text-center mt-4">
                <h1>No data found for the selected criteria.</h1>
              </div>
            )
          )}

          {/* Loader for data fetching */}
          {loader && (
            <div className="text-center mt-4">
              <SpinnerLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BazarList
          