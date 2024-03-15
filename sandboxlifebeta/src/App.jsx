import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import BookJourney from './pages/BookJourney';
import DailyJournal from './pages/DailyJournal';
import ThoughtOfTheDay from './pages/ThoughtOfTheDay';

function App() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* <Route path="/signup" element={<SignupPage/>} /> */}
            <Route path="/home/:userId" element={<HomePage />} />
            <Route path="/bookjourney" element={<BookJourney />} />
            <Route path="/dailyjournal" element={<DailyJournal />} />
            <Route path="/thoughtoftheday" element={<ThoughtOfTheDay />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
