import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, Upload, Loader2, Pill, AlertTriangle, Clock, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PrescriptionReader = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [existingMedicines, setExistingMedicines] = useState<string[]>([]);
  const [newMedicine, setNewMedicine] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const addExistingMedicine = () => {
    if (newMedicine.trim() && !existingMedicines.includes(newMedicine.trim())) {
      setExistingMedicines([...existingMedicines, newMedicine.trim()]);
      setNewMedicine("");
    }
  };

  const removeMedicine = (med: string) => {
    setExistingMedicines(existingMedicines.filter(m => m !== med));
  };

  const analyzePrescription = async () => {
    if (!image) return;

    setIsAnalyzing(true);
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/analyze-prescription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          imageUrl: image,
          existingMedicines 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze prescription");
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to analyze prescription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
              <Pill className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">AI Prescription Reader</h1>
            <p className="text-muted-foreground">
              Upload a handwritten prescription to get medicine details, timing, and warnings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload Prescription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!image ? (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">
                      Upload or capture your prescription
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={() => fileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" /> Upload
                      </Button>
                      <Button variant="outline" onClick={() => cameraInputRef.current?.click()}>
                        <Camera className="mr-2 h-4 w-4" /> Camera
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <img 
                      src={image} 
                      alt="Prescription" 
                      className="w-full rounded-lg border border-border"
                    />
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          setImage(null);
                          setAnalysis(null);
                        }}
                      >
                        Change Image
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={analyzePrescription}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          "Analyze"
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                {/* Existing Medicines */}
                <div className="pt-4 border-t border-border">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    Your Current Medicines
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add medicines you're already taking to check for duplicates
                  </p>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newMedicine}
                      onChange={(e) => setNewMedicine(e.target.value)}
                      placeholder="e.g., Paracetamol"
                      onKeyPress={(e) => e.key === "Enter" && addExistingMedicine()}
                    />
                    <Button onClick={addExistingMedicine} size="sm">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {existingMedicines.map((med) => (
                      <Badge key={med} variant="secondary" className="gap-1">
                        {med}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeMedicine(med)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Reading prescription...</p>
                  </div>
                ) : analysis ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <div className="whitespace-pre-wrap text-sm">{analysis}</div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Pill className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a prescription to see the analysis</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-yellow-500/10 border-yellow-500/20">
            <CardContent className="p-4">
              <p className="text-sm text-center text-yellow-700 dark:text-yellow-300">
                ⚠️ This tool is for informational purposes only. Always consult your doctor or pharmacist for medical advice.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionReader;
