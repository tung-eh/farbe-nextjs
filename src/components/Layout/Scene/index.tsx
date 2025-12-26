"use client";

import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { Group } from "three";
import { SoftShadows, Environment, Float } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useWindowSize, useIsMounted } from "usehooks-ts";

import { useCart } from "@/states/cart";

import FilmCanister from "./FilmCanister";
import FilmPackaging from "./FilmPackaging";
import AbsoluteGroup from "./AbsoluteGroup";

const Scene = () => {
  const pathname = usePathname();
  const { width } = useWindowSize();
  const isMounted = useIsMounted()();
  const canisterRef = useRef<Group>(null);
  const canisterModelRef = useRef<Group>(null);
  const packagingRef = useRef<Group>(null);
  const lastTotalItems = useRef<number>(Infinity);

  const { totalItems } = useCart();

  const [activeModel] = useState<"100" | "200" | "400" | "800">("800");

  useEffect(() => {
    const updateCanisterRotation = () => {
      if (canisterModelRef.current) {
        canisterModelRef.current.rotation.y =
          Math.PI / 4 - (Math.sin(gsap.ticker.time * 0.25) * Math.PI) / 2;
      }
    };

    gsap.ticker.add(updateCanisterRotation);

    return () => gsap.ticker.remove(updateCanisterRotation);
  }, []);

  useGSAP(() => {
    if (!canisterRef.current || !packagingRef.current) return;

    const canisterPosition = canisterRef.current.position;
    const packagingPosition = packagingRef.current.position;

    const animateOnScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>(
        "[data-scene-position]",
      );

      sections.forEach((section) => {
        const model = section.dataset.sceneModel;
        const position = section.dataset.scenePosition;
        const shouldRotate = section.dataset.sceneRotate;

        gsap.to([canisterPosition, packagingPosition], {
          y: position === "center" ? 0 : 24,
          stagger: 0.05,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: position === "center" ? "top+=40% bottom" : "top bottom",
            end: position === "center" ? "top+=90% bottom" : "top+=50% bottom",
            scrub: true,
          },
        });
      });
    };

    if (window.scrollY < 20) {
      gsap.from([canisterPosition, packagingPosition], {
        y: -12,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        onComplete: animateOnScroll,
      });
    } else {
      animateOnScroll();
    }
  }, [pathname]);

  useGSAP(() => {
    if (!isMounted || !canisterRef.current || !packagingRef.current) return;

    const canisterRotation = canisterRef.current.rotation;
    const packagingRotation = packagingRef.current.rotation;

    if (totalItems > lastTotalItems.current) {
      gsap.to([canisterRotation, packagingRotation], {
        y: `+=${Math.PI * 2}`,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.inOut",
      });
    }

    lastTotalItems.current = totalItems;
  }, [totalItems]);

  const options =
    width >= 1280
      ? ({
          x: 0.33,
          canisterPosition: [1.5, 2.5, 0],
          packagingPosition: [-1.5, -2.5, 0],
          scale: 1,
        } as const)
      : ({
          x: 0.5,
          canisterPosition: [2.5, 4.5, 0],
          packagingPosition: [-2.5, -5, 0],
          scale: 0.5,
        } as const);

  return (
    <>
      <AbsoluteGroup x={options.x} distance={20}>
        <Float position={options.canisterPosition} scale={options.scale}>
          <group ref={canisterRef}>
            <FilmCanister
              ref={canisterModelRef}
              model={activeModel}
              rotation={[0, 0, Math.PI / 8]}
            />
          </group>
        </Float>
        <Float position={options.packagingPosition} scale={options.scale}>
          <group ref={packagingRef}>
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
