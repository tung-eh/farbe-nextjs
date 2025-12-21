"use client";

import { Canvas as R3fCanvas } from "@react-three/fiber";

const Canvas = ({ className }: { className?: string }) => {
  return (
    <figure className={className}>
      <R3fCanvas />
    </figure>
  );
};

export default Canvas;
