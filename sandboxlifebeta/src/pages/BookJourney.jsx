// import { useState, useEffect, useRef } from 'react';
// import CalendarDateHeader from '../components/CalendarDateHeader';
// import Menu from '../components/Menu';
// import TopBar from '../components/TopBar';
// import IconSelectionWindow from '../components/IconSelectionWindow';
// import { book_journal_questions } from '../constants/questions';
// import { JournalEntrySection } from '../components/JournalEntrySection';
// import { PearlsOfWisdomWindow } from '../components/PearlsOfWisdomWindow';
// import { insertJournalEntry } from '../utils/supabase';
// import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';

// export default function BookJourney() {
//   const navigate = useNavigate();
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedIconTheme, setSelectedIconTheme] = useState('');
//   const [journalEntry, setJournalEntry] = useState('');
//   const [wisdomMessage, setWisdomMessage] = useState('');
//   const [userId, setUserId] = useState(null);
//   const [changeQuestion, setChangeQuestion] = useState(0);
  
//   function getUserIdFromStorage() {
//     const storedUserId = localStorage.getItem('user_id');
//     setUserId(storedUserId);
//   }

//   useEffect(() => {
//     getUserIdFromStorage();
//   }, []);

//   const handleChangeQuestion = () =>{
//     const number = Math.floor(Math.random() * 4)
//     setChangeQuestion(number)
//  }

//   const isFirstRender = useRef(true);
//   useEffect(() => {
//     if (isFirstRender.current) {
//       // Skips setState on the first render
//       isFirstRender.current = false;
//       return;
//     }
//   }, []);
//   const handlePrevClick = () => {
//     setCurrentDate(
//       (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1))
//     );
//   };

//   const handleNextClick = () => {
//     setCurrentDate(
//       (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1))
//     );
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   const saveToDb = async () => {


//     const dbOperation = await insertJournalEntry(
//       userId,
//       selectedIconTheme.journal_type,
//       selectedIconTheme.uuid,
//       selectedIconTheme.icon,
//       selectedIconTheme.meaning,
//       journalEntry,
//       wisdomMessage
//     );
//     if (dbOperation.success) {
//       toast.success('saved successfully!');
//       navigate(`/home/${userId}`);
//     } else {
//       toast('something went wrong while saving the data');
//     }
//   };
//   const renderComponents = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <IconSelectionWindow
//             icons={book_journal_questions}
//             setSelectedIconTheme={setSelectedIconTheme}
//             onSave={() => setCurrentStep(2)}
//             onCancel={() => {}}
//           />
//         );
//       case 2:
//         return (
//           <JournalEntrySection
//             triggerQuestion={selectedIconTheme.trigger_question[0]} // here add changequestion for chneging the question
//             triggerIcon={selectedIconTheme.icon}
//             chapterEntry="Write your story here"
//             onCancel={() => setCurrentStep(1)}
//             saveToDb={() => setCurrentStep(3)}
//             journalEntry={journalEntry}
//             setJournalEntry={setJournalEntry}
//             changeQuestion={handleChangeQuestion}
//           />
//         );
//       case 3:
//         return (
//           <PearlsOfWisdomWindow
//             triggerQuestion={selectedIconTheme.trigger_question}
//             triggerIcon={selectedIconTheme.icon}
//             chapterEntry="Pearls of wisdom"
//             onCancel={() => setCurrentStep(2)}
//             onSave={() => saveToDb()}
//             wisdomMessage={wisdomMessage}
//             setWisdomMessage={setWisdomMessage}
//           />
//         );

//       default:
//         return <div>Default component or message</div>;
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <TopBar toggleMenu={toggleMenu} />
//       {isMenuOpen && (
//         <div className="fixed inset-0 z-50">
//           <Menu toggleMenu={toggleMenu} />
//         </div>
//       )}
//       <CalendarDateHeader
//         currentDate={currentDate}
//         onPrevClick={handlePrevClick}
//         onNextClick={handleNextClick}
//       />
//       {renderComponents()}

//       <ToastContainer />
//     </div>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import CalendarDateHeader from '../components/CalendarDateHeader';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import IconSelectionWindow from '../components/IconSelectionWindow';
import { book_journal_questions } from '../constants/questions';
import { JournalEntrySection } from '../components/JournalEntrySection';
import { PearlsOfWisdomWindow } from '../components/PearlsOfWisdomWindow';
import { insertJournalEntry } from '../utils/supabase';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function BookJourney() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIconTheme, setSelectedIconTheme] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [wisdomMessage, setWisdomMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [changeQuestion, setChangeQuestion] = useState(0);
  
  function getUserIdFromStorage() {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
  }

  useEffect(() => {
    getUserIdFromStorage();
  }, []);

  const handleChangeQuestion = () =>{
    const number = Math.floor(Math.random() * 4)
    setChangeQuestion(number)
 }

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      // Skips setState on the first render
      isFirstRender.current = false;
      return;
    }
  }, []);
  const handlePrevClick = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1))
    );
  };

  const handleNextClick = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1))
    );
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const saveToDb = async () => {


    const dbOperation = await insertJournalEntry(
      userId,
      selectedIconTheme.journal_type,
      selectedIconTheme.uuid,
      selectedIconTheme.icon,
      selectedIconTheme.meaning,
      journalEntry,
      wisdomMessage
    );
    if (dbOperation.success) {
      toast.success('saved successfully!');
      navigate(`/home/${userId}`);
    } else {
      toast('something went wrong while saving the data');
    }
  };
  const renderComponents = () => {
    switch (currentStep) {
      case 1:
        return (
          <IconSelectionWindow
            icons={book_journal_questions}
            setSelectedIconTheme={setSelectedIconTheme}
            onSave={() => setCurrentStep(2)}
            onCancel={() => {}}
          />
        );
      case 2:
        return (
          <JournalEntrySection
            triggerQuestion={selectedIconTheme.trigger_question[0]} // here add changequestion for chneging the question
            triggerIcon={selectedIconTheme.icon}
            chapterEntry="Write your story here"
            onCancel={() => setCurrentStep(1)}
            saveToDb={() => setCurrentStep(3)}
            journalEntry={journalEntry}
            setJournalEntry={setJournalEntry}
            changeQuestion={handleChangeQuestion}
          />
        );
      case 3:
        return (
          <PearlsOfWisdomWindow
            triggerQuestion={selectedIconTheme.trigger_question}
            triggerIcon={selectedIconTheme.icon}
            chapterEntry="Pearls of wisdom"
            onCancel={() => setCurrentStep(2)}
            onSave={() => saveToDb()}
            wisdomMessage={wisdomMessage}
            setWisdomMessage={setWisdomMessage}
          />
        );

      default:
        return <div>Default component or message</div>;
    }
  };

  return (
    <div className=" h-screen" style={{display:"flex",alignItems:"center",justifyContent:"flex-start", flexDirection:"column", gap:"10%"}}>
      <div style={{width:"100vw"}}>
      <TopBar toggleMenu={toggleMenu} />
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <Menu toggleMenu={toggleMenu} />
        </div>
      )}
      <CalendarDateHeader
        currentDate={currentDate}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />

      </div>
     
      {renderComponents()}

      <ToastContainer />
    </div>
  );
}
