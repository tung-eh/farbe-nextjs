import { useEffect, JSX } from "react";
import { MeshStandardMaterial, SRGBColorSpace } from "three";
import { useGLTF, useTexture } from "@react-three/drei";

const Model = ({
  src,
  map: mapSrc,
  metalnessMap: metalnessMapSrc,
  ...props
}: {
  src: string;
  map: string;
  metalnessMap: string;
} & Omit<JSX.IntrinsicElements["primitive"], "scene" | "scale">) => {
  const { scene, materials } = useGLTF(src);

  const [map, metalnessMap] = useTexture(
    [mapSrc, metalnessMapSrc],
    (textures) => {
      textures.forEach((texture) => {
        if (texture) {
          texture.flipY = false;
          texture.colorSpace = SRGBColorSpace;
          texture.anisotropy = 16;
        }
      });
    },
  );

  useEffect(() => {
    if (!(materials.main instanceof MeshStandardMaterial) || !map) {
      return;
    }

    // Apply textures
    materials.main.map = map; // eslint-disable-line react-hooks/immutability
    materials.main.metalnessMap = metalnessMap;
    materials.main.needsUpdate = true;
  }, [materials, map, metalnessMap]);

  return <primitive object={scene} scale={100} {...props} />;
};

export default Model;
