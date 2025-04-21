import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SendHorizonal } from "lucide-react";

import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatMessage from "@/components/ui/chatMessage";

// Initializing the Google Generative AI API with the API key
const genAI = new GoogleGenerativeAI("AIzaSyAW07PuiFAZCy1TWRr18f_rczoMPV0lKFs");

// Type for test results as provided
type TestResults = {
  OCEAN: {
    Nevrosisme: string;
    Extraversion: string;
    Ouverture_esprit: string;
    Amabilite: string;
    Precision: string;
    Maitrise: string;
  };
  RAISEC: {
    R: string;
    A: string;
    I: string;
    S: string;
    E: string;
    C: string;
  };
  SINCERE_ANXIETY: string;
  EXAMS_ANXIETY: string;
  FUTUR_ANXIETY: string;
  DEPRESSION: string;
  SELF_ESTEEM: {
    familiale: string;
    scolaire: string;
    sociale: string;
  };
  INTERNET_ADDICTION: string;
  PSYCHOLOGICAL_PRESSURE: string;
};

// Example test results for demonstration
const exampleResults: TestResults = {
  OCEAN: {
    Nevrosisme: "16.67%",
    Extraversion: "25.00%",
    Ouverture_esprit: "20.83%",
    Amabilite: "10.42%",
    Precision: "15.00%",
    Maitrise: "12.08%"
  },
  RAISEC: {
    R: "16.67%",
    A: "25.00%",
    I: "20.83%",
    S: "10.42%",
    E: "15.00%",
    C: "12.08%"
  },
  SINCERE_ANXIETY: "moyenne",
  EXAMS_ANXIETY: "tres grand",
  FUTUR_ANXIETY: "tres grand",
  DEPRESSION: "un peut",
  SELF_ESTEEM: {
    familiale: "grand",
    scolaire: "tres petite",
    sociale: "petite",
  },
  INTERNET_ADDICTION: "un peut",
  PSYCHOLOGICAL_PRESSURE: "tres grand",
};

// Type for chat messages
type Message = {
  id: string;
  content: string;
  isUser: boolean;
};

const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui concernant vos résultats de tests ?",
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to generate a unique ID for messages
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      id: generateId(),
      content: inputValue,
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    try {
      // Get AI response
      const response = await getAIResponse(inputValue, exampleResults);
      
      // Add AI response to chat
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          content: response,
          isUser: false,
        },
      ]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          content: "Je suis désolé, une erreur s'est produite. Veuillez réessayer.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get AI response
  const getAIResponse = async (userPrompt: string, results: TestResults): Promise<string> => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Vous êtes un conseiller psychologique et professionnel pour un étudiant avec les résultats de tests suivants:
      
      - Personnalité (OCEAN):
        * Névrosisme: ${results.OCEAN.Nevrosisme}
        * Extraversion: ${results.OCEAN.Extraversion}
        * Ouverture d'esprit: ${results.OCEAN.Ouverture_esprit}
        * Amabilité: ${results.OCEAN.Amabilite}
        * Précision: ${results.OCEAN.Precision}
        * Maîtrise: ${results.OCEAN.Maitrise}

      - Intérêts professionnels (RAISEC):
        * Réaliste: ${results.RAISEC.R}
        * Artistique: ${results.RAISEC.A}
        * Investigatif: ${results.RAISEC.I}
        * Social: ${results.RAISEC.S}
        * Entreprenant: ${results.RAISEC.E}
        * Conventionnel: ${results.RAISEC.C}

      - Anxiétés:
        * Anxiété manifeste: ${results.SINCERE_ANXIETY}
        * Anxiété aux examens: ${results.EXAMS_ANXIETY}
        * Anxiété future: ${results.FUTUR_ANXIETY}

      - État psychologique:
        * Dépression: ${results.DEPRESSION}
        * Estime de soi:
          - Familiale: ${results.SELF_ESTEEM.familiale}
          - Scolaire: ${results.SELF_ESTEEM.scolaire}
          - Sociale: ${results.SELF_ESTEEM.sociale}
        * Addiction internet: ${results.INTERNET_ADDICTION}
        * Stress psychologique: ${results.PSYCHOLOGICAL_PRESSURE}
        
      Répondez à la question suivante de l'étudiant en français, en vous basant sur ces résultats et en donnant des conseils pertinents et bienveillants:
      
      Question: "${userPrompt}"
      
      Votre réponse doit être structurée, concise (max 300 mots) et adaptée aux besoins spécifiques de l'étudiant selon son profil.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Erreur avec l'API Gemini:", error);
      throw error;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Assistant IA Personnel</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            isUser={message.isUser}
          />
        ))}
        {isLoading && (
          <ChatMessage
            message=""
            isUser={false}
            isLoading={true}
          />
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Posez votre question ici..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleSendMessage();
              }
            }}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputValue.trim()}
            size="icon"
          >
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatSection;