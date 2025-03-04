import React from 'react';

interface ChatMenuProps {
  onSelect: (question: string) => void;
}

const ChatMenu: React.FC<ChatMenuProps> = ({ onSelect }) => {
  const questions = [
    'Saya tidak bisa login',
    'Saya tidak tau cara register',
    'Tolong, kaki saya sakit'
  ];

  return (
    <div className="p-3 border-top">
      {questions.map((question, index) => (
        <button
          key={index}
          className="btn btn-outline-warning w-100 mb-1 text-start"
          onClick={() => onSelect(question)}
        >
          {question}
        </button>
      ))}
    </div>
  );
};


export default ChatMenu;
