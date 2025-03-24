"use client";
import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import axios from "axios";
import { Upload } from "../../../ui/upload";
export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
  { text?: string; isUser: boolean; isPDF?: boolean; pdfUrl?: string }[]
>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loader , setLoader] = useState(false)
  const [hasStopped, setHasStopped] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);//Changed
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [pdfUrl, setPdfUrl] = useState("")
  const [uploaded, setUploaded] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(`Key pressed: ${event.key}`);

    };


    document.addEventListener("keydown", handleKeyDown);


    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
  
  const handleUpload = (url: string) => {
    setPdfUrl(url);
    setUploaded(true);
    setIsOpen(true); 
    setIsMinimized(false);
    setMessages((prev) => [
      ...prev,
      { isUser: true, isPDF: true, text: url },
    ]);
  };

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
    simulateTyping("Sorry, I couldn't process your request. Try Signing In");
    setLoader(false)
  }
}
const handleProcessPDF = async () => {
  
  if (!pdfUrl) {
    alert("No PDF URL found. Please upload a file first.");
    return;
  }
setLoader(true);
setIsTyping(true);
  const token = localStorage.getItem("token");

  try {
    console.log("Sending request to /pdf endpoint with URL:", pdfUrl);
    const response = await axios.post(
      "http://localhost:8000/pdf", 
      { pdfUrl }, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      }
    );
const backendReply = response.data.reply
setLoader(false)
simulateTyping(backendReply)
setUploaded(false);;
  } catch (error) {
    console.error("Error while hitting /pdf endpoint:", error);
    alert("An error occurred while processing the PDF.");
  }
};


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
    const lastMessage = prev[prev.length - 1];
    if (lastMessage && !lastMessage.isUser && lastMessage.text) {
      return prev;
    }
    return prev.slice(0, -1);
  });
}


return (
  <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto mt-8 px-4">
    {isOpen && (
      <div
        ref={chatboxRef}
        className={`w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-[800px] bg-white border- shadow-lg rounded-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isMinimized ? "h-[50px] border-none" : "h-[550px]"
        }`}
      >
        <div className="flex justify-between items-center bg-accent p-3 rounded-t-lg">
          <h3 className="text-lg md:text-xl font-semibold text-orange-50">
            Chat Assistant
          </h3>
          <button className="hover:opacity-100 opacity-85 rounded text-dark text-lg" onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? "↓" : "✕"}
          </button>
        </div>

        {!isMinimized && (
  <div
    ref={messagesContainerRef}
    className="p-4 overflow-y-auto h-[480px] flex flex-col"
  >
    {messages.map((msg, index) => (
      <Message
        key={index}
        text={msg.isPDF ? undefined : msg.text}
        isUser={msg.isUser}
        isPDF={msg.isPDF}
      />
    ))}
            {loader && (
              <div className="flex items-center mt-2">
                <div className="animate-bounce w-2 h-2 bg-ivory rounded-full mx-1"></div>
                <div className="animate-bounce w-2 h-2 bg-ivory rounded-full mx-1 animation-delay-200"></div>
                <div className="animate-bounce w-2 h-2 bg-ivory rounded-full mx-1 animation-delay-400"></div>
              </div>
            )}
          </div>
        )}
      </div>
    )}

    <div className="flex flex-col sm:flex-row items-center justify-center p-4 w-full">
      <div className="relative w-full sm:w-[400px] md:w-[500px] lg:w-[600px] mb-4 sm:mb-0 sm:mr-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask our AI legal assistant..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => !isTyping && e.key === "Enter" && handleSubmit()}
          onMouseEnter={() => inputRef.current?.focus()}
          disabled={isTyping}
          className={`w-full text-gray-900 bg-white px-8 py-4 rounded-full focus:outline-none text-lg sm:text-xl transition-transform duration-200 focus:shadow-lg focus:scale-103 ${
            isTyping ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
<div></div>
        {isTyping && (
          <button
            onClick={handleStop}
            className="absolute hover:opacity-90 right-4 top-1/2 transform -translate-y-1/2 bg-accent text-dark text-xl p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-300 transition"
          >
            ◼︎
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-4 rounded-lg text-lg sm:text-xl bg-accent text-dark hover:scale-110 transition-transform duration-200"
        >
          Ask
        </button>
        {!uploaded ? (
        <Upload
          onUpload={handleUpload}
        />
      ) : (
        <button
          className="px-6 py-4 rounded-lg text-lg sm:text-xl bg-accent text-dark hover:scale-110 transition-transform duration-200"
          onClick={handleProcessPDF} >
          Process PDF
        </button>
      )}
      </div>
    </div>
  </div>
);
}
