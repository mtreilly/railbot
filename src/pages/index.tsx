import type { NextPage } from "next";
import Head from "next/head";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import { useEffect, useRef, useState } from "react";

const initialChat = [
  {
    text: "Welcome to the Irish Rail Chatbot!",
    isUser: false,
    data: null,
  },
];

const Home: NextPage = () => {
  const [chatLog, setChatLog] = useState(initialChat);

  const updateChatLog = (text: string, isUser = true, data = null) => {
    setChatLog((prev) => [
      ...prev,
      {
        text,
        isUser: isUser,
        data: data,
      },
    ]);
  };

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [chatLog]);

  return (
    <>
      <Head>
        <title>Railbot</title>
        <meta
          name="description"
          content="Railbot chat and discovery rail times"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen flex-col items-center bg-gray-50">
        <div>
          <h1 className="text-3xl md:text-[4rem] leading-normal font-extrabold text-gray-700">
            RailBot
          </h1>
        </div>
        <div
          ref={ref}
          style={{ overflow: "scroll" }}
          className="flex h-full flex-col pt-3 px-3 mt-3 w-full sm:w-3/4 m-4 rounded-lg"
        >
          <div className="flex flex-row flex-wrap">
            {chatLog.map((chat, index) => (
              <ChatBubble
                key={index}
                text={chat.text}
                isUser={chat.isUser}
                data={chat.data}
              />
            ))}
            <hr className="w-full h-20 border-2 border-gray-50" />
          </div>
        </div>

        <div className="w-full p-4 fixed bottom-0 bg-white">
          <ChatInput updateChatLog={updateChatLog} />
        </div>
      </main>
    </>
  );
};

export default Home;
