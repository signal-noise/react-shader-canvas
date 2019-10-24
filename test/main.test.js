const { toMatchImageSnapshot } = require("jest-image-snapshot");

expect.extend({ toMatchImageSnapshot });

describe("displays react-shader-canvas", () => {
  beforeAll(async () => {
    await page.goto(PATH, { waitUntil: "load" }); // eslint-disable-line
  });

  it("WebGL Shader should render red square", async () => {
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });

  it("can update uniforms", async () => {
    await page.evaluate(() => window.setUniforms({ u_color: [0, 1, 0] }));
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });

  it("can have width changed", async () => {
    await page.evaluate(() => window.setWidth(160));
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });

  it("can have height changed", async () => {
    await page.evaluate(() => window.setHeight(120));
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });

  it("can have shader changed", async () => {
    await page.evaluate(() => {
      window.setShader(`
        precision mediump float;
        void main() {
          gl_FragColor = vec4(0, 0, 1, 1);
        }
      `);
    });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });

  it("can super sample", async () => {
    await page.evaluate(() => {
      window.setShader(`
        precision mediump float;
        uniform vec2 u_resolution;
        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          vec3 u_color_1 = vec3(1.0, 0.0, 0.0);
          vec3 u_color_2 = vec3(0.0, 1.0, 0.0);
          vec3 color= mix(u_color_1, u_color_2, step(uv.x+uv.y, 0.5));
          gl_FragColor = vec4(color, 1);
        }
      `);
    });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();

    await page.evaluate(() => {
      window.setSuperSample(2);
    });
    const image2 = await page.screenshot();
    expect(image2).toMatchImageSnapshot();
  });
});
