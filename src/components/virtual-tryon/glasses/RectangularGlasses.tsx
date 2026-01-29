const RectangularGlasses = () => {
  return (
    <group>
      {/* Left lens */}
      <mesh position={[-0.35, 0, 0]}>
        <boxGeometry args={[0.45, 0.32, 0.02]} />
        <meshStandardMaterial
          color="#4169E1"
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Right lens */}
      <mesh position={[0.35, 0, 0]}>
        <boxGeometry args={[0.45, 0.32, 0.02]} />
        <meshStandardMaterial
          color="#4169E1"
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Left frame - top */}
      <mesh position={[-0.35, 0.16, 0.02]}>
        <boxGeometry args={[0.47, 0.015, 0.04]} />
        <meshStandardMaterial color="#1E90FF" />
      </mesh>

      {/* Left frame - bottom */}
      <mesh position={[-0.35, -0.16, 0.02]}>
        <boxGeometry args={[0.47, 0.015, 0.04]} />
        <meshStandardMaterial color="#1E90FF" />
      </mesh>

      {/* Left frame - left side */}
      <mesh position={[-0.575, 0, 0.02]}>
        <boxGeometry args={[0.015, 0.32, 0.04]} />
        <meshStandardMaterial color="#1E90FF" />
      </mesh>

      {/* Left frame - right side */}
      <mesh position={[-0.125, 0, 0.02]}>
        <boxGeometry args={[0.015, 0.32, 0.04]} />
        <meshStandardMaterial color="#1E90FF" />
      </mesh>

      {/* Right frame - top */}
      <mesh position={[0.35, 0.16, 0.02]}>
        <boxGeometry args={[0.47, 0.015, 0.04]} />
        <meshStandardMaterial color="#1E90FF" />
      </mesh>

      {/* Right frame - bottom */}
      <mesh position={[0.35, -0.16, 0.02]}>
        <boxGeometry args={[0.47, 0.015, 0.04]} />
        <meshStandardMaterial color="#1E90FF" />
      </mesh>

      {/* Right frame - left side */}
      <mesh position={[0.125, 0, 0.02]}>
        <boxGeometry args={[0.015, 0.32, 0.04]} />
        <meshStandardMaterial color="#1E90FF" />
      </mesh>

      {/* Right frame - right side */}
      <mesh position={[0.575, 0, 0.02]}>
        <boxGeometry args={[0.015, 0.32, 0.04]} />
        <meshStandardMaterial color="#1E90FF" />
      </mesh>

      {/* Bridge */}
      <mesh position={[0, 0.05, 0.02]}>
        <boxGeometry args={[0.15, 0.04, 0.04]} />
        <meshStandardMaterial color="#1E90FF" />
      </mesh>

      {/* Left temple */}
      <mesh position={[-0.62, 0, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.5, 0.04, 0.04]} />
        <meshStandardMaterial color="#1E90FF" />
      </mesh>

      {/* Right temple */}
      <mesh position={[0.62, 0, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.5, 0.04, 0.04]} />
        <meshStandardMaterial color="#1E90FF" />
      </mesh>
    </group>
  );
};

export default RectangularGlasses;
