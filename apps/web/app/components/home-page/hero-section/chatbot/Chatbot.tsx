"use client";

import { useEffect, useState, useRef } from "react";
import Message from "./Message";


export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
    if (isMinimized) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isMinimized]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]);


    useEffect(() => {
      messagesContainerRef.current?.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, [messages,isMinimized]);
    

    const firstRender = useRef(true);
    const hasMinimizedBefore = useRef(false);
    
    useEffect(() => {
      if (firstRender.current) {
        firstRender.current = false;
        return; 
      }
    
      if (!isMinimized && chatboxRef.current) {
        chatboxRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    
        if (hasMinimizedBefore.current) {
          setTimeout(() => {
            window.scrollTo({
              top: window.scrollY + 280,
              behavior: "smooth",
            });
          }, 300);
        }
    
        hasMinimizedBefore.current = false; 
      }
    
      if (isMinimized) {
        hasMinimizedBefore.current = true; 
      }
    }, [isMinimized, messages.length]);
    

  async function handleSubmit() {
    if (query.trim() === "") return;
     simulateTyping(`AI Response: The legal answer to "${query}" will be here.`);
    setMessages((prev) => [...prev, { text: query, isUser: true }]);
    setQuery("");
    setIsOpen(true);
    setIsMinimized(false);
    setIsTyping(true);

  }

    function simulateTyping(fullText: string) {
      let currentText = "";
      let index = 0;
    
      setIsTyping(true);
    
      typingIntervalRef.current = setInterval(() => {
        if (index < fullText.length) {
          currentText += fullText[index];
          index++;
          setMessages((prev) => {
            let lastMessage = prev[prev.length - 1];
            if (lastMessage && !lastMessage.isUser) {
              return [...prev.slice(0, -1), { text: currentText, isUser: false }];
            } else {
              return [...prev, { text: currentText, isUser: false }];
            }
          });
        } else {
          clearInterval(typingIntervalRef.current!);
          typingIntervalRef.current = null;
          setIsTyping(false); 
          inputRef.current?.focus();
        }
      }, 5);
    }

    function stopTyping() {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      setIsTyping(false); 
      inputRef.current?.focus();
    }
//Your Work from here !!!
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto mt-16">
      {isOpen && (
        <div
          ref={chatboxRef}
          //Tailwind for the Entire chatbox
          className={`w-full max-w-[600px] bg-white border shadow-lg rounded-lg transition-all duration-300 ease-in-out overflow-hidden ${
            isMinimized ? "h-[40px]" : "h-[550px]"
          }`}
        >
          
          <div className="flex justify-between items-center bg-gray-200 p-3 rounded-t-lg">
            <h3 className="text-lg font-semibold text-gray-900">Chat Assistant</h3>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
           
              className="text-gray-500 hover:text-gray-700 transition"
            >
              {isMinimized ? "🔼" : "✕"}
            </button>
          </div>
          {!isMinimized && (
  <div ref={messagesContainerRef} className="p-4 overflow-y-auto h-[480px] flex flex-col">
    {messages.map((msg, index) => (
      <Message key={index} text={msg.text} isUser={msg.isUser} />
    ))}
  </div>
)}

        </div>
      )}

      <div className="flex items-center justify-center p-6 w-full">
      <div className="relative w-[600px]">
      <input
  ref={inputRef}
  type="text"
  placeholder="Ask our AI legal assistant..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onKeyDown={(e) => !isTyping && e.key === "Enter" && handleSubmit()}
  onMouseEnter={() => inputRef.current?.focus()} 
  disabled={isTyping} 
 className={`w-full text-gray-900 bg-white px-8 py-5 rounded-full focus:outline-none text-xl transition-transform duration-200 focus:shadow-lg focus:scale-105 ${
    isTyping ? "opacity-50 cursor-not-allowed" : ""
  }`}
/>

{isTyping && (
    <button
      onClick={stopTyping}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-red-600 transition"
    >
      ✖
    </button>
  )}
</div>


        <button
          onClick={handleSubmit}
          className="ml-4 px-6 py-5 rounded-lg text-xl whitespace-nowrap bg-accent text-dark hover:scale-110 transition-transform duration-200"
        >
          Ask
        </button>
        <button className="ml-4 px-6 py-5 rounded-lg text-xl whitespace-nowrap bg-accent text-dark hover:scale-110 transition-transform duration-200">
          Upload Your Doc
        </button>
      </div>
    </div>
  );
}

function setIsTyping(arg0: boolean) {
  throw new Error("Function not implemented.");
}

