import { useEffect, useRef } from "react";
import { Hospital } from "@/pages/HospitalLocator";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface HospitalMapProps {
  hospitals: Hospital[];
  userLocation: [number, number] | null;
  selectedHospital: Hospital | null;
  onHospitalSelect: (hospital: Hospital) => void;
}

const HospitalMap = ({ hospitals, userLocation, selectedHospital, onHospitalSelect }: HospitalMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const defaultCenter: [number, number] = [51.505, -0.09];
    const center = userLocation || defaultCenter;

    // Initialize map
    const map = L.map(containerRef.current).setView(center, 13);
    mapRef.current = map;

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  // Update map center when user location changes
  useEffect(() => {
    if (mapRef.current && userLocation) {
      mapRef.current.setView(userLocation, 13);
    }
  }, [userLocation]);

  // Add markers for hospitals and user location
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add user location marker
    if (userLocation) {
      const userMarker = L.marker(userLocation)
        .addTo(mapRef.current)
        .bindPopup("Your Location");
      markersRef.current.push(userMarker);
    }

    // Add hospital markers
    hospitals.forEach((hospital) => {
      const marker = L.marker([hospital.lat, hospital.lng])
        .addTo(mapRef.current!)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-sm mb-1">${hospital.name}</h3>
            <p class="text-xs text-gray-600 mb-1">${hospital.address}</p>
            <p class="text-xs font-medium">${hospital.distance} away</p>
          </div>
        `)
        .on("click", () => onHospitalSelect(hospital));
      
      markersRef.current.push(marker);
    });
  }, [hospitals, userLocation, onHospitalSelect]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[500px] rounded-lg overflow-hidden shadow-medium border border-border"
    />
  );
};

export default HospitalMap;
