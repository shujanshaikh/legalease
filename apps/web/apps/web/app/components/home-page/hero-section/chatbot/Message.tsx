import { motion } from "framer-motion";
import clsx from "clsx";

interface MessageProps {
  text: string;
  isUser: boolean;
}

export default function Message({ text, isUser }: MessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={clsx(
        "p-3 rounded-lg max-w-[80%] break-words",
        isUser
          ? "bg-accent font-semibold text-orange-50 self-end ml-auto mt-4"
          : "bg-orange-50 font-semibold text-ivory self-start mr-auto mt-4"
      )}
    >
      {text}
    </motion.div>
  );
}