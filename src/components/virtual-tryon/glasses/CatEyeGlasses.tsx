import { Shape, ExtrudeGeometry } from "three";
import { useMemo } from "react";

const CatEyeGlasses = () => {
  const lensGeometry = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(-0.25, 0);
    shape.lineTo(-0.15, -0.18);
    shape.lineTo(0.15, -0.18);
    shape.lineTo(0.3, 0.05);
    shape.lineTo(0.15, 0.18);
    shape.lineTo(-0.15, 0.18);
    shape.closePath();
    
    return new ExtrudeGeometry(shape, {
      depth: 0.02,
      bevelEnabled: false,
    });
  }, []);

  return (
    <group>
      {/* Left lens */}
      <mesh position={[-0.35, 0, 0]} geometry={lensGeometry}>
        <meshStandardMaterial
          color="#FF1493"
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Right lens */}
      <mesh position={[0.35, 0, 0]} geometry={lensGeometry} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial
          color="#FF1493"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Left frame outline */}
      <mesh position={[-0.35, 0, 0.02]}>
        <torusGeometry args={[0.22, 0.015, 16, 100, Math.PI * 1.8]} />
        <meshStandardMaterial color="#8B008B" />
      </mesh>

      {/* Right frame outline */}
      <mesh position={[0.35, 0, 0.02]}>
        <torusGeometry args={[0.22, 0.015, 16, 100, Math.PI * 1.8]} />
        <meshStandardMaterial color="#8B008B" />
      </mesh>

      {/* Bridge */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.15, 16]} />
        <meshStandardMaterial color="#8B008B" />
      </mesh>

      {/* Left temple */}
      <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.5, 16]} />
        <meshStandardMaterial color="#8B008B" />
      </mesh>

      {/* Right temple */}
      <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.5, 16]} />
        <meshStandardMaterial color="#8B008B" />
      </mesh>
    </group>
  );
};

export default CatEyeGlasses;
