import React from 'react'
import UserDashboard from '../component/UserDashboard'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
      <UserDashboard></UserDashboard>
      <Outlet></Outlet>
      
    </div>
  )
}

export default UserLayout
