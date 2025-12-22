import { JSX } from "react";
import { useGLTF } from "@react-three/drei";

const Model = ({
  src,
  ...props
}: {
  src: string;
} & Omit<JSX.IntrinsicElements["primitive"], "scene">) => {
  const { scene } = useGLTF(src);

  return <primitive object={scene} {...props} />;
};

export default Model;
