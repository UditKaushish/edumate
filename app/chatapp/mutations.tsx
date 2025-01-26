import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
interface SessionData {
  id: string;
  chatId: string;
  userId: string;
  Name: string;
  createdAt: string;
  updatedAt: string;
}

export const useCreateSession = () => {
  return useMutation<SessionData, Error>({
    mutationFn: async () => {
      const token = localStorage.getItem('Token'); // Retrieve the token from localStorage

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('http://localhost:5000/chat/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create session');
      }

      const responseData = await response.json();
      return responseData.data; // Extract the `data` field from the response
    },
  });
};

type DeleteSessionResponse = { message: string };

export const useDeleteSession = () => {
  return useMutation<DeleteSessionResponse, Error, string>({
    mutationFn: async (sessionId: string) => {
      const token = localStorage.getItem('Token'); // Retrieve the token from localStorage

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`http://localhost:5000/chat/${sessionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete session');
      }

      return response.json(); // Parse the success response
    },
  });
};

type ChatSession = {
  id: string;
  chatId: string;
  userId: string;
  Name: string;
  createdAt: string;
  updatedAt: string;
};

export const useChatList = () => {
  return useQuery<ChatSession[], Error>({
    queryKey: ['chatList'],
    queryFn: async () => {
      const token = localStorage.getItem('Token'); // Retrieve the token from localStorage

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('http://localhost:5000/chat/list', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token as a Bearer token
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch chat list');
      }

      return response.json(); // Parse the response containing the list of chats
    },
  });
};

type EditChatNameResponse = {
    id: string;
    chatId: string;
    userId: string;
    Name: string;
    createdAt: string;
    updatedAt: string;
  };
  
  export const useEditChatName = () => {
    return useMutation<EditChatNameResponse, Error, { sessionId: string; newName: string }>({
      mutationFn: async ({ sessionId, newName }) => {
        const token = localStorage.getItem('Token'); // Retrieve the token from localStorage
  
        if (!token) {
          throw new Error('Authentication token not found');
        }
  
        const response = await fetch(`http://localhost:5000/chat/${sessionId}/name`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`, // Pass the token as a Bearer token
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ chatName: newName }), // Send the new Name in the request body
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to edit chat name');
        }
  
        return response.json(); // Return the updated chat session data
      },
    });
  };
  
type ChatMessageResponse = {
  id: string;
  message: string;
  response: string;
  chatId: string;
  createdAt: string;
  updatedAt: string;
};
type HistoryInput = {
  sessionId: string;
  message: string;
  response: string;
};


export const useAddMessageToHistory = () => {
  return useMutation<ChatMessageResponse, Error, HistoryInput>({
    mutationFn: async ({ sessionId, message, response }: HistoryInput) => {
      const token = localStorage.getItem('Token'); // Retrieve the token from localStorage

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const responseData = await fetch(`http://localhost:5000/chat/${sessionId}/chat`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // Pass the token as a Bearer token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, response }), // Send message and response in the request body
      });

      if (!responseData.ok) {
        const errorData = await responseData.json();
        throw new Error(errorData.message || 'Failed to add message to history');
      }

      return responseData.json(); // Return the chat message response
    },
  });
};

interface ChatHistoryResponse {
    id: string;
    message: string;
    response: string;
    chatId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalChats: number;
  }
  
  interface GetChatHistoryParams {
    chatId: string;
    page: number;
    limit: number;
  }
  
  // Function to fetch chat history
  const fetchChatHistory = async ({
    chatId,
    page = 1,
    limit = 10,
  }: GetChatHistoryParams): Promise<{ data: ChatHistoryResponse[]; pagination: PaginationInfo }> => {
    try {
      const token = localStorage.getItem('Token'); // Retrieve the token
      const response = await fetch(`http://localhost:5000/chat/latest/${chatId}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch chat history: ${response.statusText}`);
      }
  
      const data = await response.json(); // Parse the JSON response
      return data; // Return the structured data
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error; // Ensure errors propagate to `useQuery` for error handling
    }
  };
  

  export const useGetChatHistory = ({ chatId, page = 1, limit = 10 }: GetChatHistoryParams) => {
    return useQuery({
      queryKey: ['chatHistory', chatId, page, limit],
      queryFn: () => fetchChatHistory({ chatId, page, limit }),
      enabled: !!chatId, // Fetch only if chatId exists
      staleTime: 5000, // Cache for 5 seconds
      select: (data) => ({
        messages: data.data.map((item) => ({
          id: item.id,
          message: item.message,
          response: item.response,
          createdAt: new Date(item.createdAt),
        })),
        pagination: data.pagination,
      }), // Map the response to a more useful structure
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
    });
  };