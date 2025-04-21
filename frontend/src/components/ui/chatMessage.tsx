import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isUser,
  isLoading = false,
}) => {
  return (
    <div
      className={cn(
        "flex w-full gap-3 p-4 rounded-lg",
        isUser ? "flex-row-reverse" : ""
      )}
    >
      <Avatar className={cn(
        "h-10 w-10 flex items-center justify-center",
        isUser ? "bg-primary" : "bg-blue-500"
      )}>
        {isUser ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-white" />}
      </Avatar>
      <div
        className={cn(
          "rounded-lg p-3 text-sm max-w-[75%]",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-current" style={{ animationDelay: "0.2s" }}></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-current" style={{ animationDelay: "0.4s" }}></div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{message}</div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;