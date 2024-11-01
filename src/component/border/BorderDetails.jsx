import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import borderStore from '../../api-request/borderApi';
import SpinnerLoader from '../loader/SpinnerLoader';
import { useParams } from 'react-router-dom';

const BorderDetails = () => {
  const { id } = useParams()
  const { singleBorderDataList, singleBorderDataApi } = borderStore()
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      setLoader(true);
      await singleBorderDataApi(id);
      setLoader(false);
    })()
  }, [id])

  return (
    <div>
      <div>
        <>
          <Helmet>
            <title>Dashboard | Border Details Page </title>
          </Helmet>
          <div>
            <div className="flex items-center justify-center bg-gray-100">
              <form onSubmit={""} className="w-full p-6 bg-white rounded-lg shadow-md space-y-4">
                <h2 className="text-2xl font-semibold text-center text-gray-800">({singleBorderDataList?.name}) Information Details</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={singleBorderDataList?.name}
                      key={Date.now()}
                      readOnly
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      defaultValue={singleBorderDataList?.email}
                      key={Date.now()}
                      name="email"
                      readOnly
                      placeholder="Enter your email"
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
                      defaultValue={singleBorderDataList?.phone}
                      key={Date.now()}
                      readOnly
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
                      defaultValue={singleBorderDataList?.address}
                      key={Date.now()}
                      readOnly
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
                      defaultValue={singleBorderDataList?.father_name}
                      key={Date.now()}
                      readOnly
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
                      defaultValue={singleBorderDataList?.mother_name}
                      key={Date.now()}
                      readOnly
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
                      defaultValue={singleBorderDataList?.dob}
                      key={Date.now()}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                  </div>

                  {/* Father's Phone Number Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Father's Phone Number</label>
                    <input
                      type="text"
                      name="father_phone_number"
                      defaultValue={singleBorderDataList?.father_phone_number}
                      key={Date.now()}
                      readOnly
                      placeholder="Enter father's phone number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 rounded-full ">
                    <img key={Date.now()} src={singleBorderDataList?.img} />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2" >
                  {/* Img  Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Img</label>
                    <input
                      type="file"
                      name='img'
                      placeholder="Enter institute name"
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                  </div>
                  {/* Institute Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Institute Name</label>
                    <input
                      type="text"
                      name="institute_name"
                      defaultValue={singleBorderDataList?.institute_name}
                      key={Date.now()}
                      readOnly
                      placeholder="Enter institute name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                  </div>

                </div>


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
      </div>
    </div>
  )
}

export default BorderDetails
