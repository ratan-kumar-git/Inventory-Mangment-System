import React from 'react'
import DashboardLayout from './layouts/DashboardLayout'
import { Loader } from 'lucide-react'

const ContentLoader = ({ activeMenu, message}) => {
  return (
      <DashboardLayout activeMenu={activeMenu}>
        <div className="w-full h-full flex justify-center items-center gap-2 bg-gray-50">
          <Loader className="size-10 animate-spin" />
          <p className="text-lg">{message}</p>
        </div>
      </DashboardLayout>
  )
}

export default ContentLoader