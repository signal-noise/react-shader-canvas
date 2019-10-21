# react-shader-canvas

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

A react component to display and control a WebGL shader.

## Introduction

Sometimes you want a simple way of displaying a WebGL Shader within your React project without a large 3D library like three.js, Alfrid or Babylon.js. This component does exactly that! You can easily specify the size, shaders and optional [uniforms](https://jameshfisher.com/2017/10/03/webgl-fragment-shader-uniform/) to pass into the shader.

This project is essentially a wrapper around [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas/) that allows it to be used within your React projects. Please check out their documentation to see whats happening under the hood.

## Installation

Install this package with `npm`.

```bash
npm i @signal-noise/react-shader-canvas
```

## Usage

Here is the most minimal example...

```JSX
import React from 'react';
import ShaderCanvas from "@signal-noise/react-shader-canvas";

const shader = `
    precision mediump float;
    uniform vec4 uColor;
    void main() {
      gl_FragColor = vec4(1, 0, 0, 1);
    }
  `;

const RedView = () => (
  <ShaderCanvas width={320} height={240} fragShader={shader} />
);

```

You can optionally pass in a vertex shader, uniforms and a supersample value.

```JSX
import React from 'react';
import ShaderCanvas from "@signal-noise/react-shader-canvas";

// Using the webpack loader "shader-loader"
import fragShader from "./noise.frag";
import vertShader from "./noise.vert";

const FunkyView = () => {

  // Uniforms to pass into the shader
  const uniforms = {
    u_color_bg: [11, 12, 33],
    u_color_noise: [205, 255, 0],
    u_noise_amount: 0.5
  };

  return (
    <ShaderCanvas
      width={640}
      height={480}
      fragShader={fragShader}
      vertShader={vertShader}
      uniforms={uniforms}
      superSample={2} // Render twice the display resolution
    />
  );
};
```

## API

- `width` : Required - Number - The width in pixels.
- `height` : Required - Number - The height in pixels.
- `fragShader` : Required - String - The fragment shader to use.
- `vertShader` : Optional - String - The vertex shader to use.
- `uniforms` : Optional - Object - An object containing vec2, vec3 and float key value pairs.
- `superSample` : Optional - Number - A value to supersample by, creating a smoother image.

## Notes

### Super Sampling

You have the option of super sampling as a method to antialias the final output. A value of `2` is generally a good idea. This quadruples the processing requirements.

### Retina

The rendered output matches the devices pixel density automatically.

### Mouse

A vec2 uniform `u_mouse` is passed into the shader.

[npm-image]: https://img.shields.io/npm/v/@signal-noise/react-shader-canvas.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@signal-noise/react-shader-canvas
[npm-downloads-image]: https://img.shields.io/npm/dm/@signal-noise/react-shader-canvas.svg
[npm-downloads-url]: https://npmcharts.com/compare/@signal-noise/react-shader-canvas?minimal=true
[ci-image]: https://github.com/signal-noise/react-shader-canvas/workflows/node-ci/badge.svg
[ci-url]: https://github.com/signal-noise/react-shader-canvas/actions
