
import React, { useState } from 'react';
import MessageList from './MessageList';

const MessageSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'managers' | 'fieldOfficers'>('managers');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="fixed top-28 left-60 right-0 bottom-0 bg-gray-100 font-normal p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xl font-bold text-gray-900">
          Message System
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="relative flex items-center">
          <h1
            className={`border-b-2 pb-5 ${activeTab === 'managers' ? 'border-green-400 text-green-400' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab('managers')}
          >
            Managers
          </h1>
          <h2
            className={`ml-28 border-b-2 pb-5 ${activeTab === 'fieldOfficers' ? 'border-green-400 text-green-400' : 'border-transparent text-gray-500'}`}
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
    </div>
  );
};

export default MessageSystem;

