import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MessageSystem from './components/MessageSystem';
import ChatSystem from './components/ChatSystem'; // Import ChatSystem

const App: React.FC = () => {

  console.log(process.env.REACT_APP_WHATSAPP_CHAT);
  
  return (
    
    <Router>
      <div className='bg-gray-300'>
        <div className="flex h-screen bg-gray-50">
          <div className="flex-grow flex bg-gray-100 flex-col">
            <Navbar />
            <div className='flex mt-[20px] bg-gray-100'>
              <Sidebar />
              <div className='flex-grow'>
                <Routes>
                  <Route path="/" element={<MessageSystem />} />
                  <Route path="/chat/:id" element={<ChatSystem />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
