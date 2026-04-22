import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CalendarDaysIcon,
  BookOpenIcon,
  ChatBubbleBottomCenterTextIcon,
  SparklesIcon,
  EllipsisHorizontalIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import {
  CalendarDaysIcon as CalendarDaysSolid,
  BookOpenIcon as BookOpenSolid,
  ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextSolid,
  SparklesIcon as SparklesSolid,
} from "@heroicons/react/24/solid";

const CollectionsSwitcher = ({ activeCollection = "daily", entryCounts = {} }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [showOverflow, setShowOverflow] = useState(false);

  const collections = [
    {
      key: "daily",
      label: "Daily",
      count: entryCounts.daily || 0,
      icon: CalendarDaysIcon,
      iconSolid: CalendarDaysSolid,
      color: "text-green-600",
      activeColor: "bg-green-50 border-green-200 text-green-700",
      path: `/home/${userId}`,
    },
    {
      key: "book",
      label: "Book",
      count: entryCounts.book || 0,
      icon: BookOpenIcon,
      iconSolid: BookOpenSolid,
      color: "text-orange-600",
      activeColor: "bg-orange-50 border-orange-200 text-orange-700",
      path: `/my-book/${userId}`,
    },
    {
      key: "thoughts",
      label: "Thoughts",
      count: entryCounts.thoughts || 0,
      icon: ChatBubbleBottomCenterTextIcon,
      iconSolid: ChatBubbleBottomCenterTextSolid,
      color: "text-blue-600",
      activeColor: "bg-blue-50 border-blue-200 text-blue-700",
      path: `/home/${userId}`, // TODO: Create dedicated thoughts page
    },
    {
      key: "setb",
      label: "Set B",
      count: 26,
      icon: SparklesIcon,
      iconSolid: SparklesSolid,
      color: "text-purple-600",
      activeColor: "bg-purple-50 border-purple-200 text-purple-700",
      path: `/setb-preview/${userId}`,
      badge: "Preview",
      badgeColor: "bg-purple-100 text-purple-700",
    },
  ];

  const pinnedCollections = collections.filter(c => ["daily", "book"].includes(c.key));
  const otherCollections = collections.filter(c => !["daily", "book"].includes(c.key));

  const handleCollectionClick = (collection) => {
    if (collection.path) {
      navigate(collection.path);
    }
  };

  const CollectionTab = ({ collection, isActive }) => {
    const IconComponent = isActive ? collection.iconSolid : collection.icon;
    
    return (
      <button
        onClick={() => handleCollectionClick(collection)}
        className={`inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-sm ${
          isActive
            ? collection.activeColor + " border-2"
            : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        <IconComponent className={`w-4 h-4 mr-2 ${isActive ? "" : collection.color}`} />
        <span>{collection.label}</span>
        
        {collection.count > 0 && (
          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
            isActive 
              ? "bg-white bg-opacity-70" 
              : "bg-gray-100 text-gray-600"
          }`}>
            {collection.count}
          </span>
        )}
        
        {collection.badge && (
          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium ${collection.badgeColor}`}>
            {collection.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Pinned Section with 8pt spacing */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 mr-4">
              <StarIcon className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">Pinned</span>
            </div>
            
            {pinnedCollections.map((collection) => (
              <CollectionTab
                key={collection.key}
                collection={collection}
                isActive={activeCollection === collection.key}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-gray-300" />

          {/* Other Collections with proper spacing */}
          <div className="flex items-center space-x-3">
            {otherCollections.map((collection) => (
              <CollectionTab
                key={collection.key}
                collection={collection}
                isActive={activeCollection === collection.key}
              />
            ))}
          </div>
        </div>

        {/* Overflow Menu */}
        <div className="relative">
          <button
            onClick={() => setShowOverflow(!showOverflow)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </button>

          {showOverflow && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-60">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-900">Collection Options</h3>
              </div>
              
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Create New Collection
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Manage Collections
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Import/Export
              </button>
              
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Collection Selector with 8pt spacing */}
      <div className="sm:hidden mt-4">
        <select
          value={activeCollection}
          onChange={(e) => {
            const collection = collections.find(c => c.key === e.target.value);
            if (collection) handleCollectionClick(collection);
          }}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          {collections.map((collection) => (
            <option key={collection.key} value={collection.key}>
              {collection.label} ({collection.count})
              {collection.badge && ` - ${collection.badge}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CollectionsSwitcher;