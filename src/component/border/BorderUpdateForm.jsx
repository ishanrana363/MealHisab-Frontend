import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import SpinnerLoader from '../loader/SpinnerLoader';
import borderStore from '../../api-request/borderApi';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadImg } from '../../upload-img/UploadImg';
import { updateAlert } from '../../helper/updateAlert';
import Swal from 'sweetalert2';

const BorderUpdateForm = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const { updateBorderApi, singleBorderDataApi, singleBorderDataList, totalBorderDataApi } = borderStore()
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    (async () => {
      await singleBorderDataApi(id);
    })()
  }, [id]);
  const { img: incomingImg } = singleBorderDataList;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const father_name = e.target.father_name.value;
    const mother_name = e.target.mother_name.value;
    const dob = e.target.dob.value;
    const father_phone_number = e.target.father_phone_number.value;
    const institute_name = e.target.institute_name.value;
    const img = e.target.img.files[0];

    let borderImg = incomingImg;

    if (!img?.name) {
      borderImg = incomingImg
    } else {
      borderImg = await uploadImg(img);
    }

    const payload = {
      name,
      email,
      phone,
      address,
      father_name,
      mother_name,
      dob,
      father_phone_number,
      institute_name,
      img: borderImg,
    };

    const resp = await updateAlert();
    if (resp.isConfirmed) {
      setLoader(true);
      let res = await updateBorderApi(id, payload);
      setLoader(false);
      if (res) {
        setLoader(true);
        await singleBorderDataApi(id);
        setLoader(false);
        navigate(`/dashboard/all-border`)
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Update Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Failed to Update",
          showConfirmButton: false,
          timer: 1500
        });
      }

    }
  }
  return (
    <div>
      <>
        <Helmet>
          <title>Dashboard | Border Update Page </title>
        </Helmet>
        <div>
          <div className="flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full p-6 bg-white rounded-lg shadow-md space-y-4">
              <h2 className="text-2xl font-semibold text-center text-gray-800">Update Page</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={singleBorderDataList?.name}
                    key={Date.now()}
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
                    placeholder="Enter institute name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                  />
                </div>

              </div>

              {/* Submit Button */}
              <button
                disabled={loader}
                type="submit"
                className=" px-4 py-2 mx-auto block font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
              >
                Update
              </button>
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
  )
}

export default BorderUpdateForm
