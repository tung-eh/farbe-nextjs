"use client";

import { useState, useEffect, ReactNode } from "react";
import { Canvas as R3fCanvas } from "@react-three/fiber";

import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { twMerge } from "tailwind-merge";

const Canvas = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <figure
      className={twMerge(
        "opacity-0 transition-opacity delay-300 duration-1000 ease-in-out",
        isMounted && "opacity-100",
        className,
      )}
    >
      <R3fCanvas shadows>
        <OrbitControls target={[0, 0, 0]} />
        <PerspectiveCamera makeDefault fov={45} position={[0, 0, 20]} />
        {children}
      </R3fCanvas>
    </figure>
  );
};

export default Canvas;
