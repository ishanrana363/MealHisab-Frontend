import React, { useState } from 'react';

const UserStatusUpdate = () => {
    const [role, setRole] = useState('');
    const [updateMessage, setUpdateMessage] = useState(null);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const role = e.target.role.value;
        console.log(role);

    };

    return (
        <div className='flex justify-center items-center my-10 '>
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
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Update Role
                </button>
                {updateMessage && (
                    <p className="mt-4 text-sm text-gray-700 text-center">{updateMessage}</p>
                )}
            </form>
        </div>
    );
};

export default UserStatusUpdate;
