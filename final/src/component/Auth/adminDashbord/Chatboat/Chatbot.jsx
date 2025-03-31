import React from 'react'
import { IoSendSharp } from "react-icons/io5";
import { GrClearOption } from "react-icons/gr";
import { LuCopyCheck } from "react-icons/lu";

function Chatbot() {
  return (
    <div>
         <div className="right-pane mx-3 my-5 rounded-xl p-5 bg-violet-300 w-3/3 flex flex-col h-[88vh]">
      
      {/* Message Area */}
      <div className="message-area flex-grow bg-white overflow-y-auto p-3 shadow-md rounded-lg text-purple-950 font-serif text-lg">
        <div className="message bot-message inline-block"></div>
      </div>

      {/* Input & Buttons */}
      <div className="bottom-input flex items-center mt-3">
        <input
          className="w-3/4 rounded-lg px-5 py-3 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
          type="text"
          placeholder="Ask Your Query..."
        />
        <button className="send-button text-white mx-2 bg-slate-700 hover:bg-slate-800 p-3 rounded-xl flex items-center">
          <IoSendSharp />
        </button>
        <button className="clear-button text-white mx-2 bg-slate-700 hover:bg-slate-800 p-3 rounded-xl flex items-center">
          <GrClearOption />
        </button>
        <button className="copy-button text-white mx-2 bg-slate-700 hover:bg-slate-800 p-3 rounded-xl flex items-center">
          <LuCopyCheck />
        </button>
      </div>
    </div>
    </div>
  )
}

export default Chatbot