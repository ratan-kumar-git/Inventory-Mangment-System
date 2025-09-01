import React from "react";
import {
  BarChart3,
  Shield,
  Package,
  Receipt,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Dashboard Analytics",
      description:
        "View real-time insights into inventory levels, sales performance, low stock items, and daily activity all in one place.",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Package,
      title: "Product Management",
      description:
        "Easily add, update, and organize products with details such as pricing, stock quantity, and supplier information.",
      color: "from-emerald-600 to-emerald-700",
    },
    {
      icon: Receipt,
      title: "Billing & Sales",
      description:
        "Generate invoices, record transactions, and track customer billing seamlessly with an integrated sales module.",
      color: "from-purple-600 to-purple-700",
    },
    {
      icon: Shield,
      title: "Secure Data",
      description:
        "Protect sensitive business information with encryption, user access control, and automated data backups.",
      color: "from-red-600 to-red-700",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Everything you need to manage inventory
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to simplify inventory management and
            boost your business efficiency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div
                className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
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
