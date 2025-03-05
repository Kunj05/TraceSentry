import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ToolProps {
  tool: {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: React.ReactNode;
  };
}

const ToolCard: React.FC<ToolProps> = ({ tool }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 border border-gray-700 hover:border-blue-500/50 group">
      <div className="p-6">
        <div className="mb-4 bg-gray-900/50 p-3 rounded-lg inline-block">
          {tool.icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {tool.name}
        </h3>
        <p className="text-gray-400 mb-4 text-sm">
          {tool.description}
        </p>
        <Link
          to={`/tools/${tool.id}`}
          className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          Try Tool
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ToolCard;