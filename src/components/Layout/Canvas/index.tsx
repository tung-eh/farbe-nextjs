"use client";

import { Canvas as R3fCanvas } from "@react-three/fiber";

const Canvas = ({ className }: { className?: string }) => {
  return (
    <figure className={className}>
      <R3fCanvas>
        <mesh>
          <torusGeometry args={[1, 0.4, 16, 100]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
      </R3fCanvas>
    </figure>
  );
};

export default Canvas;
