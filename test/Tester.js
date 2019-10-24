import React, { useState } from "react";

import ShaderCanvas from "../src/index";

const Tester = () => {
  // const shader = `
  //   precision mediump float;
  //   uniform vec3 u_color;
  //   void main() {
  //     gl_FragColor = vec4(u_color, 1);
  //   }
  // `;

  const [shader, setShader] = useState(`
    precision mediump float;
    uniform vec3 u_color;
    void main() {
      gl_FragColor = vec4(u_color, 1);
    }
  `);

  const [uniforms, setUniforms] = useState({
    u_color: [1, 0, 0]
  });

  const [width, setWidth] = useState(320);
  const [height, setHeight] = useState(240);

  window.setShader = setShader;
  window.setUniforms = setUniforms;
  window.setWidth = setWidth;
  window.setHeight = setHeight;

  return (
    <ShaderCanvas
      width={width}
      height={height}
      fragShader={shader}
      uniforms={uniforms}
    />
  );
};

export default Tester;
