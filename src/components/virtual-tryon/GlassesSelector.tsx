import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GlassesType } from "@/pages/VirtualTryOn";
import { Glasses } from "lucide-react";

interface GlassesSelectorProps {
  selectedGlasses: GlassesType;
  onSelectGlasses: (type: GlassesType) => void;
}

const glassesOptions: { type: GlassesType; name: string; description: string }[] = [
  {
    type: "aviator",
    name: "Aviator",
    description: "Classic teardrop shape with thin metal frames",
  },
  {
    type: "wayfarer",
    name: "Wayfarer",
    description: "Iconic thick plastic frames with angular design",
  },
  {
    type: "round",
    name: "Round",
    description: "Vintage circular frames for a retro look",
  },
  {
    type: "cat-eye",
    name: "Cat Eye",
    description: "Upswept outer edges for a stylish look",
  },
  {
    type: "rectangular",
    name: "Rectangular",
    description: "Modern geometric frames with clean lines",
  },
];

const GlassesSelector = ({ selectedGlasses, onSelectGlasses }: GlassesSelectorProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Glasses className="w-5 h-5" />
          Choose Your Style
        </h3>
        <div className="space-y-3">
          {glassesOptions.map((option) => (
            <Button
              key={option.type}
              onClick={() => onSelectGlasses(option.type)}
              variant={selectedGlasses === option.type ? "default" : "outline"}
              className="w-full justify-start h-auto p-4 text-left"
            >
              <div>
                <div className="font-semibold">{option.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {option.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GlassesSelector;
