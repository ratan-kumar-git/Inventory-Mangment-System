import React from "react";
import {
  Package,
  Linkedin,
  Instagram,
  Phone,
  MapPin,
  MailIcon,
  Github,
} from "lucide-react";

const Footer = () => {
  const footerLinks = [
    { name: "Features", href: "#features" },
    { name: "Contact Us", href: "#" },
    { name: "About Us", href: "#" },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/ratan-kumar-git",
      label: "Github",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ratan-kumar-/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/ratan_the_coder/",
      label: "Instagram",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">InventoryPro</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Simplify stock tracking, billing, and sales with a powerful yet simple inventory platform built especially for small retailers.
            </p>
          </div>

          {/* Address Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Address
            </h3>
            <div className="flex items-center text-gray-400">
              <MailIcon className="w-4 h-4 mr-3" />
              <span>krratan80@gmail.com</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Phone className="w-4 h-4 mr-3" />
              <span>+91 8475784567</span>
            </div>
            <div className="flex items-center text-gray-400">
              <MapPin className="w-4 h-4 mr-3" />
              <span>Patna, Bihar</span>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 InventoryPro. All rights reserved. | Designed by{" "}
              <span className="font-medium text-white">Ratan Kumar</span>
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
