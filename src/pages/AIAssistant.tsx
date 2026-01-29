import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Avatar3D from "@/components/chat/Avatar3D";
import ChatInterface from "@/components/chat/ChatInterface";

const AIAssistant = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              AI Health <span className="bg-gradient-medical bg-clip-text text-transparent">Assistant</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Chat with MediBot for health advice, mental wellness support, and medical information
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <Avatar3D isSpeaking={isSpeaking} />
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">About MediBot</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Provides health and wellness advice</li>
                  <li>• Offers mental health support</li>
                  <li>• Answers medical questions</li>
                  <li>• Suggests exercises and nutrition tips</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Remember: Always consult healthcare professionals for serious concerns.
                </p>
              </div>
            </div>

            <div>
              <ChatInterface
                onMessageSent={() => setIsSpeaking(false)}
                onMessageReceiving={() => setIsSpeaking(true)}
                onMessageComplete={() => setIsSpeaking(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;