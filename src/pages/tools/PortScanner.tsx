import React, { useState } from 'react';
import { Wifi, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

const PortScanner: React.FC = () => {
  const [host, setHost] = useState('');
  const [portRange, setPortRange] = useState('80,443,21,22,25,53');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  const commonPorts = [
    { port: 21, service: 'FTP' },
    { port: 22, service: 'SSH' },
    { port: 25, service: 'SMTP' },
    { port: 53, service: 'DNS' },
    { port: 80, service: 'HTTP' },
    { port: 110, service: 'POP3' },
    { port: 143, service: 'IMAP' },
    { port: 443, service: 'HTTPS' },
    { port: 3306, service: 'MySQL' },
    { port: 3389, service: 'RDP' },
    { port: 5432, service: 'PostgreSQL' },
    { port: 8080, service: 'HTTP Alternate' }
  ];

  const handleScan = async () => {
    if (!host) {
      setError('Please enter a host (domain or IP address)');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);
    setScanProgress(0);

    try {
      // Parse port range
      const ports: number[] = [];
      const ranges = portRange.split(',').map(r => r.trim());
      
      for (const range of ranges) {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(Number);
          for (let i = start; i <= end; i++) {
            ports.push(i);
          }
        } else {
          ports.push(Number(range));
        }
      }

      // Filter out invalid ports
      const validPorts = ports.filter(p => !isNaN(p) && p > 0 && p < 65536);
      
      if (validPorts.length === 0) {
        setError('Please enter valid port numbers (1-65535)');
        setLoading(false);
        return;
      }

      // In a real application, port scanning would be done server-side
      // For this demo, we'll simulate results
      const scanResults = [];
      
      for (let i = 0; i < validPorts.length; i++) {
        const port = validPorts[i];
        
        // Update progress
        setScanProgress(Math.round(((i + 1) / validPorts.length) * 100));
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Simulate random port status (open/closed)
        // In a real scanner, this would be determined by actual connection attempts
        const isOpen = Math.random() > 0.7; // 30% chance of port being open for demo
        
        // Find service name if it's a common port
        const commonPort = commonPorts.find(p => p.port === port);
        const service = commonPort ? commonPort.service : 'Unknown';
        
        scanResults.push({
          port,
          status: isOpen ? 'open' : 'closed',
          service: isOpen ? service : '-'
        });
      }
      
      setResults(scanResults);
    } catch (err) {
      setError('Error scanning ports. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setScanProgress(100);
    }
  };

  const handleSetCommonPorts = () => {
    setPortRange(commonPorts.map(p => p.port).join(','));
  };

  return (
    <ToolLayout
      title="Port Scanner"
      description="Check which ports are open on a target server or IP address."
      icon={<Wifi className="h-8 w-8 text-blue-500" />}
    >
      <div className="p-6">
        {/* Input Form */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="host" className="block text-sm font-medium text-gray-400 mb-2">
                Host (Domain or IP)
              </label>
              <input
                type="text"
                id="host"
                value={host}
                onChange={(e) => setHost(e.target.value.trim())}
                placeholder="example.com or 192.168.1.1"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="port-range" className="block text-sm font-medium text-gray-400 mb-2">
                Port Range
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="port-range"
                  value={portRange}
                  onChange={(e) => setPortRange(e.target.value)}
                  placeholder="e.g., 80,443,8080 or 1-1000"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSetCommonPorts}
                  className="ml-2 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-3 rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                  Common Ports
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Comma-separated list or ranges (e.g., 80,443,8080 or 1-1000)
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <button
              onClick={handleScan}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? 'Scanning...' : 'Scan Ports'}
            </button>
          </div>
        </div>
        
        {/* Progress Bar (when scanning) */}
        {loading && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Scanning ports...</span>
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
            <h3 className="text-lg font-medium text-white mb-2">
              Scan Results for {host}
            </h3>
            <div className="bg-gray-700 border border-gray-600 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="py-2 px-4 text-left text-gray-300">Port</th>
                    <th className="py-2 px-4 text-left text-gray-300">Status</th>
                    <th className="py-2 px-4 text-left text-gray-300">Service</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-750'}>
                      <td className="py-2 px-4 text-gray-300">{result.port}</td>
                      <td className="py-2 px-4">
                        <span className={`flex items-center ${result.status === 'open' ? 'text-green-400' : 'text-red-400'}`}>
                          {result.status === 'open' ? (
                            <CheckCircle className="h-4 w-4 mr-1" />
                          ) : (
                            <XCircle className="h-4 w-4 mr-1" />
                          )}
                          {result.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-gray-300">{result.service}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-sm text-gray-400">
              <p>
                <span className="font-medium text-green-400 flex items-center inline-flex">
                  <CheckCircle className="h-4 w-4 mr-1" /> Open
                </span>
                {' '}ports may indicate services running on the target host.
              </p>
            </div>
          </div>
        )}
        
        {/* Info Box */}
        <div className="bg-gray-700/50 rounded-lg p-4 text-sm text-gray-300">
          <h3 className="font-medium text-white mb-2">About Port Scanning</h3>
          <p>
            Port scanning is a technique used to identify open ports and services running on a network host. Each port corresponds to a specific service or application.
          </p>
          <p className="mt-2">
            <span className="text-yellow-400">⚠️ Important:</span> Only scan hosts that you have permission to test. Unauthorized port scanning may be illegal in some jurisdictions.
          </p>
          <p className="mt-2">
            Common ports include:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
            {commonPorts.slice(0, 9).map(port => (
              <div key={port.port} className="text-xs">
                <span className="font-mono text-blue-400">{port.port}</span>: {port.service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PortScanner;