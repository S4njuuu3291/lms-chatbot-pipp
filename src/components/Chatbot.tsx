import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatMenu from './ChatMenu';
import ChatMessage from './ChatMessage';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const logo = "src\\assets\\image.png"; // Placeholder for future logo implementation

  const handleSendMessage = (message: string) => {
    setMessages([...messages, message]);
  };

  const handleMenuSelect = (question: string) => {
    setMessages([...messages, question]);
  };

  return (
    <div className="container-fluid rounded shadow p-0" style={{maxWidth: '370px', height: 'auto'}}>
      <div className="bg-warning text-white p-3 text-center rounded-top">
        <div className="d-flex align-items-center justify-content">
          {logo && (
            <img 
              src={logo} 
              alt="Chatbot Logo" 
              className="img-fluid me-2" 
              style={{ width: '50px', height: '50px' }} 
            />
          )}
          <h2 className="m-0">Live Unpad</h2>
        </div>
      </div>
      <div className="overflow-auto chat-message p-3" style={{height: '270px'}}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} isUserMessage={index % 2 === 0} />
        ))}
      </div>
      <ChatMenu onSelect={handleMenuSelect} />
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default Chatbot;
