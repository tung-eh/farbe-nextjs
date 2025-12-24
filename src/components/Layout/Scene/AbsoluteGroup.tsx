import { ReactNode } from "react";
import { PerspectiveCamera } from "three";
import { useThree } from "@react-three/fiber";

const AbsoluteGroup = ({
  x = 0.5,
  y = 0.5,
  distance,
  children,
}: {
  x?: number;
  y?: number;
  distance: number;
  children: ReactNode;
}) => {
  const { camera, viewport } = useThree();

  const getPosition = () => {
    const fov = camera instanceof PerspectiveCamera ? camera.fov : 50;

    const height = 2 * Math.tan((fov * Math.PI) / 180 / 2) * distance;
    const width = height * viewport.aspect;

    return [width * x - width / 2, height * y - height / 2, 0] as const;
  };

  return <group position={getPosition()}>{children}</group>;
};

export default AbsoluteGroup;
