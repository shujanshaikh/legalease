"use client";
import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import axios from "axios";
export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loader , setLoader] = useState(false)
  const [hasStopped, setHasStopped] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);//Changed
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMinimized) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isMinimized]);
  

  
  useEffect(() => {
    if (isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]);
  
  useEffect(() => {
    if (messages.length > 0) {
      messagesContainerRef.current?.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]); 
  
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
            top: window.scrollY + 260,
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


  setMessages((prev) => [...prev, { text: query, isUser: true }]);
  setQuery(""); 
  setIsOpen(true); 
  setIsMinimized(false);
  setIsTyping(true);
  setLoader(true);
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post("http://localhost:8000/chat", 
      { message: query }, 
      {
        headers: {
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}` 
        },
      }
    );

    const backendReply = response.data.reply; 
    setLoader(false)
    simulateTyping(backendReply); 
  } catch (error) {
    console.error("Error communicating with backend:", error);
    simulateTyping("AI Response: Sorry, I couldn't process your request. Please try again.");
  }
}


function simulateTyping(fullText: string) {
  let index = 0;
  let currentText = "";
  setIsTyping(true);
 setHasStopped(false) 
  if (typingIntervalRef.current) {
    clearInterval(typingIntervalRef.current);
  }
  typingIntervalRef.current = setInterval(() => {
    if (index < fullText.length) {
      currentText = fullText.slice(0, index + 1); 
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
  }, 10); 
}

const handleStop = () => {
  setHasStopped(true); 
  setIsTyping(false); 

  if (typingIntervalRef.current) {
    clearInterval(typingIntervalRef.current); 
    typingIntervalRef.current = null;
  }
  inputRef.current?.focus(); 

  setMessages((prev) => {
    // Finalize the last AI message
    const lastMessage = prev[prev.length - 1];
    if (lastMessage && !lastMessage.isUser && lastMessage.text) {
      return prev;
    }
    return prev.slice(0, -1);
  });
}


  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto mt-16">
      {isOpen && (
        <div
          ref={chatboxRef}
          className={`w-full max-w-[600px] bg-white border-accent shadow-lg rounded-lg transition-all duration-300 ease-in-out overflow-hidden ${
            isMinimized ? "h-[50px] border-none" : "h-[550px]"
          }`}
        >
          <div className="flex justify-between items-center bg-accent p-3 rounded-t-lg">
            <h3 className="text-xl font-semibold text-orange-50">Chat Assistant</h3>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? "🔼" : "🔽"}
            </button>
          </div>

          {!isMinimized && (
  <div ref={messagesContainerRef} className="p-4 overflow-y-auto h-[480px] flex flex-col">
    {messages.map((msg, index) => (
      <Message key={index} text={msg.text} isUser={msg.isUser} />
    ))}
    {loader && (
                <div className="flex items-center mt-2">
                  <div className="animate-bounce w-2 h-2 bg-ivory rounded-full mx-1"></div>
                  <div className="animate-bounce w-2 h-2 bg-ivory rounded-full mx-1 animation-delay-200"></div>
                  <div className="animate-bounce w-2 h-2 bg-ivory rounded-full mx-1 animation-delay-400"></div>
                </div>
              )}
  </div>
)
}  </div>
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
  className={`w-full text-gray-900 bg-white px-8 py-5 rounded-full focus:outline-none text-xl transition-transform duration-200 focus:shadow-lg focus:scale-103 ${
    isTyping ? "opacity-50 cursor-not-allowed" : ""
  }`}
/>

{isTyping && (
    <button
      onClick={handleStop}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-red-600 transition"
    >
      n
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
