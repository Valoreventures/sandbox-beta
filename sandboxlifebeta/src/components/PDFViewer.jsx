import { useState } from 'react';
import { XMarkIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { setb_preview_icons } from '../constants/setb-icons';

const PDFViewer = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const generatePDFContent = () => {
    // This is a simplified PDF generation - in a real implementation,
    // you would use a library like jsPDF or react-pdf
    const content = `
      SET B ICON COLLECTION - PREVIEW REFERENCE
      
      ${setb_preview_icons.map((icon, index) => `
        ${index + 1}. ${icon.name}
        Meaning: ${icon.meaning}
        Description: ${icon.description}
        ${icon.special_treatment ? '⭐ Special Treatment' : ''}
        
      `).join('')}
      
      Total Icons: ${setb_preview_icons.length}
      Special Cards: ${setb_preview_icons.filter(icon => icon.special_treatment).length}
      
      Generated on: ${new Date().toLocaleDateString()}
    `;
    
    return content;
  };

  const handleDownload = () => {
    setIsGenerating(true);
    
    // Simulate PDF generation delay
    setTimeout(() => {
      const content = generatePDFContent();
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'setb-icon-collection.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Set B Collection Reference
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              SandboxLife Set B Icon Collection
            </h3>
            <p className="text-gray-600">
              Preview Reference Guide - {setb_preview_icons.length} Icons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {setb_preview_icons.map((icon, index) => (
              <div 
                key={icon.uuid}
                className={`p-4 border rounded-lg ${
                  icon.special_treatment 
                    ? 'border-purple-300 bg-purple-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <img 
                      src={icon.icon} 
                      alt={icon.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-800">
                        {index + 1}. {icon.name}
                      </h4>
                      {icon.special_treatment && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          Special
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-blue-600 font-medium mb-1">
                      {icon.meaning}
                    </p>
                    <p className="text-xs text-gray-600">
                      {icon.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <p>Generated on: {new Date().toLocaleDateString()}</p>
            <p>Total Icons: {setb_preview_icons.length} | Special Cards: {setb_preview_icons.filter(icon => icon.special_treatment).length}</p>
          </div>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <DocumentArrowDownIcon className="h-4 w-4" />
            <span>{isGenerating ? 'Generating...' : 'Download Reference'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;