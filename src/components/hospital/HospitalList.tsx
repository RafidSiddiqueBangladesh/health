import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Navigation, MapPin } from "lucide-react";
import { Hospital } from "@/pages/HospitalLocator";

interface HospitalListProps {
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  onHospitalSelect: (hospital: Hospital) => void;
}

const HospitalList = ({ hospitals, selectedHospital, onHospitalSelect }: HospitalListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Nearby Facilities</h2>
      
      <div className="space-y-3">
        {hospitals.map((hospital) => (
          <Card
            key={hospital.id}
            className={`cursor-pointer transition-smooth hover:shadow-medium ${
              selectedHospital?.id === hospital.id ? "border-primary" : ""
            }`}
            onClick={() => onHospitalSelect(hospital)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg mb-1">{hospital.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{hospital.address}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-medium">{hospital.distance}</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      {hospital.type}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Navigation className="w-4 h-4" />
                  Directions
                </Button>
                <Button size="sm" className="gap-2">
                  Book Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HospitalList;
