import { useNavigate } from 'react-router-dom';
import { EyeIcon, BookOpenIcon, SparklesIcon } from '@heroicons/react/24/outline';

const LibraryCollections = ({ userId }) => {
  const navigate = useNavigate();

  const collections = [
    {
      id: 'current-icons',
      title: 'Current Icon Set',
      description: 'Active icons available for journaling',
      status: 'active',
      iconCount: 41, // 25 daily + 16 book
      icon: BookOpenIcon,
      onClick: () => navigate(`/home/${userId}`)
    },
    {
      id: 'setb-preview',
      title: 'Set B Collection',
      description: 'Preview upcoming icons and themes',
      status: 'preview',
      iconCount: 26,
      icon: SparklesIcon,
      onClick: () => navigate(`/setb-preview/${userId}`)
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
            Active
          </span>
        );
      case 'preview':
        return (
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-semibold">
            Preview
          </span>
        );
      default:
        return null;
    }
  };

  const getCardStyle = (status) => {
    switch (status) {
      case 'active':
        return 'bg-white border-2 border-green-200 hover:border-green-300';
      case 'preview':
        return 'bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 hover:border-purple-300';
      default:
        return 'bg-white border-2 border-gray-200 hover:border-gray-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Icon Collections
        </h1>
        <p className="text-gray-600">
          Explore available and upcoming icon sets for your journaling experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((collection) => {
          const IconComponent = collection.icon;
          
          return (
            <div
              key={collection.id}
              onClick={collection.onClick}
              className={`${getCardStyle(collection.status)} rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <IconComponent className="h-8 w-8 text-gray-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    {collection.title}
                  </h3>
                </div>
                {getStatusBadge(collection.status)}
              </div>
              
              <p className="text-gray-600 mb-4">
                {collection.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {collection.iconCount} icons
                </span>
                <div className="flex items-center space-x-1 text-blue-600">
                  <EyeIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {collection.status === 'preview' ? 'Preview' : 'View'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LibraryCollections;