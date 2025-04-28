import React, { useState } from 'react';
import './components/Chatbot.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chatbot from './components/Chatbot';
import { FaComments } from 'react-icons/fa';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating chatbot icon button */}
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#fd7e14', // Orange color to match chatbot
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Open Chatbot"
        >
          <FaComments size={30} />
        </button>
      )}

      {/* Conditionally render chatbot */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            top: '20px',
            width: '90vw',
            maxWidth: '400px',
            maxHeight: 'calc(100vh - 40px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            borderRadius: '10px',
            backgroundColor: 'white',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Chatbot onClose={toggleChatbot} />
        </div>
      )}
    </>
  );
}

export default App;
