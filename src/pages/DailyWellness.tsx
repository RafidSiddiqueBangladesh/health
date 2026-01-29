import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, Pause, RotateCcw, Dumbbell, Wind, Eye, CheckCircle } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  duration: number;
  description: string;
  steps: string[];
}

const exercises: Exercise[] = [
  {
    id: "neck-stretch",
    name: "Neck Stretch",
    duration: 60,
    description: "Relieve neck tension from screen time",
    steps: [
      "Sit or stand straight",
      "Slowly tilt head to the right, hold 10 seconds",
      "Return to center",
      "Tilt head to the left, hold 10 seconds",
      "Repeat 3 times each side"
    ]
  },
  {
    id: "shoulder-rolls",
    name: "Shoulder Rolls",
    duration: 45,
    description: "Release shoulder tension",
    steps: [
      "Stand or sit with arms relaxed",
      "Roll shoulders forward in circles 5 times",
      "Roll shoulders backward in circles 5 times",
      "Squeeze shoulders up to ears, hold 5 seconds, release",
      "Repeat the squeeze 3 times"
    ]
  },
  {
    id: "desk-stretch",
    name: "Desk Stretch",
    duration: 90,
    description: "Full body stretch at your desk",
    steps: [
      "Interlace fingers, stretch arms overhead",
      "Hold for 10 seconds",
      "Twist torso left, hold 10 seconds",
      "Twist torso right, hold 10 seconds",
      "Stand and touch toes (or as far as comfortable)"
    ]
  }
];

const breathingExercises: Exercise[] = [
  {
    id: "box-breathing",
    name: "Box Breathing",
    duration: 120,
    description: "4-4-4-4 technique for calm focus",
    steps: [
      "Breathe IN for 4 seconds",
      "HOLD for 4 seconds",
      "Breathe OUT for 4 seconds",
      "HOLD for 4 seconds",
      "Repeat 5 cycles"
    ]
  },
  {
    id: "relaxing-breath",
    name: "4-7-8 Relaxing Breath",
    duration: 90,
    description: "Deep relaxation technique",
    steps: [
      "Breathe IN quietly through nose for 4 seconds",
      "HOLD breath for 7 seconds",
      "Breathe OUT completely through mouth for 8 seconds",
      "Make a 'whoosh' sound while exhaling",
      "Repeat 4 cycles"
    ]
  },
  {
    id: "energizing-breath",
    name: "Energizing Breath",
    duration: 60,
    description: "Quick energy boost",
    steps: [
      "Sit up straight",
      "Take 3 quick inhales through nose",
      "One long exhale through mouth",
      "Repeat 5 times",
      "Feel the energy!"
    ]
  }
];

const eyeExercises: Exercise[] = [
  {
    id: "20-20-20",
    name: "20-20-20 Rule",
    duration: 30,
    description: "Reduce eye strain from screens",
    steps: [
      "Look away from your screen",
      "Focus on something 20 feet (6 meters) away",
      "Keep looking for 20 seconds",
      "Blink naturally several times",
      "Return to work refreshed"
    ]
  },
  {
    id: "eye-circles",
    name: "Eye Circles",
    duration: 45,
    description: "Exercise eye muscles",
    steps: [
      "Look up, then slowly rotate eyes clockwise",
      "Complete 5 full circles",
      "Close eyes and rest for 5 seconds",
      "Rotate eyes counter-clockwise 5 times",
      "Blink rapidly 10 times"
    ]
  },
  {
    id: "palming",
    name: "Palming Relaxation",
    duration: 60,
    description: "Rest and refresh tired eyes",
    steps: [
      "Rub palms together to warm them",
      "Cup palms over closed eyes",
      "Don't press on eyeballs",
      "Breathe deeply and relax",
      "Hold for 30-60 seconds"
    ]
  }
];

const ExerciseCard = ({ exercise, onComplete }: { exercise: Exercise; onComplete: () => void }) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercise.duration);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        // Progress through steps
        const stepDuration = exercise.duration / exercise.steps.length;
        const newStep = Math.floor((exercise.duration - timeLeft + 1) / stepDuration);
        if (newStep < exercise.steps.length) {
          setCurrentStep(newStep);
        }
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, exercise, onComplete]);

  const reset = () => {
    setIsActive(false);
    setTimeLeft(exercise.duration);
    setCurrentStep(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((exercise.duration - timeLeft) / exercise.duration) * 100;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{exercise.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{exercise.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <span className="text-4xl font-bold font-mono">{formatTime(timeLeft)}</span>
        </div>
        
        <Progress value={progress} className="h-2" />

        <div className="flex justify-center gap-2">
          <Button
            variant={isActive ? "secondary" : "default"}
            size="sm"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="h-4 w-4 mr-1" /> Reset
          </Button>
        </div>

        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm font-medium mb-2">Current Step:</p>
          <p className="text-sm text-primary">{exercise.steps[currentStep]}</p>
        </div>

        <div className="space-y-1">
          {exercise.steps.map((step, index) => (
            <div 
              key={index}
              className={`text-xs flex items-center gap-2 ${
                index < currentStep 
                  ? "text-green-600 dark:text-green-400" 
                  : index === currentStep 
                    ? "text-primary font-medium" 
                    : "text-muted-foreground"
              }`}
            >
              {index < currentStep && <CheckCircle className="h-3 w-3" />}
              <span>{index + 1}. {step}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const DailyWellness = () => {
  const [completedToday, setCompletedToday] = useState<string[]>([]);

  const handleComplete = (id: string) => {
    if (!completedToday.includes(id)) {
      setCompletedToday([...completedToday, id]);
    }
  };

  const totalExercises = exercises.length + breathingExercises.length + eyeExercises.length;
  const dailyProgress = (completedToday.length / totalExercises) * 100;

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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
              <Dumbbell className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Daily Micro-Wellness</h1>
            <p className="text-muted-foreground mb-4">
              3-minute exercises for your daily health breaks
            </p>
            
            {/* Daily Progress */}
            <Card className="max-w-md mx-auto">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Today's Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {completedToday.length}/{totalExercises} completed
                  </span>
                </div>
                <Progress value={dailyProgress} className="h-3" />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="exercises" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="exercises" className="gap-2">
                <Dumbbell className="h-4 w-4" /> Exercises
              </TabsTrigger>
              <TabsTrigger value="breathing" className="gap-2">
                <Wind className="h-4 w-4" /> Breathing
              </TabsTrigger>
              <TabsTrigger value="eyes" className="gap-2">
                <Eye className="h-4 w-4" /> Eye Care
              </TabsTrigger>
            </TabsList>

            <TabsContent value="exercises">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exercises.map((ex) => (
                  <ExerciseCard 
                    key={ex.id} 
                    exercise={ex} 
                    onComplete={() => handleComplete(ex.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="breathing">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {breathingExercises.map((ex) => (
                  <ExerciseCard 
                    key={ex.id} 
                    exercise={ex} 
                    onComplete={() => handleComplete(ex.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="eyes">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eyeExercises.map((ex) => (
                  <ExerciseCard 
                    key={ex.id} 
                    exercise={ex} 
                    onComplete={() => handleComplete(ex.id)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Card className="mt-6 bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <p className="text-sm">
                💡 <strong>Pro tip:</strong> Set reminders every 2 hours for micro-wellness breaks!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DailyWellness;
