import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ title, description, icon, children }) => {
  return (
    <div className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/tools" className="inline-flex items-center text-gray-400 hover:text-blue-400 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Link>
          
          {/* Tool Header */}
          <div className="flex items-center mb-8">
            <div className="bg-gray-800 p-4 rounded-lg mr-4">
              {icon}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
              <p className="text-gray-400 mt-1">{description}</p>
            </div>
          </div>
          
          {/* Tool Content */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolLayout;