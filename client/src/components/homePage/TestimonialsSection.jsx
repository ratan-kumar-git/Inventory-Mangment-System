import React from "react";
import { Star, Quote } from "lucide-react";
import person1 from "../../assets/person1.webp";
import person2 from "../../assets/person2.webp";
import person3 from "../../assets/person3.webp";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Nair ",
      role: "Store Owner",
      company: "Verma Electronics",
      avatar: person1,
      content:
        "The dashboard gives me a clear picture of daily sales and stock levels. Managing my store has never been this easy and stress-free.",
      rating: 5,
    },
    {
      name: "Ankit Verma",
      role: "Accounts Manager",
      company: "Nair Mart",
      avatar: person2,
      content:
        "Billing is super smooth now. Invoices are generated instantly, and I can track all transactions without errors. It has saved me hours every week.",
      rating: 5,
    },
    {
      name: "Neha Kapoor",
      role: "Operations Head",
      company: "Sharma Retail Hub",
      avatar: person3,
      content:
        "Product management is effortless. Adding items, updating stock, and setting reorder alerts have streamlined our entire workflow.",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Trusted by industry
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            See how companies like yours are transforming their inventory
            management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <Quote className="w-8 h-8 text-blue-200" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
