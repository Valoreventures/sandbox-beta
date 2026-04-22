import { useNavigate } from 'react-router-dom';
import { EyeIcon, SparklesIcon } from '@heroicons/react/24/outline';

const SetBDashboardTile = ({ userId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/setb-preview/${userId}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-purple-200 rounded-card p-6 cursor-pointer hover:shadow-card-hover transition-all duration-200 hover:scale-105"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="h-6 w-6 text-purple-600" />
          <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
            NEW
          </span>
        </div>
        <EyeIcon className="h-5 w-5 text-purple-500" />
      </div>
      
      <h3 className="text-lg font-bold text-gray-800 mb-3">
        Set B Collection
      </h3>
      
      <p className="text-sm text-gray-600 mb-4">
        Preview 26 new icons coming to SandboxLife
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-purple-600 font-medium">
          Preview Only
        </span>
        <div className="flex space-x-1">
          {/* Sample icon previews with 8pt spacing */}
          <div className="w-6 h-6 bg-purple-200 rounded-full"></div>
          <div className="w-6 h-6 bg-blue-200 rounded-full"></div>
          <div className="w-6 h-6 bg-indigo-200 rounded-full"></div>
          <span className="text-xs text-gray-500 ml-2">+23</span>
        </div>
      </div>
    </div>
  );
};

export default SetBDashboardTile;