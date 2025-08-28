import React from 'react'
import DashboardLayout from '../components/layouts/DashboardLayout'

const Products = () => {
  return (
    <DashboardLayout activeMenu="/products" >
      <div className="flex-1 w-full ">
        <h1>Products </h1>
      </div>
    </DashboardLayout>
  )
}

export default Products