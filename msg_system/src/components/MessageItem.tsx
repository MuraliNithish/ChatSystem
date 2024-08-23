import React from 'react';

interface MessageProps {
  message: {
    id: number;
    status: string;
    title: string;
    subtitle: string;
    time: string;
    profile: string;
  };
}

const MessageItem: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className={`px-4 py-2 ${message.status === 'Unread' ? 'bg-white' : 'bg-white'} mb-4 rounded-lg`}>
      <div className="text-sm font-medium text-green-500">
        {message.status}
      </div>
      <div className='flex justify-between items-center'>
        <img className="w-12 h-12 rounded-full mr-4" src={message.profile} alt="avatar" />
        <div className="flex-grow">
          <div className="text-sm ml-2 font-medium text-[#232323]">{message.title}</div>
          <div className="text-xs font-sans p-2 text-[#242424]">{message.subtitle}</div>
        </div>
        <div className="text-xs p-2 mt-4 font-sans text-[#808080]">{message.time}</div>
      </div>
    </div>
  );
};

export default MessageItem;
