// src/components/ChatBot.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const res = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
      }, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          "Content-Type": "application/json",
        },
      });

      const botMessage = {
        sender: "bot",
        text: res.data.choices[0].message.content,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: "bot", text: "Oops! Something went wrong." }]);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ marginBottom: 15 }}>Chat with our AI Assistant</h3>
        <div
          style={{
            height: 300,
            overflowY: "auto",
            marginBottom: 10,
            border: "1px solid #ddd",
            borderRadius: 6,
            padding: 10,
            backgroundColor: "#fafafa",
            flexGrow: 1,
          }}
        >
          {messages.map((msg, i) => (
            <p
              key={i}
              style={{
                textAlign: msg.sender === "user" ? "right" : "left",
                margin: "5px 0",
              }}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </p>
          ))}
        </div>
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          style={{
            padding: 10,
            fontSize: 16,
            borderRadius: 6,
            border: "1px solid #ccc",
            marginBottom: 10,
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: 12,
            fontSize: 16,
            borderRadius: 6,
            border: "none",
            backgroundColor: "#f76c6c",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
