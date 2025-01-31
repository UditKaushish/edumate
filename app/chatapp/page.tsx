"use client";

import React, { useState, useRef, useEffect } from "react";
import ChatSidebar from "@/components/ChatSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, VolumeX, Volume2 } from "lucide-react";
import VoiceInputButton from "@/components/VoiceInputButton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Chat {
  id: string;
  name: string;
  question: string;
  answer?: string;
}

interface Voice {
  name: string;
  lang: string;
}

const ChatApp: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([]); // List of all chats
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      synthesisRef.current = window.speechSynthesis;

      const voices = synthesisRef.current.getVoices();
      setAvailableVoices(voices.map((voice) => ({ name: voice.name, lang: voice.lang })));
      if (voices.length > 0) {
        setSelectedVoice(voices[0].name);
      }

      synthesisRef.current.onvoiceschanged = () => {
        const updatedVoices = synthesisRef.current!.getVoices();
        setAvailableVoices(updatedVoices.map((voice) => ({ name: voice.name, lang: voice.lang })));
      };
    }
  }, []);

  const addQuestion = (question: string) => {
    if (!activeChatId) return;

    setChatHistory((prevChat) => [...prevChat, { id: activeChatId, name: "Chat", question }]);
    setMessage("");
  };

  const addAnswer = (answer: string) => {
    setChatHistory((prevChat) => {
      const lastItem = prevChat[prevChat.length - 1];
      return [...prevChat.slice(0, -1), { ...lastItem, answer }];
    });

    if (voiceEnabled && synthesisRef.current) {
      const utterance = new SpeechSynthesisUtterance(answer);
      const selectedVoiceObj = synthesisRef.current.getVoices().find((voice) => voice.name === selectedVoice);
      if (selectedVoiceObj) {
        utterance.voice = selectedVoiceObj;
      }
      synthesisRef.current.speak(utterance);
    }
  };

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const saveMessage = message;
    addQuestion(saveMessage);
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/get-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: saveMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch answer");
      }

      const data = await response.json();
      addAnswer(data.answer);
    } catch (error) {
      console.error("Error fetching answer:", error);
      addAnswer("Sorry, I couldn't fetch an answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (messageRef.current) {
      messageRef.current.style.height = "auto";
      messageRef.current.style.height = `${messageRef.current.scrollHeight}px`;
    }
  };

  const toggleVoiceOutput = () => {
    setVoiceEnabled(!voiceEnabled);
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
  };

  // ChatSidebar handlers
  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      name: `Chat ${chats.length + 1}`,
      question: "",
      answer: "",
    };
    setChats((prevChats) => [...prevChats, newChat]);
    setActiveChatId(newChat.id);
    setChatHistory([]);
  };

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setChatHistory(chats.filter((chat) => chat.id === id));
  };

  const handleRenameChat = (id: string, newName: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === id ? { ...chat, name: newName } : chat))
    );
  };

  const handleDeleteChat = (id: string) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
      setChatHistory([]);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#00BFA5] to-[#6EC5E9]">
      {/* Chat Sidebar */}
      <ChatSidebar
        chats={chats}
        activeChat={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
      />

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        <main className="flex-grow p-4 pb-24 overflow-y-auto">
          {/* Main Chat Display */}
          <Card className="bg-white/90 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mb-4">
            <h2 className="text-2xl font-bold mb-4 text-[#00BFA5]">Welcome to StoryBot!</h2>
            <p className="text-gray-700 mb-4">
              I'm your friendly AI storyteller. Let's create amazing stories together!
            </p>
            {/* Voice Toggle */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <Switch id="voice-output" checked={voiceEnabled} onCheckedChange={toggleVoiceOutput} />
                <Label htmlFor="voice-output">Enable voice output</Label>
                {voiceEnabled ? (
                  <Volume2 className="h-4 w-4 text-[#00BFA5]" />
                ) : (
                  <VolumeX className="h-4 w-4 text-gray-400" />
                )}
              </div>
              {voiceEnabled && (
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {availableVoices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name} onClick={setSelectedVoice}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            )}
            </div>
          </Card>

          {/* Chat History */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {chatHistory.map((chat, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <Card className="bg-[#FFA726] text-white p-4 rounded-lg self-end max-w-[80%]">
                  <p>
                    <strong>You:</strong> {chat.question}
                  </p>
                </Card>
                {chat.answer && (
                  <Card className="bg-white p-4 rounded-lg self-start max-w-[80%]">
                    <p>
                      <strong>StoryBot:</strong> {chat.answer}
                    </p>
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

        {/* Message Input */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
          <div className="flex items-center max-w-3xl mx-auto">
            <Textarea
              ref={messageRef}
              className="flex-grow mr-2 p-2 rounded-lg border-2 border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent"
              value={message}
              placeholder="Type your message here..."
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows={1}
              style={{ resize: "none" }}
            />
            <div className="flex space-x-2">
              <VoiceInputButton onTranscript={setMessage} />
              <Button className="bg-[#FFA726] hover:bg-[#FF6F61] text-white" onClick={sendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
