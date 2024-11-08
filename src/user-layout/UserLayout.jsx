import { Outlet } from 'react-router-dom'
import Navbar from './UserNavBar';

const UserLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      
    </div>
  )
}

export default UserLayout
