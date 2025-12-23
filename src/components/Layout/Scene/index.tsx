"use client";

import { SoftShadows, Environment } from "@react-three/drei";

import FilmCanister from "./FilmCanister";

const Scene = () => {
  return (
    <>
      <FilmCanister model="800" />

      <mesh receiveShadow position={[0, 0, -4]}>
        <planeGeometry args={[400, 400, 10, 10]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.5} />
      </mesh>

      <directionalLight
        castShadow
        position={[-8, 6, 20]}
        intensity={0.5}
        shadow-mapSize={[512, 512]}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        color="0xFFFFFF"
      />

      <SoftShadows size={50} samples={10} />

      <Environment files="/textures/lobby.hdr" environmentIntensity={0.25} />
    </>
  );
};

export default Scene;
