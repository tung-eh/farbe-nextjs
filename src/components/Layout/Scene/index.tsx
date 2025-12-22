const Scene = () => {
  return (
    <mesh>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default Scene;
