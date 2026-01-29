import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface AnimatedAvatarProps {
  isSpeaking: boolean;
}

function AnimatedAvatar({ isSpeaking }: AnimatedAvatarProps) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const distortRef = useRef(0);

  useFrame((state) => {
    if (!sphereRef.current) return;
    
    // Gentle floating animation
    sphereRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    
    // Rotation
    sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    
    // Speaking animation - more distortion when speaking
    if (isSpeaking) {
      distortRef.current = THREE.MathUtils.lerp(distortRef.current, 0.4, 0.1);
    } else {
      distortRef.current = THREE.MathUtils.lerp(distortRef.current, 0.15, 0.1);
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#8B5CF6"
        attach="material"
        distort={distortRef.current}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

interface Avatar3DProps {
  isSpeaking: boolean;
}

const Avatar3D = ({ isSpeaking }: Avatar3DProps) => {
  return (
    <div className="w-full h-[300px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
        <AnimatedAvatar isSpeaking={isSpeaking} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Avatar3D;