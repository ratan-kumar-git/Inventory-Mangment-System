import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Boxes, LayoutDashboardIcon, Play, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-10 pb-16 lg:pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:max-w-none lg:mx-0">
            {/* Badge */}
            <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              #1 Inventory Management Platform
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              Streamline Your
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Inventory Management
              </span>
            </h1>

            <p className="mt-6 text-xl text-gray-600 sm:max-w-3xl">
              Take control of your inventory with our intelligent management system.
              Track stock levels, automate reorders, and optimize your supply chain with real-time insights.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start sm:space-x-4">
              <Link to="/signup" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/login" className="w-full sm:w-auto mt-3 sm:mt-0 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center justify-center">
                <LayoutDashboardIcon className="mr-2 w-5 h-5" />
                Dashboard
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            {/* Dashboard Preview */}
            <div className="relative mx-auto w-full rounded-lg shadow-2xl lg:max-w-md">
              <div className="bg-white rounded-lg p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Dashboard Overview</h3>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Boxes className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-sm font-medium text-gray-900">Total Items</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">2,847</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div className="flex items-center">
                      <BarChart3 className="w-5 h-5 text-emerald-600 mr-3" />
                      <span className="text-sm font-medium text-gray-900">Low Stock Alerts</span>
                    </div>
                    <span className="text-2xl font-bold text-emerald-600">12</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600">This Week</div>
                      <div className="text-lg font-bold text-gray-900">+284</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600">Revenue</div>
                      <div className="text-lg font-bold text-gray-900">$52.3K</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;