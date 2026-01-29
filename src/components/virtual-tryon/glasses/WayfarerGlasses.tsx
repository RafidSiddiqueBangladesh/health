const WayfarerGlasses = () => {
  return (
    <group>
      {/* Left lens */}
      <mesh position={[-0.35, 0, 0]}>
        <boxGeometry args={[0.5, 0.4, 0.02]} />
        <meshStandardMaterial
          color="#1a1a1a"
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Right lens */}
      <mesh position={[0.35, 0, 0]}>
        <boxGeometry args={[0.5, 0.4, 0.02]} />
        <meshStandardMaterial
          color="#1a1a1a"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Left frame */}
      <mesh position={[-0.35, 0, 0]}>
        <boxGeometry args={[0.52, 0.42, 0.08]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Right frame */}
      <mesh position={[0.35, 0, 0]}>
        <boxGeometry args={[0.52, 0.42, 0.08]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Bridge */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.15, 0.08, 0.08]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Left temple */}
      <mesh position={[-0.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.6, 0.08, 0.06]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Right temple */}
      <mesh position={[0.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.6, 0.08, 0.06]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
};

export default WayfarerGlasses;
