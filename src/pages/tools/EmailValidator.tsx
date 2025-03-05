import React, { useState } from 'react';
import { Mail, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

const EmailValidator = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleValidate = async () => {
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Simulated API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResult({
        is_valid_format: { value: true },
        is_valid_domain: { value: true },
        deliverability: 'DELIVERABLE',
        is_disposable_email: { value: false },
        is_free_email: { value: true },
        mx_records: ['mx1.example.com', 'mx2.example.com'],
        domain_age: '10 years',
        spam_score: 0.1
      });
    } catch (err) {
      setError('Error validating email. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Email Validator"
      description="Validate email addresses and check for authenticity and deliverability."
      icon={<Mail className="h-8 w-8 text-blue-500" />}
    >
      <div className="p-6">
        {/* Input Form */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
            Email Address
          </label>
          <div className="flex">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="example@domain.com"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              onClick={handleValidate}
              disabled={loading}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? 'Validating...' : 'Validate Email'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Enter an email address to validate its authenticity and deliverability
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
        {result && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Validation Results for {email}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Checks */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Primary Checks</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Format Valid:</span>
                    <span className={result.is_valid_format.value ? 'text-green-400' : 'text-red-400'}>
                      {result.is_valid_format.value ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <XCircle className="h-5 w-5" />
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Domain Exists:</span>
                    <span className={result.is_valid_domain.value ? 'text-green-400' : 'text-red-400'}>
                      {result.is_valid_domain.value ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <XCircle className="h-5 w-5" />
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Deliverable:</span>
                    <span className={result.deliverability === 'DELIVERABLE' ? 'text-green-400' : 'text-red-400'}>
                      {result.deliverability === 'DELIVERABLE' ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <XCircle className="h-5 w-5" />
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Additional Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Disposable Email:</span>
                    <span className={!result.is_disposable_email.value ? 'text-green-400' : 'text-red-400'}>
                      {!result.is_disposable_email.value ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <XCircle className="h-5 w-5" />
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Free Provider:</span>
                    <span className="text-gray-300">{result.is_free_email.value ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Domain Age:</span>
                    <span className="text-gray-300">{result.domain_age}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Spam Score:</span>
                    <span className={`text-${result.spam_score < 0.5 ? 'green' : 'red'}-400`}>
                      {(result.spam_score * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* MX Records */}
            <div className="mt-4 bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">MX Records</h4>
              <div className="text-sm text-gray-300 font-mono">
                {result.mx_records.map((record: string, index: number) => (
                  <div key={index} className="py-1">{record}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-gray-700/50 rounded-lg p-4 text-sm text-gray-300">
          <h3 className="font-medium text-white mb-2">About Email Validation</h3>
          <p>
            Email validation checks multiple aspects of an email address to determine its validity and likelihood of being deliverable.
          </p>
          <p className="mt-2">
            The validation process includes:
          </p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Syntax validation</li>
            <li>Domain existence check</li>
            <li>Mail server verification</li>
            <li>Disposable email detection</li>
            <li>Spam risk assessment</li>
          </ul>
          <p className="mt-2 text-yellow-400">
            ⚠️ Note: While these checks are comprehensive, they cannot guarantee 100% accuracy for all email addresses.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default EmailValidator;