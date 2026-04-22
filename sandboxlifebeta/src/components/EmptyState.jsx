import { useNavigate, useParams } from 'react-router-dom';

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionText,
  actionPath,
  secondaryActionText,
  secondaryActionPath,
}) => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleAction = (path) => {
    // Replace :userId placeholder if present
    const resolvedPath = path.replace(':userId', userId);
    navigate(resolvedPath);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-100 rounded-full p-6 mb-6">
        {Icon && <Icon className="h-12 w-12 text-gray-400" />}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
        {title}
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-6">{description}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        {actionText && actionPath && (
          <button
            onClick={() => handleAction(actionPath)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {actionText}
          </button>
        )}
        {secondaryActionText && secondaryActionPath && (
          <button
            onClick={() => handleAction(secondaryActionPath)}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            {secondaryActionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
