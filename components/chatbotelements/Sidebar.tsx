import type React from "react"
import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, Pencil, Trash2, Menu, X } from "lucide-react"

interface Chat {
  id: string
  name: string
}

interface ChatSidebarProps {
  chats: Chat[]
  activeChat: string | null
  onNewChat: () => void
  onSelectChat: (id: string) => void
  onRenameChat: (id: string, newName: string) => void
  onDeleteChat: (id: string) => void
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats = [],
  activeChat,
  onNewChat,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
}) => {
  const [editingChatId, setEditingChatId] = useState<string | null>(null)
  const [editingChatName, setEditingChatName] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const handleRenameClick = useCallback((chat: Chat) => {
    setEditingChatId(chat.id)
    setEditingChatName(chat.name)
  }, [])

  const handleRenameSubmit = useCallback(
    (id: string) => {
      onRenameChat(id, editingChatName)
      setEditingChatId(null)
    },
    [editingChatName, onRenameChat]
  )

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const renderedChats = useMemo(
    () =>
      console.log(chats) ||
      chats.map((chat) => (
        <div
          key={chat.id}
          className={`mb-2 p-2 rounded cursor-pointer flex items-center justify-between ${
            chat.id === activeChat ? "bg-[#00A896]" : "hover:bg-[#00A896]"
          }`}
          onClick={() => {
            onSelectChat(chat.id)
            setIsMobileMenuOpen(false)
          }}
        >
          {editingChatId === chat.id ? (
            <Input
              value={editingChatName}
              onChange={(e) => setEditingChatName(e.target.value)}
              onBlur={() => handleRenameSubmit(chat.id)}
              onKeyDown={(e) => e.key === "Enter" && handleRenameSubmit(chat.id)}
              className="text-black"
              autoFocus
            />
          ) : (
            <>
              <span className="truncate flex-grow">{chat.name}</span>
              <div className="flex space-x-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRenameClick(chat)
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteChat(chat.id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      )),
    [chats, activeChat, editingChatId, editingChatName, handleRenameClick, handleRenameSubmit, onSelectChat, onDeleteChat]
  )

  return (
    <>
      <Button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#00BFA5] hover:bg-[#00A896] text-white"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out md:transition-none z-40 md:z-0`}
      >
        <div className="w-64 bg-[#00BFA5] text-white p-4 flex flex-col h-full">
          <Button onClick={onNewChat} className="mb-4 bg-[#FFA726] hover:bg-[#FF6F61] text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Chat
          </Button>
          <ScrollArea className="flex-grow">{renderedChats}</ScrollArea>
        </div>
      </div>
    </>
  )
}

export default ChatSidebar
