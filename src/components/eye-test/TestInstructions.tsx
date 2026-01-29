import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface TestInstructionsProps {
  testType: string;
}

const TestInstructions = ({ testType }: TestInstructionsProps) => {
  const instructions = {
    distance: {
      title: "Distance Vision Test",
      steps: [
        "Position yourself 3-6 feet away from your screen",
        "Cover one eye with your hand (don't press on the eye)",
        "Display an eye chart on your device or have one nearby",
        "Capture the image while looking at the chart",
        "Repeat for the other eye"
      ],
      tips: [
        "Ensure good lighting conditions",
        "Keep your head straight and eyes level with the chart",
        "Don't squint or strain your eyes"
      ]
    },
    near: {
      title: "Near Vision Test",
      steps: [
        "Hold reading material at 14-16 inches from your eyes",
        "Ensure text is in focus on camera",
        "Try reading the smallest text you can see clearly",
        "Capture the image showing the text",
        "Test both eyes"
      ],
      tips: [
        "Use natural reading position",
        "Test in typical reading lighting",
        "Note any difficulty or eye strain"
      ]
    },
    astigmatism: {
      title: "Astigmatism Test",
      steps: [
        "Look at an astigmatism chart (sunburst or clock dial pattern)",
        "Observe if some lines appear darker or clearer than others",
        "Note which lines appear darkest",
        "Capture the chart image",
        "Test both eyes separately"
      ],
      tips: [
        "View chart from the recommended distance",
        "All lines should appear equally dark if no astigmatism",
        "Variations in line darkness may indicate astigmatism"
      ]
    }
  };

  const currentTest = instructions[testType as keyof typeof instructions];

  return (
    <Card className="border-primary/20">
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">{currentTest.title}</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Step-by-Step Instructions
              </h4>
              <ol className="space-y-2 ml-7">
                {currentTest.steps.map((step, index) => (
                  <li key={index} className="text-muted-foreground">
                    <span className="font-medium text-foreground">{index + 1}.</span> {step}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                Important Tips
              </h4>
              <ul className="space-y-2 ml-7 list-disc">
                {currentTest.tips.map((tip, index) => (
                  <li key={index} className="text-muted-foreground">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> This is a preliminary screening tool. 
            Results should not replace professional eye examination. Please consult an eye care 
            professional for accurate diagnosis and prescription.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestInstructions;
