export const getDevicePixelRatio = () => {
  if (typeof document === "undefined") return 1;
  return devicePixelRatio || 1;
};

export const isWebGlSupported = () => {
  if (typeof document === "undefined") return false;
  return !!document.createElement("canvas").getContext("webgl");
};
