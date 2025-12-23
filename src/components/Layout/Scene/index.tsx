"use client";

import { useRef, useEffect } from "react";
import { Group } from "three";
import { SoftShadows, Environment, Float } from "@react-three/drei";
import gsap from "gsap";

import FilmCanister from "./FilmCanister";

const Scene = () => {
  const canisterRef = useRef<Group>(null);

  useEffect(() => {
    const updateCanisterRotation = () => {
      if (canisterRef.current) {
        canisterRef.current.rotation.y =
          Math.PI / 4 - (Math.sin(gsap.ticker.time * 0.25) * Math.PI) / 2;
      }
    };

    gsap.ticker.add(updateCanisterRotation);

    return () => gsap.ticker.remove(updateCanisterRotation);
  }, []);

  return (
    <>
      <Float>
        <group ref={canisterRef}>
          <FilmCanister model="800" rotation={[0, 0, Math.PI / 8]} />
        </group>
      </Float>

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
