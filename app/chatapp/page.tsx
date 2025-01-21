"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Send, VolumeX, Volume2 } from "lucide-react"
import VoiceInputButton from "@/components/VoiceInputButton"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import ChatSidebar from "@/components/chatbotelements/Sidebar"

interface ChatMessage {
  question: string
  answer?: string
}

interface Chat {
  id: string
  name: string
  messages: ChatMessage[]
}

interface Voice {
  name: string
  lang: string
}

interface ChatAppProps {
  handleLogout: () => void
}

const ChatApp: React.FC<ChatAppProps> = () => {
  const [chats, setChats] = useState<Chat[]>([{ id: "1", name: "First Adventure", messages: [] }])
  const [activeChat, setActiveChat] = useState<string>("1")
  const [message, setMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false)
  const [availableVoices, setAvailableVoices] = useState<Voice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string>("")

  const messageRef = useRef<HTMLTextAreaElement | null>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthesisRef.current = window.speechSynthesis

      const voices = synthesisRef.current.getVoices()
      setAvailableVoices(voices.map((voice) => ({ name: voice.name, lang: voice.lang })))
      if (voices.length > 0) {
        setSelectedVoice(voices[0].name)
      }

      synthesisRef.current.onvoiceschanged = () => {
        const updatedVoices = synthesisRef.current!.getVoices()
        setAvailableVoices(updatedVoices.map((voice) => ({ name: voice.name, lang: voice.lang })))
      }
    }
  }, [])

  const addUserMessage = (chatId: string, question: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, { question }],
            }
          : chat
      )
    );
  };
  
  const addResponse = (chatId: string, question: string, answer: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, { answer }], // Only include the answer in messages
            }
          : chat
        )
    );
  
    // Handle voice synthesis if enabled
    if (voiceEnabled && synthesisRef.current) {
      const utterance = new SpeechSynthesisUtterance(answer);
      const selectedVoiceObj = synthesisRef.current
        .getVoices()
        .find((voice) => voice.name === selectedVoice);
      if (selectedVoiceObj) {
        utterance.voice = selectedVoiceObj;
      }
      synthesisRef.current.speak(utterance);
    }
  };
  
  

  const sendMessage = () => {
    if (message.trim() === "") return;
  
    const currentChat = chats.find((chat) => chat.id === activeChat);
    if (!currentChat) return;
  
    // Add the user's message
    const userMessage = message; // Capture the user message
    // addUserMessage(activeChat, userMessage); // Add only the user message to the chat
    setMessage(""); // Clear the input field
    setIsLoading(true); // Show loading state
  
    // Mock response
    setTimeout(() => {
      const mockResponse = `This is a mock response for: ${userMessage}`; // Use captured message
      addResponse(activeChat, userMessage, mockResponse); // Add bot response
      setIsLoading(false); // End loading state
    }, 1000);
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    if (messageRef.current) {
      messageRef.current.style.height = "auto"
      messageRef.current.style.height = `${messageRef.current.scrollHeight}px`
    }
  }

  const toggleVoiceOutput = () => {
    setVoiceEnabled(!voiceEnabled)
    if (synthesisRef.current) {
      synthesisRef.current.cancel()
    }
  }

  const handleNewChat = () => {
    const newChatId = (chats.length + 1).toString()
    const newChat: Chat = {
      id: newChatId,
      name: `New Adventure ${newChatId}`,
      messages: [],
    }
    setChats([...chats, newChat])
    setActiveChat(newChatId)
  }

  const handleSelectChat = (id: string) => {
    setActiveChat(id)
  }

  const handleRenameChat = (id: string, newName: string) => {
    setChats((prevChats) => prevChats.map((chat) => (chat.id === id ? { ...chat, name: newName } : chat)))
  }

  const handleDeleteChat = (id: string) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== id))
    if (activeChat === id) {
      setActiveChat(chats[0]?.id || "")
    }
  }

  const currentChat = chats.find((chat) => chat.id === activeChat)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00BFA5] to-[#6EC5E9] flex flex-col">
      <div className="flex-grow flex">
        <ChatSidebar
          chats={chats}
          activeChat={activeChat}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onRenameChat={handleRenameChat}
          onDeleteChat={handleDeleteChat}
        />

        <main className="flex-grow p-4 pb-24 overflow-y-auto">
          <Card className="bg-white/90 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mb-4">
            <h2 className="text-2xl font-bold mb-4 text-[#00BFA5]">Welcome to StoryBot!</h2>
            <p className="text-gray-700 mb-4">
              I&apos;m your friendly AI storyteller. Let&apos;s create amazing stories together!
            </p>
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
                    <SelectValue>{selectedVoice || "Select a voice"}</SelectValue>
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

          <div className="space-y-4 max-w-3xl mx-auto">
            {currentChat?.messages.map((chat, index) => (
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
      </div>

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
                e.preventDefault()
                sendMessage()
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
  )
}

export default ChatApp
