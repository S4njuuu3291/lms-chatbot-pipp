import React, { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatMenu from "./ChatMenu";
import ChatMessage from "./ChatMessage";
import { FaTimes } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface ChatbotProps {
  onClose: () => void;
}

interface Message {
  text: string;
  isUser: boolean;
}

interface Question {
  parent_intent: string;
  question: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Categories:", isUser: false }
  ]);
  const [categories, setCategories] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from<Question>("questions")
        .select("parent_intent")
        .neq("parent_intent", null)
        .neq("parent_intent", "")
        .order("parent_intent", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }

      if (data) {
        const uniqueCategories = Array.from(new Set(data.map((item) => item.parent_intent)));
        setCategories(uniqueCategories);
      }
    };

    fetchCategories();
  }, []);

  const fetchQuestionsByCategory = async (category: string) => {
    const { data, error } = await supabase
      .from<Question>("questions")
      .select("question")
      .eq("parent_intent", category);

    if (error) {
      console.error("Error fetching questions:", error);
      return [];
    }

    if (data) {
      return data.map((item) => item.question);
    }

    return [];
  };

  const handleCategorySelect = async (category: string) => {
    setMessages((prev) => [...prev, { text: category, isUser: true }]);
    const questions = await fetchQuestionsByCategory(category);

    if (questions.length === 0) {
      setMessages((prev) => [...prev, { text: "No questions found for this category.", isUser: false }]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      ...questions.map((q) => ({ text: q, isUser: false }))
    ]);
  };

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
            <img src="src/assets/image.png" alt="Chatbot Logo" className="img-fluid me-2" style={{ width: "50px", height: "50px" }} />
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
        {messages.map((msg, index) => {
          const firstAIIndex = messages.findIndex(m => !m.isUser);
          return (
            <React.Fragment key={index}>
              <ChatMessage message={msg}>
                {index === firstAIIndex && !msg.isUser && (
                  <ChatMenu
                    onSelect={handleCategorySelect}
                    categories={categories}
                  />
                )}
              </ChatMessage>
            </React.Fragment>
          );
        })}
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default Chatbot;