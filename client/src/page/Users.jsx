import React from 'react'
import DashboardLayout from '../components/layouts/DashboardLayout'

const Users = () => {
  return (
    <DashboardLayout activeMenu="/users" >
      <div className="flex-1 w-full ">
        <h1>User</h1>
      </div>
    </DashboardLayout>
  )
}

export default Users