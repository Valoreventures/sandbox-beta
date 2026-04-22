import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Menu from '../components/Menu';
import LibraryCollections from '../components/LibraryCollections';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Library = () => {
  const { userId } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Brief loading for UX consistency
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
        {isLoading ? (
          <div className="px-4">
            <LoadingSkeleton variant="card" count={2} />
          </div>
        ) : (
          <LibraryCollections userId={userId} />
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default Library;
