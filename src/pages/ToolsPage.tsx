import React, { useState } from 'react';
import { Globe, Mail, Code, Search, Wifi, Server } from 'lucide-react';
import ToolCard from '../components/ToolCard';

const ToolsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Tools', icon: null },
    { id: 'geo', name: 'Geo Location', icon: <Globe className="h-5 w-5" /> },
    { id: 'email', name: 'Email & Domain', icon: <Mail className="h-5 w-5" /> },
    { id: 'encoding', name: 'Encoding & Decoding', icon: <Code className="h-5 w-5" /> },
    { id: 'network', name: 'Network & Cyber', icon: <Wifi className="h-5 w-5" /> }
  ];

  const tools = [
    {
      id: 'ip-lookup',
      name: 'IP Lookup',
      description: 'Quickly find details about an IP address including location, ISP, and more.',
      category: 'geo',
      icon: <Globe className="h-6 w-6 text-blue-500" />
    },
    {
      id: 'satellite-view',
      name: 'Satellite Street View',
      description: 'Find street-level satellite views based on location coordinates.',
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
      id: 'jwt',
      name: 'JWT Decoder',
      description: 'Decode JSON Web Tokens to inspect claims, headers, and more.',
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
    {
      id: 'port-scanner',
      name: 'Port Scanner',
      description: 'Check which ports are open on a target server or IP address.',
      category: 'network',
      icon: <Wifi className="h-6 w-6 text-blue-500" />
    },
    {
      id: 'subdomain-finder',
      name: 'Subdomain Finder',
      description: 'Discover subdomains for a given domain name using various techniques.',
      category: 'network',
      icon: <Server className="h-6 w-6 text-blue-500" />
    }
  ];

  // Filter tools based on active category and search query
  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Digital Investigation <span className="text-blue-500">Tools</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our comprehensive collection of tools designed to help you investigate, decode, and track digital information.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-10 relative">
            <input
              type="text"
              placeholder="Search for tools..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.icon && <span className="mr-2">{category.icon}</span>}
                {category.name}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No tools found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;