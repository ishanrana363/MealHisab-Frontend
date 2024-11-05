import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import userStore from '../../api-request/userStore';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { userProfileDataApi, userProfileData } = userStore();

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      setLoader(true);
      await userProfileDataApi();
      setLoader(false);
    })()

  }, [])

  return (
    <div>
      <Helmet>
        <title>Dashboard | User Profile</title>
      </Helmet>
      <div className='' >
        <form className=" mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">

          <div className='flex gap-10 ' >
            <div className='w-full' >
              <label className="block text-gray-700 font-semibold mb-1">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue={userProfileData.username}
                key={Date.now()}
                readOnly
              />
            </div>
            <div className='w-full' >
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                readOnly
                defaultValue={userProfileData?.email}
                key={Date.now()}
              />
            </div>
          </div>

          <div className='flex gap-10 ' >
            <div className='w-full' >
              <label className="block text-gray-700 font-semibold mb-1">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue={userProfileData?.phone}
                key={Date.now()}
                readOnly
              />
            </div>

            <div className='w-full' >
              <label className="block text-gray-700 font-semibold mb-1">Role</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter role"
                readOnly
                defaultValue={userProfileData?.role}
                key={Date.now()}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Address</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter address"
              rows="6"
              readOnly
              defaultValue={userProfileData?.address}
              key={Date.now()}
            />
          </div>

          <button
            type="button"
            className=" block mx-auto bg-grdate text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            <Link to={"/dashboard/profile-update"}>Update Profile </Link>
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserProfile
