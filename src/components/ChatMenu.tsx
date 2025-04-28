import React, { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// Konfigurasi Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface ChatMenuProps {
  onSelect: (question: string) => void;
}

const ChatMenu: React.FC<ChatMenuProps> = ({ onSelect }) => {
  const [allQuestions, setAllQuestions] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengacak question (menggunakan useCallback)
  const shuffleQuestions = useCallback(() => {
    if (allQuestions.length > 0) {
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, 4)); // Ambil 4 question acak
    }
  }, [allQuestions]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true); // Set loading menjadi true sebelum mengambil data

      const { data, error } = await supabase
        .from("questions")
        .select("question")
        .not("intent", "in", '("sapaan", "selesai")');


      if (error) {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
        return;
      }

      if (data) {
        const questionList = data.map((item: { question: string }) => item.question);
        setAllQuestions(questionList); // Simpan ke state
      }

      setLoading(false);
    };

    fetchQuestions();
  }, []);

  // Ketika allQuestions berubah, baru lakukan shuffle pertama kali
  useEffect(() => {
    if (allQuestions.length > 0) {
      shuffleQuestions();
    }
  }, [allQuestions, shuffleQuestions]);

  return (
    <div className="pt-3 px-3 border-top mb-0">
      {/* Jika masih loading, tampilkan "Memuat question..." */}
      {loading ? (
        <p className="text-muted">Memuat question...</p>
      ) : questions.length > 0 ? (
        questions.map((question, index) => (
          <button
            key={index}
            className="btn btn-outline-warning w-100 mb-1 text-start text-dark"
            onClick={() => onSelect(question)}
          >
            {question}
          </button>
        ))
      ) : (
        <p className="text-muted">Tidak ada question tersedia.</p>
      )}

      <div className="d-flex justify-content-between align-items-center mt-2">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={shuffleQuestions}
          disabled={loading || allQuestions.length === 0}
        >
          ↻ Shuffle
        </button>
      </div>
    </div>
  );
};

export default ChatMenu;
