import React, { useState } from "react";

// Source: https://tailwindcomponents.com/component/chat

const ChatInput = ({ updateChatLog }: { updateChatLog: (text: string, isUser?: boolean, data?: null) => void }) => {
  const [chatInput, setChatInput] = useState("");

  const getResponse = (text: string) => {
    fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(chatInput),
    }).then((res) => {
      res.json().then((message) => {
        const text = message.text;
        const isUser = message.isUser;
        const data = null;
        updateChatLog(text, isUser, data);
      });
    });
  };
  return (
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask: Get all dart stations"
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (chatInput) {
                updateChatLog(chatInput);
                getResponse(chatInput);
                setChatInput("");
              }
            }
          }}
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            onClick={() => {
              if (chatInput) {
                updateChatLog(chatInput);
                getResponse(chatInput);
                setChatInput("");
              }
            }}
          >
            <span className="font-bold">Send</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
