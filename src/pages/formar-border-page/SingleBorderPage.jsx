import React, { useEffect, useState } from 'react';
import formerBorderStore from '../../api-request/borderStore';
import { useParams } from 'react-router-dom';

const SingleBorderPage = () => {
    const [loader, setLoader] = useState(false);
    const { formerBorderApi, formerBorderDataList } = formerBorderStore();
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            setLoader(true);
            await formerBorderApi();
            setLoader(false);
        })();
    }, [id]);

    const borderData = formerBorderDataList.find(border => border._id === id);

    return (
        <div>
            <div className="mx-auto p-6 bg-white shadow-md rounded-lg max-w-2xl">
                <h1 className="text-2xl font-bold mb-4 text-center">User Information Form</h1>

                {loader ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <div className="grid grid-cols-2 gap-6">
                        {/* First row of inputs */}
                        <div className="flex flex-col">
                            <label className="text-gray-600">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={borderData?.name || ""}
                                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600">Image URL</label>
                            <input
                                type="text"
                                name="img"
                                value={borderData?.img || ""}
                                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly
                            />
                        </div>

                        {/* Second row of inputs */}
                        <div className="flex flex-col">
                            <label className="text-gray-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={borderData?.email || ""}
                                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={borderData?.phone || ""}
                                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly
                            />
                        </div>

                        {/* Third row of inputs */}
                        <div className="flex flex-col">
                            <label className="text-gray-600">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={borderData?.address || ""}
                                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600">Father's Name</label>
                            <input
                                type="text"
                                name="father_name"
                                value={borderData?.father_name || ""}
                                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly
                            />
                        </div>

                        {/* Fourth row of inputs */}
                        <div className="flex flex-col">
                            <label className="text-gray-600">Mother's Name</label>
                            <input
                                type="text"
                                name="mother_name"
                                value={borderData?.mother_name || ""}
                                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={borderData?.dob || ""}
                                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly
                            />
                        </div>

                        {/* Fifth row of inputs */}
                        <div className="flex flex-col">
                            <label className="text-gray-600">Father's Phone Number</label>
                            <input
                                type="text"
                                name="father_phone_number"
                                value={borderData?.father_phone_number || ""}
                                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600">Institute Name</label>
                            <input
                                type="text"
                                name="institute_name"
                                value={borderData?.institute_name || ""}
                                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleBorderPage;
