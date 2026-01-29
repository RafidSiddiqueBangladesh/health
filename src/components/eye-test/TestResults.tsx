import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TestResultsProps {
  analysis: string;
  capturedImage: string;
  onReset: () => void;
}

const TestResults = ({ analysis, capturedImage, onReset }: TestResultsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Test Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Captured Image */}
          <div>
            <h4 className="font-medium mb-3">Captured Image</h4>
            <img 
              src={capturedImage} 
              alt="Captured eye test" 
              className="w-full rounded-lg shadow-soft"
            />
          </div>

          {/* AI Analysis */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              AI Analysis
            </h4>
            <div className="prose prose-sm max-w-none">
              <div className="bg-gradient-card p-4 rounded-lg border border-border whitespace-pre-wrap">
                {analysis}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-medium text-sm">Important Medical Disclaimer</p>
                <p className="text-sm text-muted-foreground">
                  This AI-powered analysis is for informational purposes only and should not 
                  replace professional medical advice, diagnosis, or treatment. Always seek 
                  the advice of your eye care professional with any questions you may have 
                  regarding your vision or eye health.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={onReset} variant="outline" className="flex-1">
              Take Another Test
            </Button>
            <Button className="flex-1 bg-gradient-medical">
              Find Eye Doctor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestResults;
