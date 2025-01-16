import { useState } from "react";

function ChatElement() {
  const [chatDetails, setChatDetails] = useState([
    { question: "What is your name?", answer: "I am Edumate." },
    { question: "How can you assist me?", answer: "I can provide interesting stories." },
  ]);

  return (
    <>
      {chatDetails.map((chat, index) => (
        <div key={index} className={`message`}>
          <p className='question'>{chat.question}</p>
          <p className='answer'>{chat.answer}</p>
        </div>
      ))}
    </>
  );
}

export default ChatElement;
