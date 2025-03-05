import React, { useState } from 'react';
import { Server, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

const SubdomainFinder: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  // Mock list of common subdomains for demonstration
  const commonSubdomains = [
    'www', 'mail', 'ftp', 'webmail', 'login', 'admin', 'shop',
    'blog', 'dev', 'api', 'secure', 'vpn', 'cdn', 'media',
    'images', 'video', 'support', 'help', 'portal', 'forum',
    'store', 'app', 'mobile', 'beta', 'staging', 'test', 'demo',
    'docs', 'status', 'git', 'wiki', 'news', 'cloud', 'auth'
  ];

  const handleSearch = async () => {
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
    setError(null);
    setResults([]);
    setScanProgress(0);

    try {
      // In a real application, this would call an API to perform subdomain enumeration
      // For this demo, we'll simulate finding subdomains
      
      // Randomly select some subdomains to "discover"
      const foundSubdomains: string[] = [];
      const shuffledSubdomains = [...commonSubdomains].sort(() => 0.5 - Math.random());
      const numToFind = Math.floor(Math.random() * 15) + 5; // Find between 5-20 subdomains
      
      for (let i = 0; i < Math.min(numToFind, shuffledSubdomains.length); i++) {
        // Update progress
        setScanProgress(Math.round(((i + 1) / numToFind) * 100));
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 150));
        
        foundSubdomains.push(`${shuffledSubdomains[i]}.${domain}`);
      }
      
      // Sort alphabetically
      setResults(foundSubdomains.sort());
    } catch (err) {
      setError('Error finding subdomains. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setScanProgress(100);
    }
  };

  const handleCopyAll = () => {
    if (results.length > 0) {
      navigator.clipboard.writeText(results.join('\n'));
      alert('All subdomains copied to clipboard!');
    }
  };

  return (
    <ToolLayout
      title="Subdomain Finder"
      description="Discover subdomains for a given domain name using various techniques."
      icon={<Server className="h-8 w-8 text-blue-500" />}
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
              onClick={handleSearch}
              disabled={loading}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? 'Searching...' : 'Find Subdomains'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Enter a domain name without 'http://' or 'www' (e.g., example.com)
          </p>
        </div>
        
        {/* Progress Bar (when scanning) */}
        {loading && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Searching for subdomains...</span>
              <span>{scanProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 rounded-lg py-3 px-4 mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {/* Results */}
        {results.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-white">
                Found {results.length} Subdomains for {domain}
              </h3>
              <button
                onClick={handleCopyAll}
                className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-1 px-3 rounded text-sm flex items-center transition-colors"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy All
              </button>
            </div>
            
            <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 max-h-80 overflow-y-auto">
              <ul className="space-y-2">
                {results.map((subdomain, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-gray-300 font-mono">{subdomain}</span>
                    <a
                      href={`https://${subdomain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {/* Info Box */}
        <div className="bg-gray-700/50 rounded-lg p-4 text-sm text-gray-300">
          <h3 className="font-medium text-white mb-2">About Subdomain Discovery</h3>
          <p>
            Subdomain discovery is the process of finding all subdomains associated with a main domain. This can be useful for security assessments, digital footprinting, and understanding the attack surface of an organization.
          </p>
          <p className="mt-2">
            Common techniques for finding subdomains include:
          </p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>DNS brute forcing with common subdomain wordlists</li>
            <li>Certificate transparency logs</li>
            <li>Search engine results</li>
            <li>Public datasets and archives</li>
            <li>DNS zone transfers (when misconfigured)</li>
          </ul>
          <p className="mt-2 text-yellow-400">
            ⚠️ Note: Only use this tool on domains you own or have permission to test.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default SubdomainFinder;