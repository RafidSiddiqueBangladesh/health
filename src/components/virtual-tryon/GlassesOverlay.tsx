import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import type { GlassesType } from "@/pages/VirtualTryOn";
import AviatorGlasses from "./glasses/AviatorGlasses";
import WayfarerGlasses from "./glasses/WayfarerGlasses";
import RoundGlasses from "./glasses/RoundGlasses";
import CatEyeGlasses from "./glasses/CatEyeGlasses";
import RectangularGlasses from "./glasses/RectangularGlasses";

interface GlassesOverlayProps {
  landmarks: any[];
  glassesType: GlassesType;
}

const GlassesOverlay = ({ landmarks, glassesType }: GlassesOverlayProps) => {
  // Key landmarks for glasses positioning
  const leftEye = landmarks[33]; // Left eye outer corner
  const rightEye = landmarks[263]; // Right eye outer corner
  const noseBridge = landmarks[168]; // Nose bridge
  const leftTemple = landmarks[234]; // Left temple
  const rightTemple = landmarks[454]; // Right temple

  // Calculate glasses position and scale
  const centerX = (leftEye.x + rightEye.x) / 2;
  const centerY = (leftEye.y + rightEye.y) / 2;
  const eyeDistance = Math.sqrt(
    Math.pow((rightEye.x - leftEye.x), 2) + 
    Math.pow((rightEye.y - leftEye.y), 2)
  );
  
  // Calculate rotation based on eye alignment
  const rotation = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);
  
  // Convert normalized coordinates to screen coordinates
  const scale = eyeDistance * 2.5;

  const renderGlasses = () => {
    switch (glassesType) {
      case "aviator":
        return <AviatorGlasses />;
      case "wayfarer":
        return <WayfarerGlasses />;
      case "round":
        return <RoundGlasses />;
      case "cat-eye":
        return <CatEyeGlasses />;
      case "rectangular":
        return <RectangularGlasses />;
      default:
        return <AviatorGlasses />;
    }
  };

  return (
    <div className="w-full h-full">
      <Canvas>
        <OrthographicCamera 
          makeDefault 
          position={[0, 0, 10]} 
          zoom={1}
          left={-0.5}
          right={0.5}
          top={0.5}
          bottom={-0.5}
        />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        <group
          position={[centerX - 0.5, -(centerY - 0.5), 0]}
          rotation={[0, 0, rotation]}
          scale={[scale, scale, scale]}
        >
          {renderGlasses()}
        </group>
      </Canvas>
    </div>
  );
};

export default GlassesOverlay;
