import { useState } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { MdAddCircleOutline, MdMenuOpen, MdOutlineManageSearch, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle state
    const [activeMenu, setActiveMenu] = useState(null); // Track which menu is open
    const { pathname } = useLocation(); // Track active route

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMenuClick = (menuName) => {
        // If the clicked menu is already active, close it; otherwise, open it.
        setActiveMenu(activeMenu === menuName ? null : menuName);
    };

    return (
        <aside
            className={`bg-grdate text-[black] transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-14'}`}>
            <div className="flex justify-between items-center p-4 gap-8">
                <div className={`text-2xl font-bold ${!isSidebarOpen && 'hidden'}`}>
                    <NavLink to={"/dashboard"}><p>Portfolio</p></NavLink>
                </div>
                <button onClick={toggleSidebar} className="text-[black] focus:outline-none">
                    {isSidebarOpen ? <IoCloseCircleOutline className='text-4xl' /> : <MdMenuOpen className='text-3xl' />}
                </button>
            </div>

            <nav className="mt-10 space-y-4">
                <ul>
                    {/* border Section */}
                    <li>
                        <div
                            className="flex justify-between items-center cursor-pointer px-3 py-2  rounded-lg"
                            onClick={() => handleMenuClick('border')}
                        >
                            <div className="flex items-center">
                                <MdOutlineManageSearch className='text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-3 font-bold text-white `}>Border</span>
                            </div>
                            {activeMenu === 'border' ? <MdExpandLess /> : <MdExpandMore />}
                        </div>

                        {activeMenu === 'border' && (
                            <ul className="pl-6 my-3 ">
                                <li>
                                    <NavLink
                                        to="/dashboard/border-create"
                                        className={`${pathname === "/dashboard/border-create" ? ` text-textColor bg-[#FF9100] ` : `bg-[#D5ED9F] text-[black]`} px-3 py-2 flex items-center  rounded-lg text-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-sm font-bold `}>Border Create</span>
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/all-border"
                                        className={`${pathname === "/dashboard/all-border" ? `bg-[#FF9100]  text-[black]` : `bg-[#D5ED9F] text-[black]`} px-3 py-2 flex items-center  rounded-lg text-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-sm font-bold `}>All Border</span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* {/* rice entry Section */}
                    <li>
                        <div
                            className="flex justify-between items-center cursor-pointer px-3 py-2  rounded-lg"
                            onClick={() => handleMenuClick('rice-entry')}
                        >
                            <div className="flex items-center">
                                <MdOutlineManageSearch className='text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-3 font-bold text-white `}>Rice</span>
                            </div>
                            {activeMenu === 'rice-entry' ? <MdExpandLess /> : <MdExpandMore />}
                        </div>

                        {activeMenu === 'rice-entry' && (
                            <ul className="pl-6 my-3 ">
                                <li>
                                    <NavLink
                                        to="/dashboard/rice-entry"
                                        className={`${pathname === "/dashboard/rice-entry" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F] text-[black]`} px-3 py-2 flex items-center  rounded-lg text-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-sm font-bold `}>Rice Entry</span>
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/all-skill"
                                        className={`${pathname === "/dashboard/all-skill" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-3 py-2 flex items-center  rounded-lg text-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-sm font-bold `}>All Skill</span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Service Section */}
                    <li>
                        <div
                            className="flex justify-between items-center cursor-pointer px-3 py-2  rounded-lg"
                            onClick={() => handleMenuClick('service')}
                        >
                            <div className="flex items-center">
                                <MdOutlineManageSearch className='text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-3 font-bold text-white `}>Service</span>
                            </div>
                            {activeMenu === 'service' ? <MdExpandLess /> : <MdExpandMore />}
                        </div>

                        {activeMenu === 'service' && (
                            <ul className="pl-6">
                                <li>
                                    <NavLink
                                        to="/dashboard/service-create"
                                        className={`${pathname === "/dashboard/service-create" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-3 py-2 flex items-center  rounded-lg text-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'}`}>Service Create</span>
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/all-services"
                                        className={`${pathname === "/dashboard/all-services" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-3 py-2 flex items-center  rounded-lg text-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'}`}>All Services</span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    {/* feedback Section */}
                    <li>
                        <div
                            className="flex justify-between items-center cursor-pointer px-3 py-2  rounded-lg"
                            onClick={() => handleMenuClick('feedback')}
                        >
                            <div className="flex items-center">
                                <MdOutlineManageSearch className='text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-3 font-bold text-white `}>Feedback</span>
                            </div>
                            {activeMenu === 'feedback' ? <MdExpandLess /> : <MdExpandMore />}
                        </div>

                        {activeMenu === 'feedback' && (
                            <ul className="pl-6">
                                <li>
                                    <NavLink
                                        to="/dashboard/feedback-create"
                                        className={`${pathname === "/dashboard/feedback-create" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-3 py-2 flex items-center  rounded-lg text-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'}`}>Create Feedback</span>
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/all-feedback"
                                        className={`${pathname === "/dashboard/all-feedback" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-3 py-2 flex items-center  rounded-lg text-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'}`}>All Feedback</span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    {/* blog Section */}
                    <li>
                        <div
                            className="flex justify-between items-center cursor-pointer px-3 py-2  rounded-lg"
                            onClick={() => handleMenuClick('blog')}
                        >
                            <div className="flex items-center">
                                <MdOutlineManageSearch className='text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-3 font-bold text-white `}>Blog</span>
                            </div>
                            {activeMenu === 'blog' ? <MdExpandLess /> : <MdExpandMore />}
                        </div>

                        {activeMenu === 'blog' && (
                            <ul className="pl-6">
                                <li>
                                    <NavLink
                                        to="/dashboard/blog-create"
                                        className={`${pathname === "/dashboard/blog-create" ? `bg-[#FF9100] text-[black] ` : `bg-[#D5ED9F]`} px-3 py-2 flex items-center  rounded-lg text-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'}`}>Create Blog</span>
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/all-blog"
                                        className={`${pathname === "/dashboard/all-blog" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-3 py-2 flex items-center  rounded-lg text-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'}`}>All Blog</span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* logo section */}
                    <li>
                        <div
                            className="flex justify-between items-center cursor-pointer px-3 py-2  rounded-lg"
                            onClick={() => handleMenuClick('logo')}
                        >
                            <div className="flex items-center">
                                <MdOutlineManageSearch className='text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-3 font-bold text-white `}>logo</span>
                            </div>
                            {activeMenu === 'logo' ? <MdExpandLess /> : <MdExpandMore />}
                        </div>

                        {activeMenu === 'logo' && (
                            <ul className="pl-6">
                                <li>
                                    <NavLink
                                        to="/dashboard/logo-upload"
                                        className={`${pathname === "/dashboard/logo-upload" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-3 py-2 flex items-center  rounded-lg text-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} `}>Logo Upload</span>
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/all-logo"
                                        className={`${pathname === "/dashboard/all-logo" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-3 py-2 flex items-center  rounded-lg text-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'}`}>All Logo</span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;