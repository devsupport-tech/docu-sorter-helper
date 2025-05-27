
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import ChatBot from "./ChatBot";

const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-40 animate-bounce"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
      
      <ChatBot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
};

export default ChatButton;
