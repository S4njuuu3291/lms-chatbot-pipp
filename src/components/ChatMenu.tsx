import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Konfigurasi Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface ChatMenuProps {
  onSelect: (question: string) => void;
}

const ChatMenu: React.FC<ChatMenuProps> = ({ onSelect }) => {
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("dataset-pertanyaan") // Nama tabel Supabase
        .select("pertanyaan");

      if (error) {
        console.error("Gagal mengambil data:", error);
        return;
      }

      if (data) {
        const shuffled = data.sort(() => Math.random() - 0.5);
        setQuestions(shuffled.slice(0, 4).map((item) => item.pertanyaan));
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="p-3 border-top">
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <button
            key={index}
            className="btn btn-outline-warning w-100 mb-1 text-start"
            onClick={() => onSelect(question)}
          >
            {question}
          </button>
        ))
      ) : (
        <p className="text-muted">Memuat pertanyaan...</p>
      )}
    </div>
  );
};

export default ChatMenu;
