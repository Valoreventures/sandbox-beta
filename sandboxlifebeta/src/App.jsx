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


import MyCalendar from "./pages/MyCalendar";
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
          <Route path="/my-book/:userId" element={<MyBook />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/settings/:userId" element={<SettingsPage />} />
          <Route path="/chat/:userId" element={<ChatRoomPage />} />
          <Route path="/my-calendar/:userId" element={<MyCalendar />} />
          <Route path="/bookjourney" element={<BookJourney />} />
          <Route path="/dailyjournal" element={<DailyJournal />} />
          <Route path="/thoughtoftheday" element={<ThoughtOfTheDay />} />
        </Routes>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
