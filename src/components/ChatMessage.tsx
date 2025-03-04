import React from 'react';

interface ChatMessageProps {
  message: string;
  isUserMessage?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUserMessage }) => {
  return (
      <div className={`chat-message ${isUserMessage ? 'user-message' : 'chatbot-message'}`} style={{ textAlign: isUserMessage ? 'right' : 'left' }}>
        <div className="grayish-message-box" style={{ padding: '0.5rem', display: 'inline-block' }}> {/* Adjusted padding and made width dynamic */}
          {message}
        </div>
      </div>
  );
};

export default ChatMessage;
