import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa'; // Importing the paper airplane icon


interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="input-group mb-3 p-3">
      <input
        type="text"
        className="form-control"
        placeholder="Tuliskan keluh kesah anda..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }} // Added Enter key functionality
        style={{ padding: '0.5rem', width: 'auto' }} // Adjusted padding and made width dynamic
      />


      <button className="btn" style={{ backgroundColor: 'orange', color: 'white' }} onClick={handleSend}>
        <FaPaperPlane /> Kirim

      </button>
    </div>
  );
};

export default ChatInput;
