import React from 'react'
import DashboardLayout from '../components/layouts/DashboardLayout'

const Dashboard = () => {
  return (
    <DashboardLayout activeMenu="/dashboard" >
      <div className="flex-1 w-full ">
        <h1>Ratan </h1>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard