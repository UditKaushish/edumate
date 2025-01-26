"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, VolumeX, Volume2, Loader } from "lucide-react";
import VoiceInputButton from "@/components/VoiceInputButton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import ChatSidebar from "@/components/chatbotelements/Sidebar";
import { useProfile } from "@/components/navigation";
import {useRouter} from 'next/navigation'
import { useChatList,useCreateSession,useDeleteSession,useAddMessageToHistory,useEditChatName,useGetChatHistory} from "./mutations";
interface ChatMessage {
  question: string;
  answer?: string;
}

interface Chat {
  id: string;
  name: string;
  messages: ChatMessage[];
}


interface Voice {
  name: string;
  lang: string;
}

interface ChatAppProps {
  handleLogout: () => void;
}

const ChatApp: React.FC<ChatAppProps> = () => {
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string>("");  // State for active chat
  const [question, setQuestion] = useState<string>("");  // State for question
  const [answer, setAnswer] = useState<string>("");  // State for answer
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);

  const { data } = useChatList();
  useEffect(() => {
    if (data) {
      // Safely initialize chats with empty messages
      setChats((prevChats) =>
        data.map((chat) => {
          const existingChat = prevChats.find((c) => c.id === chat.chatId);
          return {
            id: chat.chatId,
            name: chat.Name,
            messages: existingChat?.messages || [], // Preserve existing messages if any
          };
        })
      );
    }
  }, [data]);
  
  useEffect(() => {
    if (activeChat) {
      // Clear messages for the newly active chat
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChat
            ? { ...chat, messages: [] } // Clear messages
            : chat
        )
      );
    }
  }, [activeChat]);
  
  const { data: chatdata } = useGetChatHistory({
    chatId: activeChat,
    page: 1,
    limit: 10,
  });
  
  useEffect(() => {
    if (chatdata) {
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === activeChat) {
            const updatedMessages = chatdata.messages.map((message) => ({
              question: message.message,
              answer: message.response,
            }));
  
            // Only update messages if they are different
            if (JSON.stringify(chat.messages) !== JSON.stringify(updatedMessages)) {
              return { ...chat, messages: updatedMessages };
            }
          }
          return chat;
        })
      );
    }
  }, [chatdata, activeChat]);

  // const { mutate: getChatHistory } = useGetChatHistory();
  // useEffect(() => {
  //   if (activeChat) {
  //     getChatHistory(activeChat, {
  //       onSuccess: (data) => {
  //         const chat = chats.find((chat) => chat.id === activeChat);
  //         if (chat) {
  //           chat.messages = data.map((message) => ({ question: message.message, answer: message.response }));
  //           setChats([...chats]);
  //         }
  //       },
  //       onError: (error) => {
  //         console.error("Failed to fetch chat history:", error);
  //       },
  //     });
  //   }
  // }, [activeChat,chats,getChatHistory]);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
    const {isSuccess,isPending} = useProfile();
    const isLoggedIn  = isSuccess;

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
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

  const { mutate:historymessage } = useAddMessageToHistory();
  const addAnswer = (chatId: string, answer: string, question: string) => {
    // First, call the mutation to add the message to history
    historymessage(
      {
        sessionId: chatId, // Use chatId as the sessionId
        message: question, // The question is the message
        response: answer, // The answer is the response
      },
      {
        onSuccess: () => {
          // After successfully adding the message to history, update chats
          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === chatId
                ? {
                    ...chat,
                    messages: [...chat.messages, { question, answer }],
                  }
                : chat
            )
          );
        },
        onError: (error) => {
          // Handle error if needed
          console.error("Error adding message to history:", error);
        },
      }
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

const sendMessage = async () => {
  if (question.trim() === "") return;

  // addQuestion(activeChat, question); // Add the question separately
  setIsLoading(true);

  try {
    const response = await fetch("http://127.0.0.1:4000/get-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch answer");
    }

    const data = await response.json();
    setAnswer(data.answer);  // Set the answer separately
    addAnswer(activeChat, data.answer,question);
  } catch (error) {
    console.error("Error fetching answer:", error);
    setAnswer("Sorry, I couldn't fetch an answer. Please try again.");
    addAnswer(activeChat, "Sorry, I couldn't fetch an answer. Please try again.",question);
  } finally {
    setIsLoading(false);
    setQuestion("");  // Clear the input field after submitting
  }
};

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value); // Update question
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

  const { mutate: createSession} = useCreateSession();
  const handleNewChat = useCallback(() => {
    createSession(undefined, {
      onSuccess: (data) => {
        const newChat = {
          id: data.chatId, // Use the chatId from the response
          name: data.Name || `New Adventure ${data.chatId}`, // Use the Name from the response or a default value
          messages: [], // Initialize messages as an empty array
        };

        setChats((prevChats) => [...prevChats, newChat]); // Add the new chat to the list
        setActiveChat(data.chatId); // Set the new chat as active
      },
      onError: (error) => {
        console.error('Failed to create a new chat session:', error.message);
      },
    });
  },[createSession]);
  useEffect(() => {
    if (data) {
      setChats(data.map((chat) => ({ id: chat.chatId, name: chat.Name, messages: [] })));
    }
  }, [data]);
  useEffect(() => {
    if (!mounted) {
      setMounted(true); // Mark the component as mounted
      if (!activeChat) {
        handleNewChat();
      }
    }
  }, [activeChat, handleNewChat, mounted]);
  const handleSelectChat = (id: string) => {
    setActiveChat(id);
  };

  const { mutate: editChatName} = useEditChatName();

  const handleRenameChat = (chatId: string, newName: string) => {
    editChatName(
      { sessionId: chatId, newName },
      {
        onSuccess: (updatedChat) => {
          // Update the chat list with the renamed chat
          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === chatId ? { ...chat, name: updatedChat.Name } : chat
            )
          );
        },
        onError: (error) => {
          console.error('Failed to rename chat:', error.message);
        },
      }
    );
  };

  const { mutate:Deletesession} = useDeleteSession(); // Call the mutation hook

  const handleDeleteChat = (id: string) => {
    // First, call the delete session mutation
    Deletesession(id, {
      onSuccess: () => {
        // Update chats after the mutation is successful
        setChats((prevChats) => prevChats.filter((chat) => chat.id !== id));
        if (activeChat === id) {
          setActiveChat(chats[0]?.id || "");
        }
      },
      onError: (error) => {
        // Handle error, if needed
        console.error("Error deleting session:", error);
      },
    });
  };

  const currentChat = chats.find((chat) => chat.id === activeChat);

  if (isPending) {
    // Show a loading screen while user authentication is pending
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00BFA5] to-[#6EC5E9]">
        <Loader className="h-12 w-12 text-white animate-spin" />
      </div>
    );
  }
  if (!isLoggedIn) {
    router.push("/login");
  }
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
            value={question}
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
            <VoiceInputButton onTranscript={setQuestion} />
            <Button className="bg-[#FFA726] hover:bg-[#FF6F61] text-white" onClick={sendMessage}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
