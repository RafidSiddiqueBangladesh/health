import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  gradient: string;
  link: string;
}

const FeatureCard = ({ icon: Icon, title, description, image, gradient, link }: FeatureCardProps) => {
  return (
    <Card className="group overflow-hidden border-border hover:shadow-medium transition-smooth cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 ${gradient} opacity-20`} />
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
        />
        <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl ${gradient} flex items-center justify-center shadow-soft`}>
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link to={link}>
          <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent">
            <span className="text-primary">Explore Feature</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-smooth" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
