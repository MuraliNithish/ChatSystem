import React, { useState } from 'react';
import MessageList from './MessageList';
import ChatSystem from './ChatSystem';

const MessageSystem: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'managers' | 'fieldOfficers'>('managers');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Toggle popup visibility
  const togglePopup = () => setPopupOpen(!isPopupOpen);

  // Handle radio button change
  const handleRadioChange = (user: string) => {
    setSelectedUser(user);
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-28 left-60 right-0 bottom-0 bg-gray-100 font-normal p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <div className="text-xl font-bold text-gray-900">
            Message System
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <div className="relative flex items-center">
            <h1
              className={`border-b-2 pb-5 ${activeTab === 'managers' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('managers')}
            >
              Managers
            </h1>
            <h2
              className={`ml-28 border-b-2 pb-5 ${activeTab === 'fieldOfficers' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('fieldOfficers')}
            >
              Field Officers
            </h2>
          </div>
          <hr className="border-t-1 border-gray-200 w-full" />
        </div>
        <div className="flex gap-x-8 mt-3 font-medium items-center">
          <div className="flex font-medium justify-between items-center bg-white w-72 p-3 mt-5 space-x-4 rounded-md shadow-sm">
            <input
              type="text"
              placeholder="Search here"
              className="font-medium text-sm outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img
              className="w-8 h-6 mr-20 rounded-md"
              src={`/assets/search.svg`}
              alt="search"
            />
          </div>
          <img
            className="w-8 h-6 rounded-md mt-4"
            src={`/assets/y.svg`}
            alt="y"
          />
        </div>
        <MessageList activeTab={activeTab} searchQuery={searchQuery} />

        {/* Add button */}
        <div className='flex mr-5 justify-end'>
          <img
            className="flex w-8 h-8 cursor-pointer"
            src='/assets/add.svg'
            alt="add"
            onClick={togglePopup} // Open popup on click
          />
        </div>

        {/* Background Overlay limited within the component */}
        {isPopupOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
            {/* Popup Notification */}
            <div className="bg-white rounded-lg shadow-lg w-96 relative">
              <div className="flex justify-between items-center bg-green-500 p-3 rounded-t-lg">
                <h2 className="text-white">Add</h2>
                <button onClick={togglePopup} className="text-white">
                  <img
                  src='/assets/x.svg'
                  />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full p-2 border rounded-md outline-none"
                  />
                  <img
                    className="w-6 h-6 ml-2"
                    src={`/assets/search.svg`}
                    alt="search"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  {/* Custom Radio Button with Green Selection */}
                  {['sathish', 'vijay', 'james', 'Karthi'].map(user => (
                    <label key={user} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="user"
                        value={user}
                        className="hidden"
                        checked={selectedUser === user}
                        onChange={() => handleRadioChange(user)}
                      />
                      <span
                        className={`custom-radio w-5 h-5 rounded-full border-2 mr-2 flex justify-center items-center 
                        ${selectedUser === user ? 'border-green-500' : 'border-gray-500'}`}>
                        <span
                          className={`checked-radio w-2.5 h-2.5 rounded-full 
                          ${selectedUser === user ? 'bg-green-500' : 'hidden'}`}
                        ></span>
                      </span>
                      {user}
                    </label>
                  ))}
                </div>
                <button className="bg-green-500 text-white mt-4 p-2 rounded-md w-full">
                  Start Messaging
                </button>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageSystem;
