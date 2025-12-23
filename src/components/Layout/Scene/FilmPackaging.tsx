import { ComponentProps } from "react";

import Model from "./Model";

const FilmPackaging = ({
  model,
  ...props
}: { model: "100" | "200" | "400" | "800" } & Omit<
  ComponentProps<typeof Model>,
  "src" | "map" | "metalnessMap"
>) => {
  return (
    <Model
      src="/packaging/packaging.gltf"
      map={`/textures/${model}-packaging-min.jpg`}
      {...props}
    />
  );
};

export default FilmPackaging;
