
"use client"

import { useEffect, useRef, useState } from "react";
import Message from "./Message";

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

export default function ResponseBox(){

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
      if (query.trim() === "") return;  // Don't submit if the query is empty
    
      // Add the user's message to the chat UI
      setMessages((prev) => [...prev, { text: query, isUser: true }]);
      setQuery(""); // Clear the input field
      setIsOpen(true); // Ensure the chat UI is open
      setIsMinimized(false);
      setIsTyping(true); // Show typing indicator
      setLoader(true);
      try {
        // Check if the token is correctly retrieved
        const token = localStorage.getItem("token");
        // Send the user's message to the backend
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
    
      // Ensure isTyping is true at the start
      setIsTyping(true);
     setHasStopped(false) 
    
      // Clear any existing interval
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    
      // Start the typing simulation
      typingIntervalRef.current = setInterval(() => {
        if (index < fullText.length) {
          currentText = fullText.slice(0, index + 1); // Incrementally add characters
          index++;
    
          setMessages((prev) => {
            let lastMessage = prev[prev.length - 1];
    
            // Update the current AI message if it already exists
            if (lastMessage && !lastMessage.isUser) {
              return [...prev.slice(0, -1), { text: currentText, isUser: false }];
            } else {
              // Add a new AI message if it doesn't exist
              return [...prev, { text: currentText, isUser: false }];
            }
          });
        } else {
          // Typing is done; clear the interval
          clearInterval(typingIntervalRef.current!);
          typingIntervalRef.current = null;
    
          // Set isTyping to false after finishing
          setIsTyping(false);
          inputRef.current?.focus(); // Focus on the input field
        }
      }, 25); // Typing speed
    }
    

    return <div>
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
      </div>
}

