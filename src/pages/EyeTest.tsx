import { useState } from "react";
import { ArrowLeft, Eye, BookOpen, Glasses } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CameraCapture from "@/components/eye-test/CameraCapture";
import TestInstructions from "@/components/eye-test/TestInstructions";
import TestResults from "@/components/eye-test/TestResults";

const EyeTest = () => {
  const [activeTest, setActiveTest] = useState<"distance" | "near" | "astigmatism">("distance");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageCapture = async (imageData: string) => {
    setCapturedImage(imageData);
    setIsAnalyzing(true);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-eye-test', {
        body: {
          image: imageData,
          testType: activeTest
        }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast({
        title: "Analysis Complete",
        description: "Your eye test has been analyzed successfully.",
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the image. Please try again.",
        variant: "destructive",
      });
      setCapturedImage(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCapturedImage(null);
    setAnalysis(null);
  };

  const testTypes = [
    { value: "distance", label: "Distance Vision", icon: Eye },
    { value: "near", label: "Near Vision", icon: BookOpen },
    { value: "astigmatism", label: "Astigmatism", icon: Glasses },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Eye Power Testing</h1>
              <p className="text-sm text-muted-foreground">AI-powered vision analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {!analysis ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Test Type Selection */}
            <Tabs value={activeTest} onValueChange={(v) => setActiveTest(v as any)}>
              <TabsList className="grid w-full grid-cols-3">
                {testTypes.map(({ value, label, icon: Icon }) => (
                  <TabsTrigger key={value} value={value} className="gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-8 grid lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Camera Capture</h3>
                  {isAnalyzing ? (
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-muted-foreground">Analyzing your eye test...</p>
                      </div>
                    </div>
                  ) : (
                    <CameraCapture onCapture={handleImageCapture} />
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Instructions</h3>
                  <TestInstructions testType={activeTest} />
                </div>
              </div>
            </Tabs>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <TestResults
              analysis={analysis}
              capturedImage={capturedImage!}
              onReset={handleReset}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EyeTest;
