import { useEffect, JSX } from "react";
import {
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace,
  Texture,
  TextureLoader,
} from "three";
import { useGLTF } from "@react-three/drei";

export const isNotUndefined = <T,>(value: T | undefined): value is T =>
  value !== undefined;

function loadTexture(url?: string): Promise<Texture | null> {
  if (!url) return Promise.resolve(null);

  return new Promise<Texture | null>((resolve) => {
    const loader = new TextureLoader();
    loader.load(
      url,
      (texture: Texture) => {
        texture.flipY = false;
        texture.colorSpace = SRGBColorSpace;
        texture.anisotropy = 16;
        texture.needsUpdate = true;
        resolve(texture);
      },
      undefined,
      (err) => {
        console.warn("TextureLoader failed for", url, err);
        resolve(null);
      },
    );
  });
}

const Model = ({
  src,
  map: mapSrc,
  metalnessMap: metalnessMapSrc,
  ...props
}: {
  src: string;
  map: string;
  metalnessMap?: string;
} & Omit<JSX.IntrinsicElements["primitive"], "scene" | "scale">) => {
  const { scene, materials } = useGLTF(src);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    Promise.all([loadTexture(mapSrc), loadTexture(metalnessMapSrc)]).then(
      ([map, metalnessMap]) => {
        if (!(materials.main instanceof MeshStandardMaterial)) return;

        materials.main.map = map;
        materials.main.metalnessMap = metalnessMap;
        materials.main.needsUpdate = true;
        materials.main.needsUpdate = true;
      },
    );
  }, [materials, mapSrc, metalnessMapSrc]);

  return <primitive object={scene} scale={100} {...props} />;
};

export default Model;
