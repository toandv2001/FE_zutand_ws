// App.tsx
import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

export const ChatComponent = () => {
  useEffect(() => {
    createChat({
      webhookUrl:
        "https://flow.bolter.work/webhook/11740dab-1179-47c0-b1ae-9dcfb5b5687d/chat",
      webhookConfig: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
      target: "#n8n-chat", // Ensure this matches the ID of an element in the DOM
      mode: "window",
      chatInputKey: "chatInput",
      chatSessionKey: "89e35c7266fc4f77a82a9871adc43cc9",
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: "en",
      initialMessages: [
        "Hi there! 👋",
        "My name is Nathan. How can I assist you today?",
      ],
      i18n: {
        en: {
          title: "Hi there! 👋",
          subtitle: "Start a chat. We're here to help you 24/7.",
          footer: "",
          getStarted: "New Conversation",
          inputPlaceholder: "Type your question..",
        },
      },
    });
  }, []);

  // Add a div with the ID matching the target
  return <div id="n8n-chat" style={{ height: "500px", width: "100%" }}></div>;
};
