import type { NextPage } from "next";
import Head from "next/head";
import ChatBubble from "../components/ChatBuddle";
import { trpc } from "../utils/trpc";
import ChatInput from "../components/ChatInput";

const sampleChat = [
  {
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste ipsa dignissimos at, ea vero, aliquam nesciunt atque sit totam dolor recusandae nisi magnam",
    isUser: false,
  },
  {
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste ipsa dignissimos at, ea vero, aliquam nesciunt atque sit totam dolor recusandae nisi magnam",
    isUser: true,
  },
  {
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste ipsa dignissimos at, ea vero, aliquam nesciunt atque sit totam dolor recusandae nisi magnam",
    isUser: false,
  },
  {
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste ipsa dignissimos at, ea vero, aliquam nesciunt atque sit totam dolor recusandae nisi magnam",
    isUser: false,
  },
];

const Home: NextPage = () => {
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

      <main className="flex h-screen flex-col items-center  bg-gray-50">
        <div>
          <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
            RailBot
          </h1>
        </div>
        <div className="flex h-full flex-col pt-3 mt-3 w-full m-4 p-4 rounded-lg">
          <div className="flex flex-row flex-wrap">
            {sampleChat.map((chat, index) => (
              <ChatBubble key={index} text={chat.text} isUser={chat.isUser} />
            ))}
          </div>
        </div>
        <div className="w-full p-4">
          <ChatInput />
        </div>
      </main>
    </>
  );
};

export default Home;
