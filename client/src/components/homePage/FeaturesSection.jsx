import React from 'react';
import { 
  BarChart3, 
  Bell, 
  Smartphone, 
  Shield, 
  Zap, 
  Globe,
  Users,
  TrendingUp
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Get instant insights into your inventory levels, sales trends, and performance metrics with our advanced analytics dashboard.',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Never run out of stock again. Receive intelligent notifications when inventory levels are low or when restocking is needed.',
      color: 'from-emerald-600 to-emerald-700'
    },
    {
      icon: Smartphone,
      title: 'Mobile Access',
      description: 'Manage your inventory on the go with our responsive mobile interface. Access everything from your phone or tablet.',
      color: 'from-purple-600 to-purple-700'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Your data is protected with bank-level security, including encryption, secure backups, and compliance certifications.',
      color: 'from-red-600 to-red-700'
    },
    {
      icon: Zap,
      title: 'Automated Workflows',
      description: 'Streamline operations with automated purchase orders, vendor management, and seamless integrations with your existing tools.',
      color: 'from-yellow-600 to-yellow-700'
    },
    {
      icon: Globe,
      title: 'Multi-location Support',
      description: 'Manage inventory across multiple warehouses, stores, and locations from a single, centralized platform.',
      color: 'from-indigo-600 to-indigo-700'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Enable seamless collaboration with role-based access, team assignments, and real-time updates across your organization.',
      color: 'from-teal-600 to-teal-700'
    },
    {
      icon: TrendingUp,
      title: 'Demand Forecasting',
      description: 'Predict future inventory needs with AI-powered forecasting to optimize stock levels and reduce carrying costs.',
      color: 'from-pink-600 to-pink-700'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Everything you need to manage inventory
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to simplify inventory management and boost your business efficiency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;