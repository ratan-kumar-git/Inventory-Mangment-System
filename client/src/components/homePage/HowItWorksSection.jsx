import React from 'react';
import { Upload, Settings, BarChart3, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Import Your Data',
      description: 'Easily upload your existing inventory data or start fresh with our intuitive setup wizard.',
      step: '01'
    },
    {
      icon: Settings,
      title: 'Configure Settings',
      description: 'Set up your categories, suppliers, reorder points, and customize the system to match your workflow.',
      step: '02'
    },
    {
      icon: BarChart3,
      title: 'Monitor & Analyze',
      description: 'Track real-time inventory levels, analyze trends, and get actionable insights to optimize your operations.',
      step: '03'
    },
    {
      icon: Rocket,
      title: 'Scale & Grow',
      description: 'Expand confidently with automated processes, advanced forecasting, and seamless integrations.',
      step: '04'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            How it works
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in minutes with our simple, four-step process
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  {/* Step Number */}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-xl font-bold mb-4 shadow-lg">
                    {step.step}
                    {/* Pulse Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-ping opacity-20"></div>
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white border-2 border-blue-200 rounded-lg mb-4 shadow-sm">
                    <step.icon className="w-6 h-6 text-blue-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Get Started Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;