import React from "react";

type Props = {
  text: string;
  isUser: boolean;
  data?: React.ReactNode;
};

const ChatBubble = ({ text, isUser, data }: Props) => {
  const isUserBackground = isUser ? "bg-blue-300" : "bg-green-300";
  const isUserPosition = isUser ? "justify-end" : "justify-start";
  return (
    <div className={`mt-2 flex w-full ${isUserPosition}`}>
      <div
        className={`rounded-lg px-3 py-2 text-gray-900 w-1/2 text-sm ${isUserBackground}`}
      >
        <p>{text}</p>
        {/*{data ? data : null}*/}
        {data ? data : null}
      </div>
    </div>
  );
};

export default ChatBubble;
