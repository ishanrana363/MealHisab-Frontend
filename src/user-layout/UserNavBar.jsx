// import React from 'react';
// import { FaUserCircle } from 'react-icons/fa';

// const Navbar = () => {
//     return (
//         <nav className="bg-blue-600 text-white shadow-md">
//             <div className="">
//                 <div className="flex justify-center items-center h-16">
//                     {/* Logo */}
//                     <div className="text-2xl font-bold">
//                         <a href="/" className="text-white">MyWebsite</a>
//                     </div>

//                     {/* Navbar Links */}
//                     <div className="hidden md:flex space-x-8 items-center">
//                         {/* User Profile */}
//                         <a href="/user-profile" className="relative flex items-center space-x-1 hover:text-blue-300 group">
//                             <FaUserCircle className="text-lg" />
//                             <span>User Profile</span>
//                             {/* Underline effect */}
//                             <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
//                         </a>

//                         {/* Contact Us */}
//                         <a href="/contact-us" className="relative hover:text-blue-300 group">
//                             Contact Us
//                             {/* Underline effect */}
//                             <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
//                         </a>

//                         {/* Service Dropdown */}
//                         <div className="relative group">
//                             <button className="relative hover:text-blue-300 group">
//                                 Service
//                                 {/* Underline effect for main Service button */}
//                                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
//                             </button>

//                             {/* Dropdown menu with zoom-in animation */}
//                             <div className="absolute left-0 mt-2 bg-white text-blue-600 rounded-md shadow-lg w-52 opacity-0 transform scale-95 translate-y-2 
//                                 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 
//                                 transition-all duration-300 ease-out">
//                                 <a
//                                     href="/service1"
//                                     className="block px-4 py-2 hover:bg-blue-100 relative group transform scale-95 hover:scale-105 transition-all duration-300 ease-out"
//                                 >
//                                     Service 1
//                                     {/* Underline effect for Service 1 */}
//                                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
//                                 </a>
//                                 <a
//                                     href="/service2"
//                                     className="block px-4 py-2 hover:bg-blue-100 relative group transform scale-95 hover:scale-105 transition-all duration-300 ease-out"
//                                 >
//                                     Service 2
//                                     {/* Underline effect for Service 2 */}
//                                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
