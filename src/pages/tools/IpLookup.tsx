import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToolLayout from '../../components/ToolLayout';
import { Globe, AlertCircle, MapPin } from 'lucide-react';

const IpLookup: React.FC = () => {
  const [ip, setIp] = useState('');
  const [ipData, setIpData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Using free, public APIs for IP detection and lookup
  const IP_DETECT_API = 'https://api.ipify.org?format=json';
  const IP_DETAILS_API = 'https://ipapi.co/';

  useEffect(() => {
    const fetchUserIp = async () => {
      setLoading(true);
      setError('');

      try {
        // Step 1: Get user's IP
        const ipResponse = await axios.get(IP_DETECT_API);
        const userIp = ipResponse.data.ip;
        setIp(userIp);

        // Step 2: Fetch details for that IP
        await lookupIp(userIp);
      } catch (err) {
        setError('Error fetching IP data. Try manually entering an IP.');
        console.error('Error fetching IP:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserIp();
  }, []); // Empty dependency array = runs once on mount

  // Function to lookup IP details
  const lookupIp = async (ipAddress: string) => {
    try {
      const response = await axios.get(`${IP_DETAILS_API}${ipAddress}/json/`);
      setIpData(response.data);
    } catch (err) {
      setError('Error fetching IP details. Please try again.');
      console.error('Error fetching IP details:', err);
    }
  };

  // Handle manual lookup when user clicks "Lookup"
  const handleLookup = async () => {
    if (!ip) {
      setError('Please enter an IP address');
      return;
    }

    // Basic IP validation (IPv4 only for simplicity)
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipRegex.test(ip)) {
      setError('Please enter a valid IPv4 address');
      return;
    }

    setLoading(true);
    setError('');
    setIpData(null);

    try {
      await lookupIp(ip);
    } catch (err) {
      setError('Error fetching IP data. Please try again.');
      console.error('Error in handleLookup:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="IP Lookup"
      description="Quickly find details about an IP address including location, ISP, and more."
      icon={<Globe className="h-8 w-8 text-blue-500" />}
    >
      <div className="p-6">
        {/* Input Form */}
        <div className="mb-6">
          <label htmlFor="ip-address" className="block text-sm font-medium text-gray-400 mb-2">
            IP Address
          </label>
          <div className="flex">
            <input
              type="text"
              id="ip-address"
              value={ip}
              onChange={(e) => setIp(e.target.value.trim())}
              placeholder="e.g., 8.8.8.8"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              onClick={handleLookup}
              disabled={loading}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? 'Looking up...' : 'Lookup IP'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Your IP is auto-detected. Enter a different IP to look up its details.
          </p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 rounded-lg py-3 px-4 mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {/* Loading State */}
        {loading && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-r-2 border-blue-500 border-b-2 border-transparent"></div>
            <p className="mt-2 text-gray-400">Fetching IP information...</p>
          </div>
        )}
        
        {/* Results */}
        {ipData && !loading && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-4">
              IP Details for {ip}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Location Information */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                  <h4 className="text-white font-medium">Location Information</h4>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 pr-4 text-gray-400">City:</td>
                      <td className="py-1 text-gray-300">{ipData.city || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-400">Region:</td>
                      <td className="py-1 text-gray-300">{ipData.region || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-400">Country:</td>
                      <td className="py-1 text-gray-300">{ipData.country_name || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-400">Postal Code:</td>
                      <td className="py-1 text-gray-300">{ipData.postal || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-400">Coordinates:</td>
                      <td className="py-1 text-gray-300">
                        {ipData.latitude ? `${ipData.latitude}, ${ipData.longitude}` : 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-400">Timezone:</td>
                      <td className="py-1 text-gray-300">{ipData.timezone || 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Network Information */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe className="h-5 w-5 text-blue-500 mr-2" />
                  <h4 className="text-white font-medium">Network Information</h4>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 pr-4 text-gray-400">IP:</td>
                      <td className="py-1 text-gray-300">{ipData.ip || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-400">ISP:</td>
                      <td className="py-1 text-gray-300">{ipData.org || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-400">ASN:</td>
                      <td className="py-1 text-gray-300">{ipData.asn || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4 text-gray-400">Connection:</td>
                      <td className="py-1 text-gray-300">{ipData.network || 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Info Box */}
        <div className="bg-gray-700/50 rounded-lg p-4 text-sm text-gray-300">
          <h3 className="font-medium text-white mb-2">About IP Lookup</h3>
          <p>
            IP lookup tools provide information about an IP address, including its geographical location, ISP (Internet Service Provider), and other network details.
          </p>
          <p className="mt-2">
            Common uses include:
          </p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Identifying the source of website visitors</li>
            <li>Troubleshooting network issues</li>
            <li>Investigating suspicious network activity</li>
            <li>Verifying VPN or proxy usage</li>
          </ul>
          <p className="mt-2 text-yellow-400">
            ⚠️ Note: IP geolocation is not always 100% accurate and should be used as an approximation.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default IpLookup;