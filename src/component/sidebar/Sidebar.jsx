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
            className={`bg-grdate text-[black] transition-all duration-300 ${isSidebarOpen ? 'w-40  md:w-64' : 'w-14'}`}>
            <div className="flex justify-between items-center p-4 gap-8">
                <div className={`md:text-2xl text-[12px] font-bold ${!isSidebarOpen && 'hidden'}`}>
                    <NavLink className={"text-white"} to={"/dashboard"}><p>Mill-Hisab</p></NavLink>
                </div>
                <button onClick={toggleSidebar} className="text-[black] focus:outline-none">
                    {isSidebarOpen ? <IoCloseCircleOutline className='md:text-4xl text-xl ' /> : <MdMenuOpen className='text-3xl' />}
                </button>
            </div>

            <nav className="md:mt-10 space-y-2 md:space-y-4">
                <ul>
                    {/* border Section */}
                    <li>
                        <div
                            className="flex justify-between items-center cursor-pointer px-3 py-2  rounded-lg"
                            onClick={() => handleMenuClick('border')}
                        >
                            <div className="flex items-center">
                                <MdOutlineManageSearch className='text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} text-[10px] md:text-[17px]   ml-3 font-bold text-white `}>Border Info.</span>
                            </div>
                            {activeMenu === 'border' ? <MdExpandLess /> : <MdExpandMore />}
                        </div>

                        {activeMenu === 'border' && (
                            <ul className="md:pl-6 pl-3 md:my-3 my-2 ">
                                <li>
                                    <NavLink
                                        to="/dashboard/border-create"
                                        className={`${pathname === "/dashboard/border-create" ? ` text-textColor bg-[#FF9100] ` : `bg-[#D5ED9F] text-[black]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg `}
                                    >
                                        <MdAddCircleOutline className='md:text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}>Upload Border Info</span>
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/all-border"
                                        className={`${pathname === "/dashboard/all-border" ? `bg-[#FF9100]  text-[black]` : `bg-[#D5ED9F] text-[black]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg `}
                                    >
                                        <MdAddCircleOutline className='md:text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}>All Border Info</span>
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
                                <MdOutlineManageSearch className='md:text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} text-[10px] md:text-[17px]   ml-3 font-bold text-white`}>Rice Info.</span>
                            </div>
                            {activeMenu === 'rice-entry' ? <MdExpandLess /> : <MdExpandMore />}
                        </div>

                        {activeMenu === 'rice-entry' && (
                            <ul className="md:pl-6 pl-3 md:my-3 my-2 ">
                                <li>
                                    <NavLink
                                        to="/dashboard/rice-entry"
                                        className={`${pathname === "/dashboard/rice-entry" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F] text-[black]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='md:text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}>Rice Entry</span>
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/rice-calculation"
                                        className={`${pathname === "/dashboard/rice-calculation" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='md:text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold `}>Rice Calculation</span>
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/daily-rice-entry-form"
                                        className={`${pathname === "/dashboard/daily-rice-entry-form" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='md:text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}>Daily Rice Upload</span>
                                    </NavLink>
                                </li>

                            </ul>
                        )}
                    </li>

                    {/* Vegitable and  non-vegetarian Section */}
                    <li>
                        <div
                            className="flex justify-between items-center cursor-pointer px-3 py-2  rounded-lg"
                            onClick={() => handleMenuClick('vegetable')}
                        >
                            <div className="flex items-center">
                                <MdOutlineManageSearch className='text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} text-[10px] md:text-[17px]   ml-3 font-bold text-white`}>Mill Info.</span>
                            </div>
                            {activeMenu === 'vegetable' ? <MdExpandLess /> : <MdExpandMore />}
                        </div>

                        {activeMenu === 'vegetable' && (
                            <ul className="md:pl-6 pl-3 md:my-3 my-2 ">
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/vegetable-entry"
                                        className={`${pathname === "/dashboard/vegetable-entry" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}>Daily Mill Upload </span>
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/mill-calculaton"
                                        className={`${pathname === "/dashboard/mill-calculaton" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}>Mill Calculation</span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    {/* bazar Section */}
                    <li>
                        <div
                            className="flex justify-between items-center cursor-pointer px-3 py-2  rounded-lg"
                            onClick={() => handleMenuClick('bazar')}
                        >
                            <div className="flex items-center">
                                <MdOutlineManageSearch className='md:text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} text-[10px] md:text-[17px]   ml-3 font-bold text-white `}>Bazar Info. </span>
                            </div>
                            {activeMenu === 'bazar' ? <MdExpandLess /> : <MdExpandMore />}
                        </div>

                        {activeMenu === 'bazar' && (
                            <ul className="md:pl-6 pl-3 md:my-3 my-2  ">
                                <li>
                                    <NavLink
                                        to="/dashboard/bazar-insert"
                                        className={`${pathname === "/dashboard/bazar-insert" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}>Daily Bazar Upload</span>
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/calculation-bazar-border"
                                        className={`${pathname === "/dashboard/calculation-bazar-border" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}>Bazar Cal. Border </span>
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/calculation-bazar"
                                        className={`${pathname === "/dashboard/calculation-bazar" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}> Bazar Calculation </span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    {/* money Section */}
                    <li>
                        <div
                            className="flex justify-between items-center cursor-pointer px-3 py-2  rounded-lg"
                            onClick={() => handleMenuClick('money')}
                        >
                            <div className="flex items-center">
                                <MdOutlineManageSearch className='md:text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} text-[10px] md:text-[17px]   ml-3 font-bold text-white `}>Money Info. </span>
                            </div>
                            {activeMenu === 'money' ? <MdExpandLess /> : <MdExpandMore />}
                        </div>

                        {activeMenu === 'money' && (
                            <ul className="md:pl-6 pl-3 md:my-3 my-2 ">
                                <li>
                                    <NavLink
                                        to="/dashboard/entry-money"
                                        className={`${pathname === "/dashboard/entry-money" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}> Entry Money </span>
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/money-calculations"
                                        className={`${pathname === "/dashboard/money-calculations" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}>Money Calculation</span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* 30 days section*/}
                    <li>
                        <div
                            className="flex justify-between items-center cursor-pointer px-3 py-2  rounded-lg"
                            onClick={() => handleMenuClick('calculation')}
                        >
                            <div className="flex items-center">
                                <MdOutlineManageSearch className='md:text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} text-[10px] md:text-[17px]   ml-3 font-bold text-white`}>Thirty days cal.</span>
                            </div>
                            {activeMenu === 'calculation' ? <MdExpandLess /> : <MdExpandMore />}
                        </div>

                        {activeMenu === 'calculation' && (
                            <ul className="md:pl-6 pl-3 md:my-3 my-2 ">
                                <li>
                                    <NavLink
                                        to="/dashboard/thiry-days-money-calculation"
                                        className={`${pathname === "/dashboard/thiry-days-money-calculation" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}> Money Calculation </span>
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/thiry-days-rice-calculation"
                                        className={`${pathname === "/dashboard/thiry-days-rice-calculation" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}>Rice Calculation </span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    
                    <li>
                        <div
                            className="flex justify-between items-center cursor-pointer px-3 py-2  rounded-lg"
                            onClick={() => handleMenuClick('former-border')}
                        >
                            <div className="flex items-center">
                                <MdOutlineManageSearch className='text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} text-[10px] md:text-[17px]   ml-3 font-bold text-white `}>Former Border</span>
                            </div>
                            {activeMenu === 'former-border' ? <MdExpandLess /> : <MdExpandMore />}
                        </div>

                        {activeMenu === 'former-border' && (
                            <ul className="md:pl-6 pl-3 md:my-3 my-2 ">
                                <li>
                                    <NavLink
                                        to="/dashboard/former-border-list"
                                        className={`${pathname === "/dashboard/former-border-list" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}> Former Border List </span>
                                    </NavLink>
                                </li>

                            </ul>
                        )}
                    </li>
                    <li>
                        <div
                            className="flex justify-between items-center cursor-pointer px-3 py-2  rounded-lg"
                            onClick={() => handleMenuClick('user-list')}
                        >
                            <div className="flex items-center">
                                <MdOutlineManageSearch className='text-xl' />
                                <span className={`${isSidebarOpen ? 'block' : 'hidden'} text-[10px] md:text-[17px]   ml-3 font-bold text-white `}>User</span>
                            </div>
                            {activeMenu === 'user-list' ? <MdExpandLess /> : <MdExpandMore />}
                        </div>

                        {activeMenu === 'user-list' && (
                            <ul className="md:pl-6 pl-3 md:my-3 my-2 ">
                                <li>
                                    <NavLink
                                        to="/dashboard/user-list"
                                        className={`${pathname === "/dashboard/user-list" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`}  px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='md:text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'}  text-[8px] md:text-sm font-bold`}> User List </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/disable-user-list"
                                        className={`${pathname === "/dashboard/disable-user-list" ? `bg-[#FF9100] text-[black]` : `bg-[#D5ED9F]`} my-4 px-2 py-1 md:px-3 md:py-2 flex items-center  rounded-lg`}
                                    >
                                        <MdAddCircleOutline className='md:text-xl' />
                                        <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} text-[8px] md:text-sm font-bold`}>Disable User </span>
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