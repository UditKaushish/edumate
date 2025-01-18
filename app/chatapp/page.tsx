'use client';

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from 'lucide-react';

interface Chat {
  question: string;
  answer?: string;
}

const ChatApp: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const addQuestion = (question: string) => {
    setChatHistory((prevChat) => [...prevChat, { question }]);
    setMessage('');
  };

  const addAnswer = (answer: string) => {
    setChatHistory((prevChat) => {
      const lastItem = prevChat[prevChat.length - 1];
      return [...prevChat.slice(0, -1), { ...lastItem, answer }];
    });
  };

  const sendMessage = () => {
    if (message.trim() === '') return;

    const saveMessage = message;
    addQuestion(saveMessage);
    setIsLoading(true);

    // Mock response for demonstration purposes
    setTimeout(() => {
      const mockResponse = `This is a mock response for: ${saveMessage}`;
      addAnswer(mockResponse);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (messageRef.current) {
      messageRef.current.style.height = 'auto';
      messageRef.current.style.height = `${messageRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00BFA5] to-[#6EC5E9] flex flex-col">
      <main className="flex-grow p-4 overflow-y-auto pb-24">
        <Card className="bg-white/90 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mb-4">
          <h2 className="text-2xl font-bold mb-4 text-[#00BFA5]">Welcome to StoryBot!</h2>
          <p className="text-gray-700 mb-4">
            I&quot;m your friendly AI storyteller. Let&quot;s create amazing stories together! What kind of adventure would you like to start?
          </p>
        </Card>

        <div className="space-y-4 max-w-3xl mx-auto">
          {chatHistory.map((chat, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <Card className="bg-[#FFA726] text-white p-4 rounded-lg self-end max-w-[80%]">
                <p><strong>You:</strong> {chat.question}</p>
              </Card>
              {chat.answer && (
                <Card className="bg-white p-4 rounded-lg self-start max-w-[80%]">
                  <p><strong>StoryBot:</strong> {chat.answer}</p>
                </Card>
              )}
            </div>
          ))}
          {isLoading && (
            <Card className="bg-white p-4 rounded-lg self-start max-w-[80%]">
              <p className="flex items-center">
                <span className="mr-2">StoryBot is thinking</span>
                <span className="loading loading-dots loading-sm"></span>
              </p>
            </Card>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
        <div className="flex items-center max-w-3xl mx-auto">
          <Textarea
            ref={messageRef}
            className="flex-grow mr-2 p-2 rounded-lg border-2 border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent"
            value={message}
            placeholder="Type your message here..."
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={1}
            style={{ resize: 'none' }}
          />
          <Button
            className="bg-[#FFA726] hover:bg-[#FF6F61] text-white"
            onClick={sendMessage}
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
