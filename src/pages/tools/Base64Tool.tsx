import React, { useState } from 'react';
import { Code, ArrowDownUp } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    processData(e.target.value, mode);
  };

  const toggleMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    processData(input, newMode);
  };

  const processData = (data: string, currentMode: 'encode' | 'decode') => {
    setError(null);
    
    if (!data) {
      setOutput('');
      return;
    }
    
    try {
      if (currentMode === 'encode') {
        setOutput(btoa(data));
      } else {
        setOutput(atob(data));
      }
    } catch (e) {
      setError(`Error: ${currentMode === 'decode' ? 'Invalid Base64 string' : 'Could not encode text'}`);
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      alert('Copied to clipboard!');
    }
  };

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Easily encode or decode Base64 data with this simple tool."
      icon={<Code className="h-8 w-8 text-blue-500" />}
    >
      <div className="p-6">
        {/* Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setMode('encode');
                processData(input, 'encode');
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'encode'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => {
                setMode('decode');
                processData(input, 'decode');
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'decode'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Decode
            </button>
          </div>
          
          <button
            onClick={toggleMode}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 p-2 rounded-lg transition-colors"
            title="Swap mode"
          >
            <ArrowDownUp className="h-5 w-5" />
          </button>
        </div>
        
        {/* Input */}
        <div className="mb-6">
          <label htmlFor="input" className="block text-sm font-medium text-gray-400 mb-2">
            {mode === 'encode' ? 'Text Input' : 'Base64 Input'}
          </label>
          <textarea
            id="input"
            value={input}
            onChange={handleInputChange}
            placeholder={mode === 'encode' ? 'Enter text to encode to Base64...' : 'Enter Base64 to decode...'}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
          />
        </div>
        
        {/* Output */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="output" className="block text-sm font-medium text-gray-400">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
            </label>
            <div className="flex space-x-2">
              <button
                onClick={handleCopy}
                disabled={!output}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Copy
              </button>
              <button
                onClick={handleClear}
                disabled={!input && !output}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            </div>
          </div>
          
          {error ? (
            <div className="bg-red-900/30 border border-red-800 text-red-300 rounded-lg py-3 px-4">
              {error}
            </div>
          ) : (
            <textarea
              id="output"
              value={output}
              readOnly
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none min-h-[120px]"
              placeholder={mode === 'encode' ? 'Base64 output will appear here...' : 'Decoded text will appear here...'}
            />
          )}
        </div>
        
        {/* Info Box */}
        <div className="bg-gray-700/50 rounded-lg p-4 text-sm text-gray-300">
          <h3 className="font-medium text-white mb-2">About Base64 Encoding</h3>
          <p>
            Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used when there's a need to encode binary data that needs to be stored and transferred over media that are designed to deal with text.
          </p>
          <p className="mt-2">
            Common uses include encoding email attachments, embedding image data in HTML or CSS, and storing complex data in JSON.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default Base64Tool;