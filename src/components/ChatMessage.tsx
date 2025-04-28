import React from 'react';
import ReactMarkdown from "react-markdown";

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatMessageProps {
  message: Message; // Mengubah menjadi satu pesan
}


const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {

  return (
    <div>
      <div style={{ textAlign: message.isUser ? 'right' : 'left' }}>
        <div className="grayish-message-box mb-3 w-75" style={{ width:'auto',padding: '0.5rem', display: 'inline-block', }}> {/* Adjusted padding and made width dynamic */}
        <div className="markdown-content" style={{height:"auto", alignItems:"center"}}>
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>


          {/* {message.text} */}
        </div>
      </div>

    </div>
  );
};

export default ChatMessage;
