const getSceneAttributes = (params: {
  position?: "top" | "center";
  model?: string;
  rotate?: boolean;
}) => {
  return {
    "data-scene-position": params?.position,
    "data-scene-model": params?.model,
    "data-scene-rotate": params?.rotate,
  };
};

export default getSceneAttributes;
