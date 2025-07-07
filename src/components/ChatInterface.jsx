import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ChatInterface = ({ request, currentUser, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const { sendMessage, markMessagesAsRead } = useAuth();

  useEffect(() => {
    // Load messages for this request
    const allMessages = JSON.parse(localStorage.getItem('craftconnect_messages')) || [];
    const requestMessages = allMessages.filter(
      msg => msg.requestId === request.id
    );
    setMessages(requestMessages);
    
    // Mark messages as read
    markMessagesAsRead(request.id, currentUser.id);
    
    // Scroll to bottom
    scrollToBottom();
  }, [request.id, currentUser.id, markMessagesAsRead]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setIsSending(true);
    
    const message = {
      requestId: request.id,
      senderId: currentUser.id,
      receiverId: receiverId,
      text: newMessage
    };
    
    const sentMessage = sendMessage(message);
    setMessages(prev => [...prev, sentMessage]);
    setNewMessage('');
    setIsSending(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-lg mb-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${message.senderId === currentUser.id ? 'text-right' : ''}`}
            >
              <div
                className={`inline-block max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                  message.senderId === currentUser.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border border-gray-300 rounded-l-lg p-3 resize-none"
          placeholder="Type your message..."
          rows={2}
          disabled={isSending}
        ></textarea>
        <button
          onClick={handleSendMessage}
          disabled={isSending || !newMessage.trim()}
          className={`bg-blue-600 text-white px-4 rounded-r-lg ${
            isSending || !newMessage.trim()
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-700'
          }`}
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;