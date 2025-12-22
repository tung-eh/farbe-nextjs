"use client";

import { SoftShadows } from "@react-three/drei";

const Scene = () => {
  return (
    <>
      <mesh castShadow>
        <torusGeometry args={[1, 0.5, 16, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh receiveShadow position={[0, 0, -4]}>
        <planeGeometry args={[400, 400, 10, 10]} />
        <shadowMaterial opacity={0.5} />
      </mesh>

      <directionalLight castShadow position={[-8, 6, 20]} intensity={2} />

      <SoftShadows size={40} samples={10} />
    </>
  );
};

export default Scene;
