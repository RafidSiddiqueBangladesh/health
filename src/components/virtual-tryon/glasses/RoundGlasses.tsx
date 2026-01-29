const RoundGlasses = () => {
  return (
    <group>
      {/* Left lens */}
      <mesh position={[-0.35, 0, 0]}>
        <circleGeometry args={[0.25, 64]} />
        <meshStandardMaterial
          color="#FFD700"
          transparent
          opacity={0.2}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Right lens */}
      <mesh position={[0.35, 0, 0]}>
        <circleGeometry args={[0.25, 64]} />
        <meshStandardMaterial
          color="#FFD700"
          transparent
          opacity={0.2}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Bridge */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.15, 16]} />
        <meshStandardMaterial color="#DAA520" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Left frame */}
      <mesh position={[-0.35, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.25, 0.012, 16, 100]} />
        <meshStandardMaterial color="#DAA520" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Right frame */}
      <mesh position={[0.35, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.25, 0.012, 16, 100]} />
        <meshStandardMaterial color="#DAA520" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Left temple */}
      <mesh position={[-0.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.01, 0.6, 16]} />
        <meshStandardMaterial color="#DAA520" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Right temple */}
      <mesh position={[0.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.01, 0.6, 16]} />
        <meshStandardMaterial color="#DAA520" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

export default RoundGlasses;
