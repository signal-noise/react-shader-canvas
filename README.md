# shader-canvas

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

A react functional component to display a simple WebGL shader.

## Introduction

Sometimes you want a simple way of displaying a WebGL Shader within your React project without a large 3D library like three.js, Alfrid or Babylon.js. This component does exactly that! You can easily specify the size, shaders and optional uniforms to pass into the shader.

This project is essentially a wrapper around [glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas/) that allows it to be used within your React projects. Please check out their documentation to see whats happening under the hood.

## Installation

Install this package with `npm`.

```bash
npm i @signal-noise/shader-canvas
```

## Usage

Here is the most minimal example...

```JSX
import React from 'react';
import ShaderCanvas from "@signal-noise/shader-canvas";

import fragShader from "./solid_red.frag";

const FunkyView = () => {
  const shader = `
    precision mediump float;
    uniform vec4 uColor;
    void main() {
      gl_FragColor = vec4(1, 0, 0, 1);
    }
  `;

  return (
    <ShaderCanvas
      width={320}
      height={240}
      fragShader={shader}
    />
  );
};
```

You can optionally pass in a vertex shader, uniforms and a supersample value.

```JSX
import React from 'react';
import ShaderCanvas from "@signal-noise/shader-canvas";

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

[npm-image]: https://img.shields.io/npm/v/@signal-noise/shader-canvas.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@signal-noise/shader-canvas
[npm-downloads-image]: https://img.shields.io/npm/dm/@signal-noise/shader-canvas.svg
[npm-downloads-url]: https://npmcharts.com/compare/@signal-noise/shader-canvas?minimal=true
[ci-image]: https://github.com/signal-noise/shader-canvas/workflows/node-ci/badge.svg
[ci-url]: https://github.com/signal-noise/shader-canvas/actions
