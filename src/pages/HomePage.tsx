import { Link } from 'react-router-dom';
import { Globe, Mail, Code, ChevronRight, Server } from 'lucide-react';
import ToolCard from '../components/ToolCard';
import { useEffect } from 'react';

const HomePage = () => {

  const tools = [
    {
      id: 'ip-lookup',
      name: 'IP Lookup',
      description: 'Quickly find details about an IP address including location, ISP, and more.',
      category: 'geo',
      icon: <Globe className="h-6 w-6 text-blue-500" />
    },
    {
      id: 'domain-whois',
      name: 'Domain WHOIS Lookup',
      description: 'Get domain registration information including registrar, expiry date, and owner details.',
      category: 'email',
      icon: <Mail className="h-6 w-6 text-blue-500" />
    },
    {
      id: 'email-validator',
      name: 'Email Validator',
      description: 'Validate email addresses and check for authenticity and deliverability.',
      category: 'email',
      icon: <Mail className="h-6 w-6 text-blue-500" />
    },
    {
      id: 'base64',
      name: 'Base64 Encoder/Decoder',
      description: 'Easily encode or decode Base64 data with this simple tool.',
      category: 'encoding',
      icon: <Code className="h-6 w-6 text-blue-500" />
    },
    {
      id: 'hex',
      name: 'Hex Encoder/Decoder',
      description: 'Convert data to and from hexadecimal format quickly and easily.',
      category: 'encoding',
      icon: <Code className="h-6 w-6 text-blue-500" />
    },
    {
      id: 'dns-lookup',
      name: 'DNS Lookup',
      description: 'Query DNS records for a domain including A, MX, NS, TXT, and more.',
      category: 'network',
      icon: <Server className="h-6 w-6 text-blue-500" />
    },
  ];

  return (
    <div className="relative">
      {/* Matrix Rain Background */}
      <canvas id="matrix-bg" className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="glitch-wrapper mb-6">
              <h1 className="text-4xl md:text-5xl font-bold glitch-text">
                Discover Your Digital Footprint
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 typing-text">
              Easily investigate, decode, and track information online with our comprehensive suite of digital tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/tools"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center group"
              >
                Explore Tools
                <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#tools-section"
                className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center border border-gray-700 hover:border-gray-600"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools-section" className="py-16 bg-gray-900/95 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">
                Our <span className="text-blue-500 glitch-text-small">Top Investigation</span> Tools
              </h2>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
            <div className='flex justify-center items-center mt-8'>
              <Link
                to="/tools"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center group"
              >
                All Tools
                <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6 glitch-text-small">
              Ready to Investigate?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Our comprehensive suite of tools is designed to help you uncover digital information quickly and efficiently.
            </p>
            <Link
              to="/tools"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center group"
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;