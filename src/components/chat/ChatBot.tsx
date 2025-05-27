
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X, MessageCircle } from "lucide-react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      message: "Hello! I'm your document sorting assistant. I can help you with:\n\n• Uploading and organizing documents\n• Finding specific documents\n• Understanding the document management system\n• General questions about the app\n\nHow can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("upload") || message.includes("file")) {
      return "To upload documents:\n\n1. Go to the main page\n2. Select your business and customer\n3. Click the upload area or drag files\n4. The system will automatically sort your documents\n\nSupported formats: PDF, DOC, DOCX, JPG, PNG, and more!";
    }
    
    if (message.includes("search") || message.includes("find")) {
      return "You can find documents using:\n\n• The search bar in the Documents section\n• Filter by business or customer\n• Filter by document status\n• Browse by categories\n\nTip: Use specific keywords for better results!";
    }
    
    if (message.includes("business") || message.includes("customer")) {
      return "To manage businesses and customers:\n\n• Admin users can access the Management tab\n• Add new businesses and customers\n• Edit existing information\n• Organize your client structure\n\nNote: Admin access is required for management features.";
    }
    
    if (message.includes("photo") || message.includes("report")) {
      return "Photo Reports feature allows you to:\n\n• Create visual reports with photos\n• Add detailed notes to each report\n• Organize by business and customer\n• View and manage all your reports\n\nPerfect for site inspections, progress tracking, and documentation!";
    }
    
    if (message.includes("admin") || message.includes("login")) {
      return "Admin features:\n\n• Access to business/customer management\n• Advanced document organization\n• System configuration options\n\nTo access admin features, you need to log in with admin credentials through the header menu.";
    }
    
    if (message.includes("help") || message.includes("how")) {
      return "I'm here to help! You can ask me about:\n\n• Document uploading and management\n• Finding and searching documents\n• Photo reports creation\n• Business and customer management\n• Admin features\n• General app navigation\n\nJust type your question and I'll do my best to assist you!";
    }
    
    return "I understand you're asking about the document management system. Could you be more specific about what you'd like to know? I can help with uploading documents, searching, managing businesses/customers, photo reports, or general navigation.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessageProps = {
      message: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: ChatMessageProps = {
        message: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[500px] flex flex-col shadow-lg z-50 animate-in slide-in-from-bottom-5">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Document Assistant</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="space-y-0">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
          
          {isTyping && (
            <div className="flex gap-3 p-4 bg-muted/30">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">Assistant</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about document management..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatBot;
