import React, { useState } from 'react';
import userStore from '../../api-request/userStore';
import { updateAlert } from '../../helper/updateAlert';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const UserStatusUpdate = () => {
    const { userRoleUpdate,totalUserDataApi } = userStore();
    const [loader, setLoader] = useState(false);
    const { id } = useParams();

    const handleUpdate = async (e) => {
        e.preventDefault();
        const role = e.target.role.value;
        const payload = { role: role };
        
        let resp = await updateAlert();

        if (resp.isConfirmed) {
            setLoader(true);
            let res = await userRoleUpdate(id, payload);
            setLoader(false);
            if (res) {
                setLoader(true);
                await totalUserDataApi(1,5,0);
                setLoader(false);
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'User Role Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Failed to Update User Role',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        e.target.reset();
    };

    return (
        <div className='flex justify-center items-center my-10'>
            <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <div className="mb-4">
                    <label htmlFor="role" className="text-sm font-medium text-gray-700">
                        Select User Role
                    </label>
                    <select
                        id="role"
                        name='role'
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="super-admin">Super Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${loader ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-700'}`}
                    disabled={loader}
                >
                    {loader ? (
                        <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="ml-2">Updating...</span>
                        </div>
                    ) : (
                        'Update Role'
                    )}
                </button>
            </form>
        </div>
    );
};

export default UserStatusUpdate;
