import { Eye, Smile, Bot, MapPin, Pill, Apple, Dumbbell } from "lucide-react";
import FeatureCard from "./FeatureCard";
import glassesImage from "@/assets/glasses-feature.jpg";
import dentalImage from "@/assets/dental-feature.jpg";
import aiImage from "@/assets/ai-assistant.jpg";

const Features = () => {
  const features = [
    {
      icon: Eye,
      title: "Smart Eye Care",
      description: "Virtual try-on for glasses, instant eye power testing, and personalized eyewear recommendations.",
      image: glassesImage,
      gradient: "bg-gradient-to-br from-primary to-secondary",
      link: "/virtual-tryon"
    },
    {
      icon: Smile,
      title: "Dental Health Tools",
      description: "AI-powered teeth analysis, cavity detection, and personalized oral care product recommendations.",
      image: dentalImage,
      gradient: "bg-gradient-to-br from-secondary to-accent",
      link: "/dental-scanner"
    },
    {
      icon: Bot,
      title: "AI Health Assistant",
      description: "24/7 AI doctor with 3D avatar, mental health support, and personalized health guidance.",
      image: aiImage,
      gradient: "bg-gradient-to-br from-accent to-primary",
      link: "/ai-assistant"
    },
    {
      icon: Pill,
      title: "Prescription Reader",
      description: "Convert handwritten prescriptions to text, understand medicine purposes, and check for duplicates.",
      image: dentalImage,
      gradient: "bg-gradient-to-br from-orange-500 to-red-500",
      link: "/prescription-reader"
    },
    {
      icon: Apple,
      title: "Nutrition by Condition",
      description: "Personalized diet plans for dental, skin, and mental health with local Bangladeshi foods.",
      image: glassesImage,
      gradient: "bg-gradient-to-br from-green-500 to-emerald-500",
      link: "/nutrition"
    },
    {
      icon: Dumbbell,
      title: "Daily Micro-Wellness",
      description: "3-minute exercises, breathing guides, and eye breaks to keep you healthy daily.",
      image: aiImage,
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
      link: "/daily-wellness"
    },
    {
      icon: MapPin,
      title: "Healthcare Locator",
      description: "Find nearby hospitals, book ambulances, and connect with doctors instantly.",
      image: glassesImage,
      gradient: "bg-gradient-to-br from-primary to-accent",
      link: "/hospital-locator"
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Comprehensive <span className="bg-gradient-medical bg-clip-text text-transparent">Health Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to take control of your health, powered by advanced AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
