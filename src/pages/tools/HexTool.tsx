import React, { useState } from 'react';
import { Code, ArrowDownUp } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';

const HexTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);

  const encodeHex = (str: string) => {
    return Array.from(str)
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  };

  const decodeHex = (hex: string) => {
    // Remove any spaces or non-hex characters
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, '');
    
    // Check if we have a valid hex string (must be even length)
    if (cleanHex.length % 2 !== 0) {
      throw new Error('Invalid hex string length (must be even)');
    }
    
    const hexPairs = cleanHex.match(/.{1,2}/g) || [];
    try {
      return hexPairs
        .map((pair) => String.fromCharCode(parseInt(pair, 16)))
        .join('');
    } catch (e) {
      throw new Error('Invalid Hex string');
    }
  };

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
        setOutput(encodeHex(data));
      } else {
        setOutput(decodeHex(data));
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(`Error: ${e.message}`);
      } else {
        setError(`Error: ${currentMode === 'decode' ? 'Invalid Hex string' : 'Could not encode text'}`);
      }
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

  const formatHexOutput = (hex: string) => {
    // Add spaces between hex pairs for better readability
    return hex.match(/.{1,2}/g)?.join(' ') || hex;
  };

  return (
    <ToolLayout
      title="Hex Encoder/Decoder"
      description="Convert data to and from hexadecimal format quickly and easily."
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
              Text to Hex
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
              Hex to Text
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
            {mode === 'encode' ? 'Text Input' : 'Hex Input'}
          </label>
          <textarea
            id="input"
            value={input}
            onChange={handleInputChange}
            placeholder={mode === 'encode' ? 'Enter text to convert to hex...' : 'Enter hex values to convert to text...'}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] font-mono"
          />
          {mode === 'decode' && (
            <p className="text-xs text-gray-400 mt-1">
              Spaces and non-hex characters will be automatically removed
            </p>
          )}
        </div>
        
        {/* Output */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="output" className="block text-sm font-medium text-gray-400">
              {mode === 'encode' ? 'Hex Output' : 'Text Output'}
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
              value={mode === 'encode' ? formatHexOutput(output) : output}
              readOnly
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none min-h-[120px] font-mono"
              placeholder={mode === 'encode' ? 'Hex output will appear here...' : 'Text output will appear here...'}
            />
          )}
        </div>
        
        {/* Info Box */}
        <div className="bg-gray-700/50 rounded-lg p-4 text-sm text-gray-300">
          <h3 className="font-medium text-white mb-2">About Hexadecimal Encoding</h3>
          <p>
            Hexadecimal (or "hex") is a base-16 number system that uses 16 distinct symbols: the numbers 0-9 and the letters A-F. Each hex digit represents 4 bits (half a byte), making it a compact way to represent binary data.
          </p>
          <p className="mt-2">
            Hex encoding is commonly used in computing for representing binary data in a human-readable format, such as memory addresses, color values in HTML/CSS, and binary file contents.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default HexTool;