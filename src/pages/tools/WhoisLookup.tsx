import React, { useState } from 'react';
import { Globe, AlertCircle } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

const WhoisLookup = () => {
  const [domain, setDomain] = useState('');
  const [whoisData, setWhoisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLookup = async () => {
    if (!domain) {
      setError('Please enter a domain name');
      return;
    }

    // Basic domain validation
    const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
    if (!domainRegex.test(domain)) {
      setError('Please enter a valid domain name (e.g., example.com)');
      return;
    }

    setLoading(true);
    setError('');
    setWhoisData(null);

    try {
      // Simulated API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWhoisData({
        registrarName: 'Example Registrar, LLC',
        expiresDate: '2025-01-01T00:00:00Z',
        registrantName: 'Domain Owner',
        registrantEmail: 'owner@example.com',
        createdDate: '2020-01-01T00:00:00Z',
        updatedDate: '2023-01-01T00:00:00Z',
        nameServers: ['ns1.example.com', 'ns2.example.com'],
        status: ['clientTransferProhibited', 'clientUpdateProhibited']
      });
    } catch (err) {
      setError('Error fetching WHOIS data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Domain WHOIS Lookup"
      description="Get domain registration information including registrar, expiry date, and owner details."
      icon={<Globe className="h-8 w-8 text-blue-500" />}
    >
      <div className="p-6">
        {/* Input Form */}
        <div className="mb-6">
          <label htmlFor="domain" className="block text-sm font-medium text-gray-400 mb-2">
            Domain Name
          </label>
          <div className="flex">
            <input
              type="text"
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value.trim().toLowerCase())}
              placeholder="example.com"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              onClick={handleLookup}
              disabled={loading}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? 'Looking up...' : 'Lookup Domain'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Enter a domain name without 'http://' or 'www' (e.g., example.com)
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 rounded-lg py-3 px-4 mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Results */}
        {whoisData && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-4">
              WHOIS Results for {domain}
            </h3>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-2 pr-4 text-gray-400">Registrar:</td>
                    <td className="py-2 text-gray-300">{whoisData.registrarName}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-400">Expiry Date:</td>
                    <td className="py-2 text-gray-300">{new Date(whoisData.expiresDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-400">Registrant:</td>
                    <td className="py-2 text-gray-300">{whoisData.registrantName}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-400">Email:</td>
                    <td className="py-2 text-gray-300">{whoisData.registrantEmail}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-400">Created:</td>
                    <td className="py-2 text-gray-300">{new Date(whoisData.createdDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-400">Updated:</td>
                    <td className="py-2 text-gray-300">{new Date(whoisData.updatedDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-400">Name Servers:</td>
                    <td className="py-2 text-gray-300">{whoisData.nameServers.join(', ')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-400">Status:</td>
                    <td className="py-2 text-gray-300">{whoisData.status.join(', ')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-gray-700/50 rounded-lg p-4 text-sm text-gray-300">
          <h3 className="font-medium text-white mb-2">About WHOIS Lookup</h3>
          <p>
            WHOIS is a query and response protocol used for querying databases that store information about registered users or assignees of Internet resources, including domain names and IP address blocks.
          </p>
          <p className="mt-2">
            The information typically includes:
          </p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Domain registration and expiry dates</li>
            <li>Registrar information</li>
            <li>Name server details</li>
            <li>Domain status codes</li>
          </ul>
          <p className="mt-2 text-yellow-400">
            ⚠️ Note: Some domain registrars may hide certain information for privacy reasons.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default WhoisLookup;