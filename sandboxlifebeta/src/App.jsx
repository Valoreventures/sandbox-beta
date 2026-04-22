import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import BookJourney from "./pages/BookJourney";
import DailyJournal from "./pages/DailyJournal";
import ThoughtOfTheDay from "./pages/ThoughtOfTheDay";
import MyBook from "./pages/MyBook";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import Library from "./pages/Library";
import SetBPreview from "./pages/SetBPreview";
import MyCalendar from "./pages/MyCalendar";
import DashboardV2 from "./pages/DashboardV2";
import { useState } from "react";
import { Context } from "./utils/helpers";

function App() {
  const [context, setContext] = useState("");

  return (
    <BrowserRouter>
      <Context.Provider value={[context, setContext]}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/signup" element={<SignupPage/>} /> */}
          <Route path="/home/:userId" element={<HomePage />} />
          <Route path="/dashboard-v2/:userId" element={<DashboardV2 />} />
          <Route path="/my-book/:userId" element={<MyBook />} />
          <Route path="/library/:userId" element={<Library />} />
          <Route path="/setb-preview/:userId" element={<SetBPreview />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/settings/:userId" element={<SettingsPage />} />
          <Route path="/chat/:userId" element={<ChatRoomPage />} />
          <Route path="/my-calendar/:userId" element={<MyCalendar />} />
          <Route path="/bookjourney/:userId" element={<BookJourney />} />
          <Route path="/dailyjournal/:userId" element={<DailyJournal />} />
          <Route path="/thoughtoftheday/:userId" element={<ThoughtOfTheDay />} />
        </Routes>

      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
