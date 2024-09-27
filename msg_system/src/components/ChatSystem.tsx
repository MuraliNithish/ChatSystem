import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Message = {
  name: string;
  content: string;
  time: string;
  sender: boolean;
  senderId: number;
  type: "text" | "image" | "file";
};

const fieldOfficerMessages: any[] = [
  {
    id: 1,
    status: "Unread",
    title: "Sathish",
    subtitle: "Lorem Ipsum Monik Ank",
    time: "Just now",
    profile: "/assets/sathish.svg",
  },
  {
    id: 2,
    status: "Unread",
    title: "Vijay",
    subtitle: "Lorem Ipsum Monik Ank",
    time: "10 mins ago",
    profile: "/assets/vijay.svg",
  },
  {
    id: 3,
    status: "Unread",
    title: "James",
    subtitle: "Lorem Ipsum Monik Ank",
    time: "06 mins ago",
    profile: "/assets/james.svg",
  },
  {
    id: 4,
    status: "Unread",
    title: "Karthi",
    subtitle: "Lorem Ipsum Monik Ank",
    time: "1 hr ago",
    profile: "/assets/karthi.svg",
  },
  {
    id: 5,
    status: "Read",
    title: "Jasmine",
    subtitle: "Lorem Ipsum Monik Ank",
    time: "3 hr ago",
    profile: "/assets/jasmine.svg",
  },
];

const ChatSystem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userData = fieldOfficerMessages.find((val) => val.id === Number(id));
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState<string>(" "); // Set the current user
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:5000"); // Updated to match backend port
    ws.current.onmessage = async (event) => {
      let receivedMessage: {
        senderName: string;
        content: string;
        senderId: string;
        recipientId: string;
        type: "text" | "image" | "file";
      };

      if (event.data instanceof Blob) {
        const textData = await event.data.text();
        receivedMessage = JSON.parse(textData);
      } else {
        receivedMessage = JSON.parse(event.data);
      }
      console.log(receivedMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          name: receivedMessage.senderName,
          content: receivedMessage.content,
          time: new Date().toISOString().slice(0, 19).replace("T", " "),
          sender: receivedMessage.senderId === id,
          senderId: Number(receivedMessage.senderId),
          type: receivedMessage.type,
        },
      ]);
    };

    return () => {
      ws.current?.close();
    };
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() || selectedFile) {
      const message = {
        content: inputValue,
        senderName: userName,
        senderId: id!,
        recipientId: userData?.id, // Assuming userData contains recipient's ID
        type: selectedFile ? "file" : "text",
        file: selectedFile ? selectedFile.name : undefined,
      };

      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          const fileData = reader.result;
          if (ws.current) {
            ws.current.send(
              JSON.stringify({
                ...message,
                content: fileData,
                type: "file",
              })
            );
          }
        };
        reader.readAsDataURL(selectedFile);
      } else {
        ws.current?.send(JSON.stringify(message));
      }

      setInputValue("");
      setSelectedFile(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex-grow mb-4 p-4 ml-64 mt-24 flex flex-col h-[calc(100vh-5rem)]">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-[700] mb-5 text-[#232323] flex items-center space-x-2">
          <span className="font-sans text-lg">Message System</span>
        </div>
      </div>
      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="flex flex-col flex-grow overflow-hidden">
          <div className="flex items-center ml-5 p-4 border h-[80px] w-[90%] bg-[#ffffff] shadow-md">
            <img
              className="p-2 mr-7 ml-2 bg-[#fbfbfb] w-12 h-12 rounded-md cursor-pointer"
              src="/assets/arrow.svg"
              alt="Arrow"
              onClick={handleBackClick}
            />
            <img className="w-12 h-12 mr-4" src={userData.profile} alt="User" />
            <div>
              <p className="text-base font-medium">{userData.title}</p>
              <span className="text-sm text-green-500">Online</span>
            </div>
          </div>
          <div className="flex-1 ml-5 p-4 bg-[#f6f6f8] w-[90%] overflow-y-auto flex-grow">
            {messages.map((message, idx) => {
              const profile = (
                fieldOfficerMessages.find((e) => e.id === message.senderId) ?? {
                  profile: "",
                }
              ).profile;
              return (
                <div
                  key={idx}
                  className={`flex ${
                    message.sender ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  {!message.sender && (
                    <img
                      src={profile}
                      alt="User"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <div
                    className={`p-2 rounded-lg ${
                      message.sender
                        ? "bg-[#f1fff6] text-black"
                        : "bg-white text-black"
                    } max-w-[60%]`}
                  >
                    {!message.sender && (
                      <p className="font-bold mb-1">{message.name}</p>
                    )}
                    {message.type === "file" ? (
                      <a
                        href={message.content}
                        download
                        className="text-blue-500 underline"
                      >
                        Download File
                      </a>
                    ) : message.type === "image" ? (
                      <img
                        src={message.content}
                        alt="Sent file"
                        className="w-full h-auto rounded-lg"
                      />
                    ) : (
                      <p>{message.content}</p>
                    )}
                    <p className="text-xs text-gray-500">{message.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center ml-5 p-4 bg-[#ffffff] shadow-md w-[90%] h-[100px]">
        <label className="bg-[#fbfbfb] p-2 rounded-md cursor-pointer">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <img
            src="/assets/plus.svg"
            alt="Plus"
            className="w-6 h-6 text-gray-400"
          />
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type Here"
          className="text-sm font-sans text-gray-400 flex-grow outline-none ml-4"
        />
        <img
          className="p-2 bg-white w-14 h-14 cursor-pointer"
          src="/assets/ws.svg"
          alt="Send"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatSystem;
