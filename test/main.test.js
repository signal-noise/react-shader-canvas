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
});
