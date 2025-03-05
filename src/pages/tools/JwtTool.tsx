import React, { useState } from 'react';
import { Code, AlertCircle } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import ToolLayout from '../../components/ToolLayout';

interface JwtHeader {
  alg: string;
  typ: string;
  [key: string]: any;
}

interface JwtPayload {
  [key: string]: any;
}

const JwtTool: React.FC = () => {
  const [jwtToken, setJwtToken] = useState('');
  const [decodedHeader, setDecodedHeader] = useState<JwtHeader | null>(null);
  const [decodedPayload, setDecodedPayload] = useState<JwtPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const token = e.target.value.trim();
    setJwtToken(token);
    
    if (!token) {
      setDecodedHeader(null);
      setDecodedPayload(null);
      setError(null);
      return;
    }
    
    try {
      // Decode the header
      const header = jwtDecode<JwtHeader>(token, { header: true });
      setDecodedHeader(header);
      
      // Decode the payload
      const payload = jwtDecode<JwtPayload>(token);
      setDecodedPayload(payload);
      
      setError(null);
    } catch (e) {
      setDecodedHeader(null);
      setDecodedPayload(null);
      if (e instanceof Error) {
        setError(`Error: ${e.message}`);
      } else {
        setError('Error: Invalid JWT token');
      }
    }
  };

  const handleClear = () => {
    setJwtToken('');
    setDecodedHeader(null);
    setDecodedPayload(null);
    setError(null);
  };

  const formatJson = (obj: any) => {
    return JSON.stringify(obj, null, 2);
  };

  const isExpired = (payload: JwtPayload) => {
    if (!payload.exp) return false;
    
    const expirationDate = new Date(payload.exp * 1000);
    const now = new Date();
    
    return now > expirationDate;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode JSON Web Tokens to inspect claims, headers, and more."
      icon={<Code className="h-8 w-8 text-blue-500" />}
    >
      <div className="p-6">
        {/* Input */}
        <div className="mb-6">
          <label htmlFor="jwt-input" className="block text-sm font-medium text-gray-400 mb-2">
            JWT Token
          </label>
          <textarea
            id="jwt-input"
            value={jwtToken}
            onChange={handleInputChange}
            placeholder="Enter JWT token to decode..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] font-mono text-sm"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleClear}
              disabled={!jwtToken}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear
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
        
        {/* Decoded Output */}
        {decodedHeader && decodedPayload && (
          <div className="space-y-6">
            {/* Token Expiration Status */}
            {decodedPayload.exp && (
              <div className={`rounded-lg py-3 px-4 flex items-center ${
                isExpired(decodedPayload) 
                  ? 'bg-red-900/30 border border-red-800 text-red-300' 
                  : 'bg-green-900/30 border border-green-800 text-green-300'
              }`}>
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <div>
                  <span className="font-medium">
                    {isExpired(decodedPayload) ? 'Token has expired' : 'Token is valid'}
                  </span>
                  {decodedPayload.exp && (
                    <span className="block text-sm mt-1">
                      {isExpired(decodedPayload) 
                        ? `Expired on: ${formatDate(decodedPayload.exp)}` 
                        : `Expires on: ${formatDate(decodedPayload.exp)}`}
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {/* Header */}
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Header</h3>
              <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 overflow-auto">
                <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
                  {formatJson(decodedHeader)}
                </pre>
              </div>
            </div>
            
            {/* Payload */}
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Payload</h3>
              <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 overflow-auto">
                <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
                  {formatJson(decodedPayload)}
                </pre>
              </div>
            </div>
            
            {/* Timestamps */}
            {(decodedPayload.iat || decodedPayload.exp || decodedPayload.nbf) && (
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Timestamps</h3>
                <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                  <table className="w-full text-sm">
                    <tbody>
                      {decodedPayload.iat && (
                        <tr>
                          <td className="py-1 pr-4 text-gray-400">Issued At (iat):</td>
                          <td className="py-1 text-gray-300">{formatDate(decodedPayload.iat)}</td>
                        </tr>
                      )}
                      {decodedPayload.nbf && (
                        <tr>
                          <td className="py-1 pr-4 text-gray-400">Not Before (nbf):</td>
                          <td className="py-1 text-gray-300">{formatDate(decodedPayload.nbf)}</td>
                        </tr>
                      )}
                      {decodedPayload.exp && (
                        <tr>
                          <td className="py-1 pr-4 text-gray-400">Expiration (exp):</td>
                          <td className="py-1 text-gray-300">{formatDate(decodedPayload.exp)}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Info Box */}
        <div className="bg-gray-700/50 rounded-lg p-4 text-sm text-gray-300 mt-6">
          <h3 className="font-medium text-white mb-2">About JWT</h3>
          <p>
            JSON Web Tokens (JWT) are an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. JWTs are commonly used for authentication and information exchange.
          </p>
          <p className="mt-2">
            A JWT consists of three parts separated by dots: Header, Payload, and Signature. The header typically contains the token type and the signing algorithm. The payload contains the claims or the JWT's data. The signature is used to verify that the sender of the JWT is who it says it is.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default JwtTool;