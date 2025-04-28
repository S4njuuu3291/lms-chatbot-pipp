import React, { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatMenu from "./ChatMenu";
import ChatMessage from "./ChatMessage";
import { FaTimes } from "react-icons/fa";

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const logo = "src/assets/image.png";

  const sendMessage = async (text: string) => {
    setMessages((prev) => [...prev, { text, isUser: true }]);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict-intent/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!data.final_response) {
        throw new Error("Response tidak ditemukan");
      }

      setMessages((prev) => [...prev, { text: data.final_response, isUser: false }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { text: "Error processing your message", isUser: false }]);
    }
  };

  return (
    <div className="container-fluid rounded shadow p-0" style={{ maxWidth: "400px", height: "auto" }}>
      <div className="bg-warning text-white p-3 text-center rounded-top">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {logo && (
              <img src={logo} alt="Chatbot Logo" className="img-fluid me-2" style={{ width: "50px", height: "50px" }} />
            )}
            <h2 className="m-0">Live Unpad</h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
            }}
            aria-label="Close Chatbot"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      <div ref={chatContainerRef} className="overflow-auto chat-message p-4" style={{ height: "270px" }}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={{ text: msg.text, isUser: msg.isUser }} />
        ))}
      </div>

      <ChatMenu onSelect={(question) => sendMessage(question)} />
      <ChatInput onSend={(message) => sendMessage(message)} />
    </div>
  );
};

export default Chatbot;
