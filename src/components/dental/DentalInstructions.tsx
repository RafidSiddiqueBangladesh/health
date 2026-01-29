import { Camera, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface DentalInstructionsProps {
  onStart: () => void;
}

const DentalInstructions = ({ onStart }: DentalInstructionsProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Important Notice</h3>
              <p className="text-sm text-muted-foreground">
                This is an AI-powered screening tool and not a replacement for professional dental examination. 
                Always consult with a licensed dentist for accurate diagnosis and treatment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">How to Take a Good Dental Photo</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Good Lighting</h3>
                <p className="text-sm text-muted-foreground">
                  Use natural daylight or bright indoor lighting. Ensure your teeth are well-lit and clearly visible.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Clean Your Teeth</h3>
                <p className="text-sm text-muted-foreground">
                  Brush your teeth before taking the photo to remove food particles and ensure clear visibility.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Wide Smile</h3>
                <p className="text-sm text-muted-foreground">
                  Smile wide to show your teeth clearly. You can take multiple angles including front, sides, and close-ups.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Stable Position</h3>
                <p className="text-sm text-muted-foreground">
                  Hold your device steady or use a mirror to help frame the shot properly. Avoid blurry images.
                </p>
              </div>
            </div>
          </div>

          <Button onClick={onStart} className="w-full mt-6 gap-2">
            <Camera className="w-4 h-4" />
            Start Dental Scan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DentalInstructions;
