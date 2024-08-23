import React from 'react';
import MessageItem from './MessageItem';

interface Message {
  id: number;
  status: string;
  title: string;
  subtitle: string;
  time: string;
  profile: string;
}

const managerMessages: Message[] = [
  { id: 1, status: 'Unread', title: 'Senior Manager', subtitle: 'Lorem Ipsum Monik Ank', time: 'Just now', profile: '/assets/s.svg' },
  { id: 2, status: 'Unread', title: 'Senior Manager', subtitle: 'Lorem Ipsum Monik Ank', time: '10 mins ago', profile: '/assets/sm.svg' },
  { id: 3, status: 'Unread', title: 'Senior Manager', subtitle: 'Lorem Ipsum Monik Ank', time: '06 mins ago', profile: '/assets/sma.svg' },
  { id: 4, status: 'Unread', title: 'Senior Manager', subtitle: 'Lorem Ipsum Monik Ank', time: '1 hr ago', profile: '/assets/sn.svg' },
  { id: 5, status: 'Read', title: 'Senior Manager', subtitle: 'Lorem Ipsum Monik Ank', time: '3 hr ago', profile: '/assets/sl.svg' }
];

const fieldOfficerMessages: Message[] = [
  { id: 1, status: 'Unread', title: 'Sathish', subtitle: 'Lorem Ipsum Monik Ank', time: 'Just now', profile: '/assets/sathish.svg' },
  { id: 2, status: 'Unread', title: 'Vijay', subtitle: 'Lorem Ipsum Monik Ank', time: '10 mins ago', profile: '/assets/vijay.svg' },
  { id: 3, status: 'Unread', title: 'James', subtitle: 'Lorem Ipsum Monik Ank', time: '06 mins ago', profile: '/assets/james.svg' },
  { id: 4, status: 'Unread', title: 'Karthi', subtitle: 'Lorem Ipsum Monik Ank', time: '1 hr ago', profile: '/assets/karthi.svg' },
  { id: 5, status: 'Read', title: 'Jasmine', subtitle: 'Lorem Ipsum Monik Ank', time: '3 hr ago', profile: '/assets/jasmine.svg' }
];

interface MessageListProps {
  activeTab: 'managers' | 'fieldOfficers';
  searchQuery: string;
}

const MessageList: React.FC<MessageListProps> = ({ activeTab, searchQuery }) => {
  const messages = activeTab === 'managers' ? managerMessages : fieldOfficerMessages;

  // Filter messages where the title starts with the search query
  const filteredMessages = messages.filter(message =>
    message.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div className="py-4 font-normal">
      {filteredMessages.length > 0 ? (
        filteredMessages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))
      ) : (
        <div className="text-center text-gray-500">No results found</div>
      )}
    </div>
  );
};

export default MessageList;
