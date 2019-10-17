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

    Object.keys(uniforms).forEach(key => {
      const value = uniforms[key];
      // The uniform is an array
      if (Array.isArray(value)) {
        if (value.length === 2) {
          // Setting s vec2
          sandbox.current.setUniform(key, value[0], value[1]);
        } else if (value.length === 3) {
          // Setting a vec3
          sandbox.current.setUniform(key, value[0], value[1], value[2]);
        }
      } else {
        // Every other type of single argument uniform just pass through
        sandbox.current.setUniform(key, value);
      }
    });
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
