import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DentalCamera from "@/components/dental/DentalCamera";
import DentalInstructions from "@/components/dental/DentalInstructions";
import DentalResults from "@/components/dental/DentalResults";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Step = "instructions" | "capture" | "results";

const DentalScanner = () => {
  const [step, setStep] = useState<Step>("instructions");
  const [analysis, setAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleCapture = async (imageData: string) => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-dental", {
        body: { image: imageData },
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      setStep("results");
    } catch (error) {
      console.error("Error analyzing dental image:", error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRetake = () => {
    setStep("capture");
    setAnalysis("");
  };

  const handleStartScan = () => {
    setStep("capture");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Dental <span className="bg-gradient-medical bg-clip-text text-transparent">Health Scanner</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              AI-powered cavity detection and oral health assessment
            </p>
          </div>

          {step === "instructions" && <DentalInstructions onStart={handleStartScan} />}
          
          {step === "capture" && (
            <DentalCamera onCapture={handleCapture} isAnalyzing={isAnalyzing} />
          )}
          
          {step === "results" && (
            <DentalResults analysis={analysis} onRetake={handleRetake} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DentalScanner;
