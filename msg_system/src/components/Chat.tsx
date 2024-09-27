// import React, { useState } from 'react';
// // import { IoPersonCircleSharp } from "react-icons/io5";

// interface Chat {
//   name: string;
//   message: string;
//   time: string;
//   mobile: string;
// }

// const dummyChats: Chat[] = [
//   { name: 'Alice', message: 'Hello!', time: '10:00 AM', mobile: '1234567890' },
//   { name: 'Bob', message: 'How are you?', time: '10:05 AM', mobile: '0987654321' },
//   // Add more dummy chat data as needed
// ];

// const Chats: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleChatClick = (chat: Chat) => {
//     setSelectedChat(chat);
//   };

//   const filteredChats = dummyChats.filter(chat =>
//     chat.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className='flex mb-[30%]'>
//       <div className="flex flex-col mx-4 ml-5 w-[27%] h-530 shadow-md">
//         {/* Search Bar */}
//         <div className="flex justify-center mb-4 mt-3">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Search here"
//             className="w-[85%] p-2 rounded-lg placeholder:text-xs text-left outline-none"
//           />
//           <i className="fa fa-search relative right-10 top-3 text-green-600"></i>
//         </div>

//         <div className="ml-6 z-2 flex flex-col space-y-0">
//           <div className="flex gap-2.5 font-work-sans">
//             <div className="text-green-500">
//               <button className="bg-none p-2.5 border-b-2 border-green-500 cursor-pointer text-green-500 text-xs">
//                 Recent Chats
//               </button>
//             </div>
//             <button className="border-none bg-none p-2.5 cursor-pointer text-gray-400 text-xs">All Chats</button>
//           </div>
//           <div className="line text-gray-200 w-[100%]">
//             <hr className="m-0" />
//           </div>
//         </div>

//         {/* Scrollable Chat List */}
//         <div className="flex-1 mt-2 overflow-y-auto">
//           {filteredChats.map((chat, index) => (
//             <div
//               key={index}
//               onClick={() => handleChatClick(chat)}
//               className={`cursor-pointer ${selectedChat?.mobile === chat.mobile ? 'bg-gray-100' : ''}`}
//             >
//               <div className="bg-white p-4 h-16 mt-1 rounded mb-1">
//                 <div className='flex flex-row items-center'>
//                   <div className="relative">
//                     {/* <IoPersonCircleSharp className='w-9 h-9' /> */}
//                   </div>
//                   <div className='flex flex-col ml-1'>
//                     <div className='text-xs font-semibold' style={{ color: "#232323" }}>
//                       {chat.name}
//                     </div>
//                     <div className='text-xs whitespace-nowrap'>{chat.message}</div>
//                   </div>
//                   <div className='text-xs relative mr-7'>{chat.time}</div>
//                 </div>
//               </div>
//               <div className="line ml-6 text-gray-200">
//                 <hr className="m-0 w-[93%]" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="">
//         {/* Placeholder for MessageSystem */}
//         {/* {selectedChat ? (
//           <div className="p-4">
//             <h2>{selectedChat.name}</h2>
//             <p>{selectedChat.message}</p>
//           </div>
//         ) : (
//           <div className="p-4 text-center">Select a chat to view messages</div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default Chats;
