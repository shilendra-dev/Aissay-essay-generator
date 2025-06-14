import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [topic, setTopic] = useState("");
  const [wordCount, setWordCount] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [essay, setEssay] = useState("");
  const [loadingStage, setLoadingStage] = useState("");

  const handleGenerate = async () => {
    if (!topic || !wordCount) {
      setError("Please enter both topic and word count.");
      return;
    }

    setLoading(true);
    setEssay("");
    setError("");
    setLoadingStage("");

    const messages = [
      "Looking for data",
      "Gathering information",
      "Forming a structure",
      "Finalizing essay..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLoadingStage(messages[i]);
      i = (i + 1) % messages.length;
    }, 1000);

    try {
      const res = await axios.post("http://localhost:5001/api/essay/generate", {
        topic,
        wordCount,
      });

      clearInterval(interval);
      setLoading(false);
      setEssay(res.data.essay);
    } catch (error) {
      clearInterval(interval);
      console.error("Error generating essay:", error);
      setError(error.response?.data?.error || "Failed to generate essay.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="blob-bg">
        <div className="blob w-[60vw] h-[60vw] bg-blue-900 top-[-20%] left-[-10%]" style={{ animation: 'blobOne 35s ease-in-out infinite alternate' }}></div>
        <div className="blob w-[50vw] h-[50vw] bg-indigo-950 top-[30%] left-[50%]" style={{ animation: 'blobTwo 30s ease-in-out infinite alternate' }}></div>
        <div className="blob w-[40vw] h-[40vw] bg-purple-900 top-[70%] left-[20%]" style={{ animation: 'blobThree 40s ease-in-out infinite alternate' }}></div>
      </div>

      <div className={`relative z-10 backdrop-blur-3xl min-h-screen text-white px-4 py-10 flex flex-col items-center font-sans transition-all duration-500 ${!essay && !loading ? 'justify-center' : ''}`}>
        
        <motion.h1
          layout
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-4xl font-bold text-[#a98ce8] mb-8 drop-shadow-md font-mono opacity-80"
        >
          Essay Generator
        </motion.h1>

        <motion.div
          layout
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-2xl"
        >
          <input
            type="text"
            placeholder="Enter Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-3 rounded-lg bg-[#1e296f33] text-white placeholder-gray-400 focus:outline-none ring-2 ring-blue-950 focus:ring-2 focus:ring-blue-900"
          />
          <input
            type="number"
            placeholder="Word Count"
            value={wordCount}
            onChange={(e) => setWordCount(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-3 rounded-lg bg-[#1e296f33] text-white placeholder-gray-400 ring-2 ring-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-[#1c33ce7b] hover:bg-blue-900 rounded-lg disabled:opacity-50 transition"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </motion.div>

        {error && (
          <div className="mt-4 text-red-400 text-sm max-w-xl text-center">{error}</div>
        )}

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center"
            >
              <div className="flex space-x-2 mb-6">
                <motion.div
                  className="w-4 h-4 bg-blue-500 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    ease: "easeInOut",
                    delay: 0,
                  }}
                />
                <motion.div
                  className="w-4 h-4 bg-blue-500 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                />
                <motion.div
                  className="w-4 h-4 bg-blue-500 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                />
              </div>
              <motion.p
                key={loadingStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-xl text-blue-400 font-semibold tracking-wide px-4"
              >
                {loadingStage}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {essay && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="mt-10 p-6 w-full max-w-3xl rounded-xl shadow-lg bg-white/5 backdrop-blur-md border border-white/10 text-gray-200 leading-relaxed whitespace-pre-wrap"
            >
              {essay}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;