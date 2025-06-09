import React, { useEffect, useRef, useState } from "react";

const Socket = () => {
  const [count, setCount] = useState(1);
  const socketRef = useRef(null);

  useEffect(() => {
    // Create WebSocket connection
    socketRef.current = new WebSocket("ws://localhost:3000");

    // Handle incoming WebSocket messages
    socketRef.current.onmessage = (event) => {
      console.log("Message received:", event.data);
      // Store message in localStorage to trigger event in other tabs
      localStorage.setItem(
        "websocket_message",
        JSON.stringify({ data: event.data, timestamp: Date.now() })
      );
    };

    // Handle connection open
    socketRef.current.onopen = (event) => {
      console.log("WebSocket connected:", event);
    };

    // Handle connection close
    socketRef.current.onclose = (event) => {
      console.log("WebSocket closed:", event);
    };

    // Handle errors
    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Listen for localStorage changes
    const handleStorageChange = (event) => {
      if (event.key === "websocket_message") {
        const { data } = JSON.parse(event.newValue);
        console.log("Received from another tab:", data);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        console.log("WebSocket connection closed on cleanup");
      }
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Send a message via WebSocket
  const sendMessage = async (message) => {
    const messageData = {
      message: message,
      timestamp: Date.now(),
    };

    await fetch("http://localhost:3000/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(messageData),
    })
      .then(() => console.log("success"))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <p>Socket Component</p>
      <button
        onClick={() => {
          sendMessage("Hello, WebSocket! " + count);
          setCount(count + 1);
        }}
      >
        Send Test Message
      </button>
    </div>
  );
};

export default Socket;
