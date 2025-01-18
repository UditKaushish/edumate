"use client";
import { useState } from "react";

interface Chat {
  question: string;
  answer: string;
}

const ChatElement: React.FC = () => {
  const [chatDetails, setChatDetails] = useState<Chat[] | null>(null);

  // Simulating an update to chatDetails
  const loadChatDetails = () => {
    const newChatDetails: Chat[] = [
      { question: "What is your name?", answer: "I am Edumate." },
      { question: "How can you assist me?", answer: "I can provide interesting stories." },
    ];
    setChatDetails(newChatDetails);
  };

  return (
    <div className="chat-container p-4">
      <button
        onClick={loadChatDetails}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Load Chat Details
      </button>
      {chatDetails ? (
        chatDetails.map((chat, index) => (
          <div key={index} className="message mb-2">
            <p className="question font-semibold text-lg">{chat.question}</p>
            <p className="answer text-gray-700">{chat.answer}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No chat details available. Click the button to load.</p>
      )}
    </div>
  );
};

export default ChatElement;
