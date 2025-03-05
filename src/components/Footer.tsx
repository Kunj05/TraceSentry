import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center justify-center mx-20">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1 text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                DigitalInvestigator
              </span>
            </Link>
            <p className="text-gray-400 text-lg md:text-sm">
              Discover your digital footprint with our comprehensive suite of investigation tools.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 text-center md:text-left">
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  Tools
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1 text-center md:text-left">
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 text-center md:text-left">
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            
            <div className="flex items-center justify-center md:justify-start space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm md:text-base">
            &copy; {new Date().getFullYear()} DigitalInvestigator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
