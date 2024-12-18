import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteAlert } from '../../helper/deleteAlert';
import userStore from '../../api-request/userStore';
import SpinnerLoader from '../../component/loader/SpinnerLoader';
import { disableAlert } from '../../helper/disableAlert';

const UserListPage = () => {
    const navigate = useNavigate();
    const { totalUserDataApi, totalUserDataList, totalUserLength,disableUserApi } = userStore();
    const [loader, setLoader] = useState(false);
    const [perPage, setPerPage] = useState(5);
    const [searchValue, setSearchValue] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            setLoader(true);
            await totalUserDataApi(1, perPage, 0);
            setLoader(false);
        })();
    }, [totalUserDataApi, perPage]);

    const handlePageChange = async (event) => {
        const pageNo = event.selected;
        setLoader(true);
        await totalUserDataApi(pageNo + 1, perPage, searchValue);
        setLoader(false);
    };

    const getPerPageData = async (event) => {
        const newPerPage = parseInt(event.target.value);
        setPerPage(newPerPage);
        setLoader(true);
        await totalUserDataApi(1, newPerPage, 0);
        setLoader(false);
    };

    const getInputSearchValue = async (event) => {
        const value = event.target.value;
        setSearchValue(value);
        if (value.length === 0) {
            setLoader(true);
            await totalUserDataApi(1, perPage, 0);
            setLoader(false);
        }
    };

    const submitSearchValue = async () => {
        setLoader(true);
        await totalUserDataApi(1, perPage, searchValue);
        setLoader(false);
    };
    const disableUser = async (id) => {
        let resp = await disableAlert();
        if (resp.isConfirmed) {
            setLoader(true);
            let res = await  disableUserApi(id);
            setLoader(false);
            navigate("/dashboard/user-list")
            if (res) {
                setLoader(true);
                await totalUserDataApi(1, perPage, searchValue);
                setLoader(false);
                Swal.fire({
                    title: 'User has been disabled successfully!',
                    icon:'success',
                    confirmButtonText: 'Okay',
                });
            }
        }
    };
    return (
        <div>
            <div>
                <Helmet>
                    <title>Dashboard | All Users</title>
                </Helmet>
                <div className="p-4">
                    <h1 className='text-center text-lg font-semibold mb-6'>Total Borders: {totalUserLength}</h1>
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

                    {/* Table */}
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
                                    <th className="py-3 px-4 border-b">Disable User</th>
                                    <th className="py-3 px-4 border-b">Created Date</th>
                                    <th className="py-3 px-4 border-b">Update Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    totalUserDataList && totalUserDataList.map((item, i) => (
                                        <tr key={i} className="hover:bg-gray-100 text-center cursor-pointer">
                                            <td className="py-3 px-4 border-b">
                                                <Link to={``}>
                                                    {i + 1}
                                                </Link>
                                            </td>
                                            <td className="py-3 px-4 border-b">
                                                <Link to={``}>
                                                    {item?.username}
                                                </Link>
                                            </td>
                                            <td className="py-3 px-4 border-b">
                                                <Link to={``}>
                                                    <img
                                                        src={item?.img}
                                                        alt={item?.name}
                                                        className="h-10 w-10 rounded-full object-cover mx-auto"
                                                    />
                                                </Link>
                                            </td>
                                            <td className="py-3 px-4 border-b text-blue-500">
                                                <Link to={``}>
                                                    {item?.email}
                                                </Link>
                                            </td>
                                            <td className="py-3 px-4 border-b text-blue-500">
                                                <Link to={``}>
                                                    {item?.role}
                                                </Link>
                                            </td>
                                            <td className="py-3 px-4 border-b">
                                                <Link to={``}>
                                                    {item?.phone}
                                                </Link>
                                            </td>
                                            <td><button onClick={()=>{disableUser(item._id)}}
                                                className="bg-teal-500 text-white px-1 py-1 rounded hover:bg-teal-600"
                                                data-tooltip="Disable User"
                                            >
                                                <FaEdit />
                                            </button></td>
                                            <td className="py-3 px-4 border-b">
                                                <Link to={``}>
                                                    {moment(item?.createdAt).format('YYYY-MM-DD')}
                                                </Link>
                                            </td>
                                            <td className="py-3 px-4 border-b">
                                                <div className="flex justify-center space-x-2">
                                                    <Link to={`/dashboard/update-status/${item._id}`}>
                                                        <button
                                                            className="bg-teal-500 text-white px-1 py-1 rounded hover:bg-teal-600"
                                                            data-tooltip="Update Role"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </Link>
                                                    {/* <button
                                                        className="bg-red-500 text-white px-1 rounded hover:bg-red-600"
                                                        data-tooltip="Delete Border"
                                                    >
                                                        <MdDelete />
                                                    </button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-5">
                        <nav aria-label="Page navigation example">
                            <ReactPaginate
                                previousLabel="prev"
                                nextLabel="next"
                                pageCount={Math.ceil(totalUserLength / perPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageChange}
                                containerClassName="pagination flex justify-center space-x-2"
                                activeClassName="bg-teal-500 text-white rounded"
                                pageLinkClassName="px-3 py-1 rounded"
                            />
                        </nav>
                    </div>
                </div>
                {
                    loader && (
                        <div className="flex justify-center items-center h-screen">
                            <SpinnerLoader />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default UserListPage;
