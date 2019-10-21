import glslCanvas from "glslCanvas";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

import { getDevicePixelRatio, isWebGlSupported } from "./utils";

const webGlSupported = isWebGlSupported();

const ShaderCanvas = ({
  width,
  height,
  fragShader,
  vertShader,
  uniforms,
  superSample,
  ...props
}) => {
  const canvas = useRef();
  const sandbox = useRef();

  // Spawn the glsl canvas
  useEffect(() => {
    if (!webGlSupported && glslCanvas) return;
    sandbox.current = new glslCanvas(canvas.current);
  }, []);

  // Load the shader if it changes
  useEffect(() => {
    if (!webGlSupported && glslCanvas) return;
    sandbox.current.load(fragShader, vertShader);
  }, [fragShader, vertShader]);

  //Set the uniforms if the shader or uniforms change
  useEffect(() => {
    if (!webGlSupported && glslCanvas) return;

    // Set the pixel size based on supersample
    sandbox.current.realToCSSPixels =
      (window.devicePixelRatio || 1) * superSample;

    if (!uniforms) return;
    sandbox.current.setUniforms(uniforms);
  }, [fragShader, vertShader, uniforms, superSample]);

  // Scale canvas for retina
  const pixelDensity = getDevicePixelRatio();

  return (
    <canvas
      {...props}
      ref={canvas}
      width={width * pixelDensity * superSample}
      height={height * pixelDensity * superSample}
      style={{
        width: `${width}px`,
        height: `${height}px`
      }}
    />
  );
};

ShaderCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fragShader: PropTypes.string.isRequired,
  vertShader: PropTypes.string,
  uniforms: PropTypes.object,
  superSample: PropTypes.number
};

ShaderCanvas.defaultProps = {
  superSample: 1
};

export default ShaderCanvas;
