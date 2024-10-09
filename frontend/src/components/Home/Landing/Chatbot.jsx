import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getResponseForGivenPrompt = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);
      const response = await result.response;

      // Ensure response is in expected object structure
      const text = await response.text();
      const parts = [{ content: text }]; // Wrap text in an object with a "content" key

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", parts },
      ]);
    } catch (error) {
      console.log("Something Went Wrong:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    // Append user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", parts: [{ content: input }] },
    ]);
    setInput("");

    // Call the function to get the bot's response
    await getResponseForGivenPrompt();
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-col space-y-4 overflow-y-auto max-h-[400px] p-4 bg-gray-50 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.role === "user"
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white self-end"
                : "bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800 self-start"
            }`}
          >
            {msg.parts.map((part, idx) => (
              <p key={idx}>{part.content}</p>
            ))}
          </div>
        ))}
        {loading && (
          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800 self-start">
            Typing...
          </div>
        )}
        <div ref={chatRef} />
      </div>
      <div className="flex items-center mt-4 space-x-2">
        <input
          type="text"
          className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
