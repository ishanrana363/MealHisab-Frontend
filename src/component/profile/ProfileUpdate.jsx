import React, { useEffect, useState } from 'react';
import userStore from '../../api-request/userStore';
import { Helmet } from 'react-helmet-async';
import { uploadImg } from '../../upload-img/UploadImg';
import { updateAlert } from '../../helper/updateAlert';
import Swal from 'sweetalert2';

const ProfileUpdate = () => {
  const { userProfileDataApi, userProfileData, userProfileUpdateApi } = userStore();

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      setLoader(true);
      await userProfileDataApi();
      setLoader(false);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const username = e.target.username.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const role = e.target.role.value;
    const img = e.target.img.files[0];

    let imgUrl = userProfileData.img;
    if (img) {
      imgUrl = await uploadImg(img);
    }

    const payload = {
      username,
      img: imgUrl,
      email,
      phone,
      address,
      role
    };

    const resp = await updateAlert();
    if (resp.isConfirmed) {
      const res = await userProfileUpdateApi(payload);
      if (res) {
        await userProfileDataApi();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Profile Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Failed to Update Profile",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    setLoader(false);
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard | User Profile Update</title>
      </Helmet>
      <div className="container mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input fields */}
          <div className='flex gap-10'>
            <div className='w-full'>
              <label className="block text-gray-700 font-semibold mb-1">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue={userProfileData.username}
                name='username'
              />
            </div>
            <div className='w-full'>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue={userProfileData.email}
                name='email'
              />
            </div>
          </div>

          {/* More fields */}
          <div className="flex gap-10">
            <div className='w-full'>
              <label className="block text-gray-700 font-semibold mb-1">Phone</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue={userProfileData.phone}
                name='phone'
              />
            </div>
            <div className='w-full'>
              <label className="block text-gray-700 font-semibold mb-1">Role</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue={userProfileData.role}
                name='role'
              />
            </div>
          </div>

          {/* Address and Image fields */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Address</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue={userProfileData.address}
              name='address'
              rows="6"
            />
          </div>
          <div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-semibold mb-1">Profile Image</label>
              <input
                type="file"
                name="img"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={userProfileData.img} alt="Profile" />
            </div>
          </div>

          {/* Submit button with loading spinner */}
          <button
            type="submit"
            className={`block mx-auto text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center ${loader ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            disabled={loader}
          >
            {loader ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Loading...
              </div>
            ) : (
              'Update Profile'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
