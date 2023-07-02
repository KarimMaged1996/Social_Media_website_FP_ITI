import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./Chat.css";

function Chat() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    // Get the username from local storage or prompt the user to enter it
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      const input = prompt("Enter your username:");
      if (input) {
        setUsername(input);
        localStorage.setItem("username", input);
      }
    }

    // Connect to the WebSocket server with the username as a query parameter
    const newSocket = new WebSocket("ws://127.0.0.1:8000/ws/chat/");
    setSocket(newSocket);

    newSocket.onopen = () => console.log("WebSocket connected");
    newSocket.onclose = () => console.log("WebSocket disconnected");
    fetchChatHistory();
    // Clean up the WebSocket connection when the component unmounts
    return () => {
      newSocket.close();
    };
  }, [username]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };
    }
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message && socket) {
      const data = {
        message: message,
        username: username,
      };
      socket.send(JSON.stringify(data));
      setMessage("");
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/messages/");
      setMessages(
        response.data.map((message) => ({
          content: message.content,
          timestamp: new Date(message.timestamp).toLocaleString(),
          username: message.username,
        }))
      );
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const scrollToBottom = () => {
    const container = messageContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat</div>
      <div className="message-container" ref={messageContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.username === username ? "sent" : "received"
            }`}
          >
            <div className="message-owner">{message.username}</div>
            <div className="message-content">
              {message.message || message.content}
            </div>
            <div className="message-timestamp">
              {new Date(message.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="chatModal"
        tabIndex="-1"
        aria-labelledby="chatModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="chatModalLabel">
                Chat
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="message-container">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${
                      message.username === username ? "sent" : "received"
                    }`}
                  >
                    <div className="message-owner">{message.username}</div>
                    <div className="message-content">
                      {message.message || message.content}
                    </div>
                    <div className="message-timestamp">{message.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#chatModal"
      >
        Open Chat
      </button>
    </div>
  );
}

export default Chat;
