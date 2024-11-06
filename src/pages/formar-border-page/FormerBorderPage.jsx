import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import formerBorderStore from '../../api-request/borderStore';
import { Link, useParams } from 'react-router-dom';
import SpinnerLoader from '../../component/loader/SpinnerLoader';
import SingleBorderPage from './SingleBorderPage';

const FormerBorderPage = () => {
    const [loader, setLoader] = useState(false);
    const { formerBorderApi, formerBorderDataList } = formerBorderStore();

    useEffect(() => {
        (async () => {
            setLoader(true);
            await formerBorderApi();
            setLoader(false);
        })();
    }, []);


    return (
        <div>
            <Helmet>
                <title>Former Border Page</title>
            </Helmet>
            <h1 className='text-center my-8 text-3xl font-bold'>প্রাক্তন বডার লিস্ট</h1>

            {loader ? (
                <div className="text-center my-8">
                    <SpinnerLoader></SpinnerLoader>
                </div>
            ) : (
                <div className='grid md:grid-cols-3 gap-9'>
                    {formerBorderDataList && formerBorderDataList.length > 0 ? (
                        formerBorderDataList.map((item, i) => (
                            <div key={i}>
                                <Link to={`/dashboard/single/border-details/${item._id}`}>
                                    <div className="card bg-base-100 shadow-xl">
                                        <figure className="px-10 pt-10 h-44 my-auto">
                                            <img
                                                src={item.img || 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'}
                                                alt={item.title || "Border Image"}
                                                className="rounded-xl"
                                            />
                                        </figure>
                                        <div className="card-body items-center text-center h-52 my-auto">
                                            <h2 className="card-title">{item.name || "Unknown Title"}</h2>
                                            <div className="card-actions">
                                                <button className="btn btn-primary">Border Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No data available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default FormerBorderPage;
