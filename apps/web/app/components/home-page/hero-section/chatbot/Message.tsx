import { motion } from "framer-motion";
import clsx from "clsx";
import { FileText } from "lucide-react"; 

interface MessageProps {
  text?: string; 
  isUser: boolean;
  isPDF?: boolean;
}

export default function Message({ text, isUser, isPDF }: MessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={clsx(
        "p-3 rounded-lg max-w-[80%] break-words flex items-center gap-3",
        isUser
          ? "bg-accent font-semibold text-orange-50 self-end ml-auto mt-4"
          : "bg-orange-50 font-semibold text-ivory self-start mr-auto mt-4"
      )}
    >
      {isPDF ? (
        <div
          className={clsx(
            "flex items-center gap-2",
            isUser ? "flex-row-reverse" : "flex-row"
          )}
        >
          <FileText
            className={clsx(
              "w-6 h-6",
              isUser ? "text-orange-50" : "text-red-600"
            )}
          />
          <span className={clsx(isUser && "text-right")}>PDF Document</span>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </motion.div>
  );
}