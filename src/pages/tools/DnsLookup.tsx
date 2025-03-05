import React, { useState } from 'react';
import { Server, AlertCircle } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import axios from 'axios';

const DnsLookup: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SOA', 'SRV'];

  const handleLookup = async () => {
    if (!domain) {
      setError('Please enter a domain name');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // This is a mock API call - in a real application, you would use a real DNS API
      // For demonstration purposes, we'll simulate a response
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response based on record type
      let mockResponse;
      
      switch (recordType) {
        case 'A':
          mockResponse = {
            records: [
              { value: '192.168.1.1', ttl: 3600 },
              { value: '192.168.1.2', ttl: 3600 }
            ]
          };
          break;
        case 'MX':
          mockResponse = {
            records: [
              { priority: 10, value: 'mail.example.com', ttl: 3600 },
              { priority: 20, value: 'mail2.example.com', ttl: 3600 }
            ]
          };
          break;
        case 'NS':
          mockResponse = {
            records: [
              { value: 'ns1.example.com', ttl: 86400 },
              { value: 'ns2.example.com', ttl: 86400 }
            ]
          };
          break;
        case 'TXT':
          mockResponse = {
            records: [
              { value: 'v=spf1 include:_spf.example.com ~all', ttl: 3600 },
              { value: 'google-site-verification=abcdefghijklmnopqrstuvwxyz', ttl: 3600 }
            ]
          };
          break;
        default:
          mockResponse = {
            records: [
              { value: 'example-record.com', ttl: 3600 }
            ]
          };
      }
      
      setResults(mockResponse);
    } catch (err) {
      setError('Error performing DNS lookup. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderResults = () => {
    if (!results || !results.records || results.records.length === 0) {
      return <p className="text-gray-400">No records found.</p>;
    }

    return (
      <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-600">
              {recordType === 'MX' && <th className="py-2 px-4 text-left text-gray-300">Priority</th>}
              <th className="py-2 px-4 text-left text-gray-300">Value</th>
              <th className="py-2 px-4 text-left text-gray-300">TTL</th>
            </tr>
          </thead>
          <tbody>
            {results.records.map((record: any, index: number) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-750'}>
                {recordType === 'MX' && <td className="py-2 px-4 text-gray-300">{record.priority}</td>}
                <td className="py-2 px-4 text-gray-300 font-mono">{record.value}</td>
                <td className="py-2 px-4 text-gray-300">{record.ttl}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <ToolLayout
      title="DNS Lookup"
      description="Query DNS records for a domain including A, MX, NS, TXT, and more."
      icon={<Server className="h-8 w-8 text-blue-500" />}
    >
      <div className="p-6">
        {/* Input Form */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="domain" className="block text-sm font-medium text-gray-400 mb-2">
                Domain Name
              </label>
              <input
                type="text"
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value.trim())}
                placeholder="example.com"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="record-type" className="block text-sm font-medium text-gray-400 mb-2">
                Record Type
              </label>
              <select
                id="record-type"
                value={recordType}
                onChange={(e) => setRecordType(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {recordTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <button
              onClick={handleLookup}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? 'Looking up...' : 'Lookup DNS'}
            </button>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 rounded-lg py-3 px-4 mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {/* Results */}
        {results && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-2">
              {recordType} Records for {domain}
            </h3>
            {renderResults()}
          </div>
        )}
        
        {/* Info Box */}
        <div className="bg-gray-700/50 rounded-lg p-4 text-sm text-gray-300">
          <h3 className="font-medium text-white mb-2">About DNS Records</h3>
          <p>
            DNS (Domain Name System) records are instructions that live in authoritative DNS servers and provide information about a domain including IP addresses, mail servers, and more.
          </p>
          <p className="mt-2">
            Common record types include:
          </p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li><span className="font-mono text-blue-400">A</span> - Maps a domain to an IPv4 address</li>
            <li><span className="font-mono text-blue-400">AAAA</span> - Maps a domain to an IPv6 address</li>
            <li><span className="font-mono text-blue-400">CNAME</span> - Creates an alias for another domain</li>
            <li><span className="font-mono text-blue-400">MX</span> - Specifies mail servers for the domain</li>
            <li><span className="font-mono text-blue-400">TXT</span> - Stores text information (often used for verification)</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
};

export default DnsLookup;