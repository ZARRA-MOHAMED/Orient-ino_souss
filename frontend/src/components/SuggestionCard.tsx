import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuggestionCardProps {
  suggestion: string;
  index: number;
}

const SuggestionCard = ({ suggestion, index }: SuggestionCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="flex gap-4">
          <div className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            "bg-blue-100 text-blue-700"
          )}>
            <Lightbulb size={20} />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-left font-medium text-gray-700">
              Suggestion {index + 1}
            </p>
            <p className="text-left text-sm text-gray-600">{suggestion}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestionCard;