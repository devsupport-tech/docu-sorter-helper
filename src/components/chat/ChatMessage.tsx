
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

export interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 p-4",
      isBot ? "bg-muted/30" : "bg-background"
    )}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isBot ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
      )}>
        {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {isBot ? "Assistant" : "You"}
          </span>
          <span className="text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="text-sm text-foreground whitespace-pre-wrap">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
