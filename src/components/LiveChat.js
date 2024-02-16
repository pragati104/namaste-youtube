import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomNames, makeRandomMessages } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();

  const ChatMessages = useSelector((store) => store.chat.messages);
  useEffect(() => {
    const i = setInterval(() => {
      //api polling
      dispatch(
        addMessage({
          name: generateRandomNames(),
          message: makeRandomMessages(20),
        })
      );
    }, 1000);

    return () => clearInterval(i);
  }, []);
  return (
    <>
      <div className="w-full h-[600px] ml-2 p-2 mr-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        {ChatMessages.map((c, i) => (
          <ChatMessage key={i} name={c.name} message={c.message} />
        ))}
      </div>
      <form
        className="w-full p-2 ml-2 border border-black"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("on form submit", liveMessage);
          dispatch(
            addMessage({
              name: "akshay saini",
              message: liveMessage,
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          className="w-[400px] px-2 p-1 bg-slate-200"
          type="text"
          placeholder="Type here..."
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />{" "}
        <button className="w-20 px-2 mx-2 bg-green-300 ">Send</button>
      </form>
    </>
  );
};

export default LiveChat;
