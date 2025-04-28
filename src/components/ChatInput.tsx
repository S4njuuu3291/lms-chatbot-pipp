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
        style={{ padding: '0.5rem 1rem', width: 'auto', borderRadius:"20px", fontSize:"15px"}} // Adjusted padding and made width dynamic
      />


      <button className="btn d-flex justify-content-center align-items-center" style={{ backgroundColor: 'orange', color: 'white', borderRadius: '50%', border: 'none', padding: '0.2rem', height:"50px",width:"50px",marginLeft:"7px" }} onClick={handleSend}>
        <FaPaperPlane style={{fontSize:"20px" }}/>

      </button>
    </div>
  );
};

export default ChatInput;
