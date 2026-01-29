import { Camera, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DentalResultsProps {
  analysis: string;
  onRetake: () => void;
}

const DentalResults = ({ analysis, onRetake }: DentalResultsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Dental Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {analysis}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Want to check another angle or retake the photo?
            </p>
            <Button onClick={onRetake} variant="outline" className="gap-2">
              <Camera className="w-4 h-4" />
              Retake Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <p className="text-sm">
            <strong>Remember:</strong> This AI analysis is for informational purposes only. 
            Please schedule regular check-ups with your dentist for professional care and accurate diagnosis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DentalResults;
