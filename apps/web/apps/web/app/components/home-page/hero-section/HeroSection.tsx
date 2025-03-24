import Chatbot from "./chatbot/Chatbot";
import Hero from "./hero/Hero";
export default function HeroSection({className}){
    return  <div className={`flex-1 flex flex-col items-center justify-center text-center w-full px-6 py-32 bg-dark ${className}`}>
    <Hero />
    <Chatbot />
</div>
}