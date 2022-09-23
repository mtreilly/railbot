import type { NextPage } from "next";
import Head from "next/head";
import ChatBubble from "../components/ChatBuddle";
import { trpc } from "../utils/trpc";

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
        <meta name="description" content="Railbot chat and discovery rail times" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen flex-col items-center">
        <div>
          <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">RailBot</h1>
        </div>
        <div className="flex h-full flex-col pt-3 mt-3 w-full bg-gray-50 m-4 p-4 rounded-lg">
          <div className="flex flex-row flex-wrap">
            {sampleChat.map((chat, index) => (
              <ChatBubble key={index} text={chat.text} isUser={chat.isUser} />
            ))}
          </div>
        </div>
        <div className="border flex flex-col flex-1 border-gray-500 mb-10 w-3/4 bg-white rounded-t-xl border-1">
          <input type="text" className="text-2xl p-10 rounded-t-xl w-full" placeholder="Enter your station" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">Submit</button>
        </div>
      </main>
    </>
  );
};

export default Home;
