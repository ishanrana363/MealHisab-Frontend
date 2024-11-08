import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';
import userStore from '../../api-request/userStore';
import SpinnerLoader from '../../component/loader/SpinnerLoader';
import { disableAlert } from '../../helper/disableAlert';

const DisableUserListPage = () => {
    const { totalDisableUserDataApi, totalDisableUserDataList, totalDisableUserLength, activeUserApi } = userStore();
    const [loader, setLoader] = useState(false);
    const [perPage, setPerPage] = useState(5);
    const [searchValue, setSearchValue] = useState(0);
    const navigate = useNavigate();



    useEffect(() => {
        (async () => {
            setLoader(true);
            await totalDisableUserDataApi(1, perPage, 0);
            setLoader(false);
        })();
    }, [totalDisableUserDataApi, perPage]);

    const handlePageChange = async (event) => {
        const pageNo = event.selected;
        setLoader(true);
        await totalDisableUserDataApi(pageNo + 1, perPage, searchValue);
        setLoader(false);
    };

    const getPerPageData = async (event) => {
        const newPerPage = parseInt(event.target.value);
        setPerPage(newPerPage);
        setLoader(true);
        await totalDisableUserDataApi(1, newPerPage, searchValue);
        setLoader(false);
    };

    const getInputSearchValue = async (event) => {
        const value = event.target.value;
        setSearchValue(value);
        if (value.length === 0) {
            setLoader(true);
            await totalDisableUserDataApi(1, perPage, 0);
            setLoader(false);
        }
    };

    const submitSearchValue = async () => {
        setLoader(true);
        await totalDisableUserDataApi(1, perPage, searchValue);
        setLoader(false);
    };





    const handleDisableUser = async (id) => {
        let resp = await disableAlert();
        if (resp.isConfirmed) {
            setLoader(true);
            let res = await activeUserApi(id);
            setLoader(false);
            navigate("/dashboard/user-list")
            if (res) {
                setLoader(true);
                await totalDisableUserDataApi(1, 5, 0);
                setLoader(false);
                Swal.fire({
                    icon: 'success',
                    title: 'User Active Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Active User',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <div>
            <Helmet>
                <title>Dashboard | All Disable Users</title>
            </Helmet>
            <div className="p-4">
                <h1 className='text-center text-lg font-semibold mb-6'>Total Disable User : {totalDisableUserLength}</h1>
                {/* Filter and Search */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <select
                            onChange={getPerPageData}
                            className="form-control mx-2 form-select-sm border border-gray-300 rounded p-2"
                        >
                            <option value="5">5 Per Page</option>
                            <option value="30">30 Per Page</option>
                            <option value="50">50 Per Page</option>
                            <option value="100">100 Per Page</option>
                            <option value="200">200 Per Page</option>
                        </select>
                    </div>
                    <div className="w-1/3">
                        <div className="input-group mb-3 flex">
                            <input
                                onChange={getInputSearchValue}
                                type="text"
                                className="form-control form-control-sm w-full border border-gray-300 rounded p-2"
                                placeholder="Search..."
                                aria-label="Search"
                            />
                            <button
                                onClick={submitSearchValue}
                                className="btn btn-success btn-sm ml-2 bg-teal-500 text-white px-4 py-1 mt-1 rounded hover:bg-teal-600"
                                type="button"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* User Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-teal-500 text-white text-center">
                                <th className="py-3 px-4 border-b">Serial</th>
                                <th className="py-3 px-4 border-b">Name</th>
                                <th className="py-3 px-4 border-b">Img</th>
                                <th className="py-3 px-4 border-b">Email</th>
                                <th className="py-3 px-4 border-b">Role</th>
                                <th className="py-3 px-4 border-b">Phone</th>
                                <th className="py-3 px-4 border-b">Created Date</th>
                                <th className="py-3 px-4 border-b">Active User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totalDisableUserDataList.length > 0 ? (
                                totalDisableUserDataList.map((item, i) => (
                                    <tr key={i} className="hover:bg-gray-100 text-center cursor-pointer">
                                        <td className="py-3 px-4 border-b">{i + 1}</td>
                                        <td className="py-3 px-4 border-b">{item?.username}</td>
                                        <td className="py-3 px-4 border-b">
                                            <img
                                                src={item?.img}
                                                alt={item?.name}
                                                className="h-12 w-12 rounded-full object-cover mx-auto"
                                            />
                                        </td>
                                        <td className="py-3 px-4 border-b text-blue-500">{item?.email}</td>
                                        <td className="py-3 px-4 border-b text-blue-500">{item?.role}</td>
                                        <td className="py-3 px-4 border-b">{item?.phone}</td>
                                        <td className="py-3 px-4 border-b">{moment(item?.createdAt).format('YYYY-MM-DD')}</td>
                                        <td className="py-3 px-4 border-b">
                                            <button
                                                onClick={() => handleDisableUser(item._id)}
                                                data-tooltip="Activate User"
                                                className="bg-teal-500 text-white px-1 py-1 rounded hover:bg-teal-600"
                                            >
                                                <FaEdit />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-4">Data not found</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <ReactPaginate
                    previousLabel="prev"
                    nextLabel="next"
                    pageCount={Math.ceil(totalDisableUserLength / perPage)}
                    onPageChange={handlePageChange}
                    containerClassName="pagination flex justify-center space-x-2 mt-5"
                    activeClassName="bg-teal-500 text-white rounded"
                    pageLinkClassName="px-3 py-1 rounded"
                />
            </div>

            {/* Loader */}
            {loader && <SpinnerLoader />}

            {/* Modal */}

        </div>
    );
};

export default DisableUserListPage;
