import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HospitalMap from "@/components/hospital/HospitalMap";
import HospitalList from "@/components/hospital/HospitalList";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Navigation as NavigationIcon } from "lucide-react";

export interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  distance: string;
  lat: number;
  lng: number;
  type: string;
}

const HospitalLocator = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  // Sample hospitals data - in production, this would come from an API
  const hospitals: Hospital[] = [
    {
      id: 1,
      name: "City General Hospital",
      address: "123 Main Street, Downtown",
      phone: "+1 234 567 8900",
      distance: "0.5 km",
      lat: 51.505,
      lng: -0.09,
      type: "General"
    },
    {
      id: 2,
      name: "St. Mary's Medical Center",
      address: "456 Oak Avenue, Midtown",
      phone: "+1 234 567 8901",
      distance: "1.2 km",
      lat: 51.51,
      lng: -0.1,
      type: "Specialty"
    },
    {
      id: 3,
      name: "Emergency Care Clinic",
      address: "789 Pine Road, Uptown",
      phone: "+1 234 567 8902",
      distance: "2.3 km",
      lat: 51.515,
      lng: -0.08,
      type: "Emergency"
    }
  ];

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Nearby Healthcare</h1>
          <p className="text-muted-foreground mb-6">
            Locate hospitals, clinics, and emergency care facilities near you
          </p>
          
          <Button onClick={handleGetLocation} className="gap-2">
            <MapPin className="w-4 h-4" />
            Use My Location
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <HospitalMap 
              hospitals={hospitals}
              userLocation={userLocation}
              selectedHospital={selectedHospital}
              onHospitalSelect={setSelectedHospital}
            />
          </div>
          
          <div>
            <HospitalList 
              hospitals={hospitals}
              selectedHospital={selectedHospital}
              onHospitalSelect={setSelectedHospital}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HospitalLocator;
