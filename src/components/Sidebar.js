import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Sidebar = ({ handleChatClick }) => {
  const [currentChats, setCurrentChats] = useState([
    { id: 1, chatName: "Chat 1" },
    { id: 2, chatName: "Chat 2" },
    { id: 3, chatName: "Chat 3" }
  ]);
  const [renameIndex, setRenameIndex] = useState(-1);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [menuOpenIndex, setMenuOpenIndex] = useState(-1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 450px)');

    const handleMediaQueryChange = (e) => {
      setIsSmallScreen(e.matches);
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addListener(handleMediaQueryChange);
    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleRenameSubmit = (index, value) => {
    if (value.trim() !== "") {
      setCurrentChats((prevChats) => {
        const updatedChats = [...prevChats];
        updatedChats[index].chatName = value;
        return updatedChats;
      });
    }
    setRenameIndex(-1);
  };

  const handleDeleteChat = (index) => {
    setCurrentChats((prevChats) => prevChats.filter((_, i) => i !== index));
  };

  return (
    <div className="flex bg-base-100 text-white">
      <button 
        className="fixed top-2 left-2 z-50 p-2 bg-gray-800 rounded focus:outline-none"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>
      {sidebarVisible && isSmallScreen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
      <div 
        className={`sidebar bg-base-100 text-white p-4 h-full ${!sidebarVisible ? 'hidden' : 'block'} fixed top-0 left-0 z-40 w-64 overflow-y-auto`}
      >
        <div className="flex flex-col items-center mt-5">
          <button className="btn btn-neutral w-40 my-4 hover:bg-blue-500 transition-transform transform hover:scale-105 duration-300 ease-in-out">
            New Chat
          </button>
        </div>
        <ul className="menu bg-gray-800 w-full relative z-40">
          {currentChats.map((chat, index) => (
            index === renameIndex ? 
            <li key={index} className="mb-4 flex justify-between items-center relative z-50">
              <input
                type="text"
                placeholder={chat.chatName}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRenameSubmit(index, e.target.value);
                  }
                }}
                className="input input-bordered w-full rounded-lg border-gray-600 bg-gray-900 text-white truncate"
                style={{ width: 'calc(100% - 2rem)' }}
              />
              <button onClick={() => setRenameIndex(-1)} className="ml-2 text-gray-400">❌</button>
            </li>
            :
            <div key={index} className="chat-item-wrapper flex items-center justify-between mb-4 w-full relative">
              <Link to={`/${chat.id}`} className="w-full">
                <li className="chat-item btn btn-outline w-full text-left truncate overflow-hidden whitespace-nowrap">
                  {chat.chatName.length > 20 ? chat.chatName.substring(0, 17) + '...' : chat.chatName}
                </li>
              </Link>
              <div className="relative">
                <button
                  type="button"
                  className="btn btn-sm btn-outline mx-1"
                  onClick={() => setMenuOpenIndex(menuOpenIndex === index ? -1 : index)}
                >
                  ⋮
                </button>
                {menuOpenIndex === index && (
                  <div className="absolute right-0 top-8 bg-white rounded shadow-lg py-2 z-50">
                    <button
                      type="button"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-700 hover:text-white w-full text-left"
                      onClick={() => {
                        setRenameIndex(index);
                        setMenuOpenIndex(-1);
                      }}
                    >
                      Rename
                    </button>
                    <button
                      type="button"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-700 hover:text-white w-full text-left"
                      onClick={() => {
                        handleDeleteChat(index);
                        setMenuOpenIndex(-1);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
