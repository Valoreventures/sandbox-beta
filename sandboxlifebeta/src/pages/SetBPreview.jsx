import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import TopBar from '../components/TopBar';
import Menu from '../components/Menu';
import SetBPreviewWindow from '../components/SetBPreviewWindow';
import PDFViewer from '../components/PDFViewer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SetBPreview = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleBackToDashboard = () => {
    navigate(`/home/${userId}`);
  };

  const handleOpenPDFViewer = () => {
    setIsPDFViewerOpen(true);
  };

  const handleClosePDFViewer = () => {
    setIsPDFViewerOpen(false);
  };

  return (
    <>
      <TopBar toggleMenu={toggleMenu} />
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <Menu toggleMenu={toggleMenu} />
        </div>
      )}
      
      <div className="min-h-screen bg-lightpapyrus py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Navigation */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
            
            <button
              onClick={handleOpenPDFViewer}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <DocumentArrowDownIcon className="h-5 w-5" />
              <span>View/Download PDF</span>
            </button>
          </div>

          {/* Breadcrumb */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <button 
                  onClick={handleBackToDashboard}
                  className="hover:text-gray-700"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <span className="mx-2">/</span>
                <span className="text-gray-700">Library</span>
              </li>
              <li>
                <span className="mx-2">/</span>
                <span className="text-gray-700">Collections</span>
              </li>
              <li>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Set B (Preview)</span>
              </li>
            </ol>
          </nav>

          {/* Main Content */}
          <SetBPreviewWindow />
        </div>
      </div>
      
      {/* PDF Viewer Modal */}
      <PDFViewer 
        isOpen={isPDFViewerOpen} 
        onClose={handleClosePDFViewer} 
      />
      
      <ToastContainer />
    </>
  );
};

export default SetBPreview;