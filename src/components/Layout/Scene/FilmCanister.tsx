import { ComponentProps } from "react";

import Model from "./Model";

const FilmCanister = ({
  model,
  ...props
}: { model: "100" | "200" | "400" | "800" } & Omit<
  ComponentProps<typeof Model>,
  "src" | "map" | "metalnessMap"
>) => {
  return (
    <Model
      src="/canister/canister.gltf"
      map={`/textures/${model}-color-min.jpg`}
      metalnessMap={`/textures/${model}-metallic-min.jpg`}
      {...props}
    />
  );
};

export default FilmCanister;
