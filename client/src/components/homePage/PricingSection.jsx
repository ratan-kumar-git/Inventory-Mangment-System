import React from 'react';
import { Check, Star, Zap } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small businesses and startups',
      features: [
        'Up to 1,000 products',
        'Basic reporting',
        'Email support',
        'Mobile app access',
        '2 user accounts',
        'Standard integrations'
      ],
      isPopular: false,
      ctaText: 'Start Free Trial',
      ctaStyle: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 10,000 products',
        'Advanced analytics',
        'Priority support',
        'Mobile app access',
        '10 user accounts',
        'All integrations',
        'Custom reports',
        'Multi-location support'
      ],
      isPopular: true,
      ctaText: 'Start Free Trial',
      ctaStyle: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl transform hover:-translate-y-1'
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      description: 'For large organizations with complex needs',
      features: [
        'Unlimited products',
        'Custom analytics',
        '24/7 phone support',
        'Mobile app access',
        'Unlimited users',
        'Custom integrations',
        'White-label options',
        'Dedicated account manager',
        'Advanced security',
        'Custom workflows'
      ],
      isPopular: false,
      ctaText: 'Contact Sales',
      ctaStyle: 'border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your business needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 transform hover:-translate-y-2 ${
                plan.isPopular ? 'ring-2 ring-blue-600 scale-105' : 'hover:shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-xl text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${plan.ctaStyle}`}>
                {plan.ctaText}
              </button>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 rounded-full px-6 py-3">
            <Zap className="w-5 h-5 mr-2" />
            30-day money-back guarantee on all plans
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;