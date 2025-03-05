import React from 'react';
import { Shield, Lock, Search, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="py-12 bg-gray-900 ">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              About <span className="text-blue-500">DigitalInvestigator</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Learn more about our mission to provide accessible digital investigation tools for everyone.
            </p>
          </div>

          {/* About Content */}
          <div className="bg-gray-800 rounded-xl p-8 mb-12 border border-gray-700 ">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              At DigitalInvestigator, we believe that digital investigation tools should be accessible to everyone. 
              Whether you're a security professional, researcher, or just curious about the digital world, 
              our platform provides the tools you need to explore, investigate, and understand digital information.
            </p>
            <p className="text-gray-300">
              Our suite of tools is designed to be powerful yet easy to use, allowing anyone to perform 
              sophisticated digital investigations without specialized knowledge or expensive software.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="bg-gray-900/50 p-3 rounded-lg inline-block mb-4">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Privacy-Focused</h3>
              <p className="text-gray-400">
                We prioritize your privacy. All tools run in your browser, and we don't store any of your data or search queries.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="bg-gray-900/50 p-3 rounded-lg inline-block mb-4">
                <Lock className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure & Reliable</h3>
              <p className="text-gray-400">
                Our tools are built with security in mind, ensuring that your investigations are conducted safely and reliably.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="bg-gray-900/50 p-3 rounded-lg inline-block mb-4">
                <Search className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Tools</h3>
              <p className="text-gray-400">
                From IP lookups to encoding/decoding utilities, we offer a wide range of tools to meet all your digital investigation needs.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="bg-gray-900/50 p-3 rounded-lg inline-block mb-4">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Community-Driven</h3>
              <p className="text-gray-400">
                We're constantly improving our platform based on user feedback and community suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;