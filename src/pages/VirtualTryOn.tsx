import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FaceCamera from "@/components/virtual-tryon/FaceCamera";
import GlassesSelector from "@/components/virtual-tryon/GlassesSelector";

export type GlassesType = "aviator" | "wayfarer" | "round" | "cat-eye" | "rectangular";

const VirtualTryOn = () => {
  const [selectedGlasses, setSelectedGlasses] = useState<GlassesType>("aviator");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Virtual <span className="bg-gradient-medical bg-clip-text text-transparent">Try-On</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Try different glasses frames using AR technology
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FaceCamera selectedGlasses={selectedGlasses} />
            </div>
            
            <div className="lg:col-span-1">
              <GlassesSelector 
                selectedGlasses={selectedGlasses}
                onSelectGlasses={setSelectedGlasses}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
