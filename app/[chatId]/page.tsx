"use client";
import { useState } from "react";

interface Chat {
  question: string;
  answer: string;
}

const ChatElement: React.FC = () => {
  const [chatDetails, setChatDetails] = useState<Chat[]>([
    { question: "What is your name?", answer: "I am Edumate." },
    { question: "How can you assist me?", answer: "I can provide interesting stories." },
  ]);

  return (
    <div className="chat-container">
      {chatDetails.map((chat, index) => (
        <div key={index} className="message">
          <p className="question font-semibold text-lg">{chat.question}</p>
          <p className="answer text-gray-700">{chat.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatElement;
