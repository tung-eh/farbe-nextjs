"use client";

import { useRef, useState, useEffect } from "react";
import { Group } from "three";
import { SoftShadows, Environment, Float } from "@react-three/drei";
import gsap from "gsap";
import { useWindowSize } from "usehooks-ts";

import FilmCanister from "./FilmCanister";
import FilmPackaging from "./FilmPackaging";
import AbsoluteGroup from "./AbsoluteGroup";

const Scene = () => {
  const { width } = useWindowSize();
  const [activeModel] = useState<"100" | "200" | "400" | "800">("400");
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

  const options =
    width >= 1280
      ? ({
          x: 0.33,
          canisterPosition: [1.5, 2.5, 0],
          packagingPosition: [-1.5, -2.5, 0],
        } as const)
      : ({
          x: 0.5,
          canisterPosition: [2.5, 4.5, 0],
          packagingPosition: [-2.5, -5, 0],
        } as const);

  return (
    <>
      <AbsoluteGroup x={options.x} distance={20}>
        <Float position={options.canisterPosition}>
          <group ref={canisterRef}>
            <FilmCanister model={activeModel} rotation={[0, 0, Math.PI / 8]} />
          </group>
        </Float>
        <Float position={options.packagingPosition}>
          <group>
            <FilmPackaging
              model={activeModel}
              rotation={[-Math.PI / 2, 0, Math.PI / 3]}
            />
          </group>
        </Float>
      </AbsoluteGroup>

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
