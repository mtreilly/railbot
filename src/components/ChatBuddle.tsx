import React from "react";

type Props = {
  text: string;
  isUser: boolean;
};

const ChatBubble = ({ text, isUser }: Props) => {
  const isUserBackground = isUser ? "bg-blue-300" : "bg-green-300";
  const isUserPosition = isUser ? "justify-end" : "justify-start";
  return (
    <div className={`mt-4 flex ${isUserPosition}`}>
      <div className={`rounded-lg p-4 text-gray-900 w-1/2 ${isUserBackground}`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
