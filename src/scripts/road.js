import { Renderer } from 'ogl/src/core/Renderer.js';
import { Program } from 'ogl/src/core/Program.js';
import { Mesh } from 'ogl/src/core/Mesh.js';
import { Texture } from 'ogl/src/core/Texture.js';
import { Triangle } from 'ogl/src/extras/Triangle.js';

const vertex = /* glsl */ `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// One road, two lights. Night is rendered as luminance only and then tinted by a
// low-pressure sodium lamp, which has a single wavelength: everything reads amber and
// colorless. "uWake" crossfades that into a full-color dawn and then daylight.
const fragment = /* glsl */ `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform float uDist;
uniform float uWake;
uniform float uHorizon;
uniform float uRumble;
uniform float uWord;
uniform sampler2D uText;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// Anti-aliased stripe centred on c with half-width w, softened by the pixel footprint fp.
float band(float x, float c, float w, float fp) {
  return 1.0 - smoothstep(w - fp, w + fp, abs(x - c));
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uRes;
  float aspect = uRes.x / uRes.y;
  float ax = max(aspect, 1.1);

  // Rumble strip: the car shudders.
  uv.y += uRumble * 0.006 * sin(uTime * 83.0) * sin(uTime * 7.0 + 1.3);

  const float K = 1.5;
  float s = (uv.y - uHorizon) * K;

  float sy = clamp((uv.y - uHorizon) / max(1.0 - uHorizon, 0.001), 0.0, 1.0);
  float dawn = smoothstep(0.05, 0.55, uWake) * (1.0 - smoothstep(0.55, 1.0, uWake));
  vec3 dayTop = vec3(0.56, 0.74, 0.86);
  vec3 dayHz = vec3(0.90, 0.94, 0.95);
  vec3 dawnHz = vec3(1.0, 0.80, 0.60);
  vec3 hzCol = mix(dayHz, dawnHz, dawn);

  float nightL;
  vec3 day;

  if (s < 0.0) {
    float camH = 1.15;
    float z = camH / (-s);
    float px = (uv.x - 0.5) * ax * K * z + 1.0; // camera sits in the right lane
    float fp = ax * K * z / uRes.x * 1.2 + 0.002;
    float zz = z + uDist;

    float onRoad = 1.0 - smoothstep(2.15 - fp, 2.15 + fp, abs(px));
    float edge = band(px, 2.0, 0.07, fp) + band(px, -2.0, 0.07, fp);
    float dash = band(px, 0.0, 0.065, fp) * step(fract(zz / 12.0), 0.34);

    // Rumble strip grooves on the shoulder.
    float groove = band(px, 2.35, 0.14, fp) * step(0.5, fract(zz * 2.2)) * uRumble;

    // Pavement lettering in the right lane, stretched long the way road paint is.
    float per = 96.0;
    float lz = mod(zz, per);
    vec2 t = vec2((px - 1.0) / 1.55 + 0.5, (lz - 26.0) / 11.0);
    // Sample unconditionally (derivatives stay valid across the quad), then mask.
    vec2 tc = clamp(t, 0.0, 1.0);
    float inside = step(0.0, t.x) * step(t.x, 1.0) * step(0.0, t.y) * step(t.y, 1.0);
    float someday = texture2D(uText, vec2(tc.x, 0.5 + tc.y * 0.49)).r;
    float exitOnly = texture2D(uText, vec2(tc.x, 0.01 + tc.y * 0.49)).r;
    float txt = mix(someday, exitOnly, uWord) * inside;
    float paint = clamp(edge + dash + txt * 0.9, 0.0, 1.0);

    // Night light: headlights near, sodium pools every 40 units on the right shoulder.
    float head = exp(-z * 0.11) * (1.0 - smoothstep(0.4, 2.8, abs(px - 1.0)));
    float pz = mod(zz, 40.0) - 20.0;
    float pool = exp(-pz * pz / 42.0) * exp(-pow((px - 2.9) / 2.4, 2.0));
    float light = 0.04 + 0.62 * head + 0.55 * pool;
    float albedo = mix(mix(0.12, 0.22, onRoad), 0.95, paint) + groove * 0.2;
    float fog = 1.0 - exp(-z * 0.028);
    nightL = mix(albedo * light, 0.18, fog);

    vec3 asphalt = vec3(0.29, 0.31, 0.34);
    vec3 verge = vec3(0.45, 0.50, 0.37);
    vec3 g = mix(verge, asphalt, onRoad);
    g = mix(g, vec3(0.96, 0.96, 0.93), paint);
    g -= groove * 0.06;
    day = mix(g, hzCol, fog * 0.92);
  } else {
    nightL = mix(0.2, 0.02, pow(sy, 0.55));
    day = mix(hzCol, dayTop, pow(sy, 0.75));
  }

  vec3 sodium = vec3(0.102, 0.067, 0.031) + nightL * vec3(1.05, 0.62, 0.21) * 1.2;
  vec3 col = mix(sodium, day, smoothstep(0.0, 1.0, uWake));
  col += (hash(frag + fract(uTime) * 91.0) - 0.5) * 0.018;
  gl_FragColor = vec4(col, 1.0);
}
`;

// Two pieces of road paint on one texture: SOMEDAY (top half) and EXIT ONLY (bottom half).
function paintAtlas() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 1024;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const family = '"Overpass Variable", "Overpass", sans-serif';
  const fit = (word, cy, maxH) => {
    let size = 220;
    ctx.font = `800 ${size}px ${family}`;
    const w = ctx.measureText(word).width;
    size = Math.min(size * (c.width * 0.9) / w, maxH);
    ctx.font = `800 ${size}px ${family}`;
    ctx.fillText(word, c.width / 2, cy);
  };
  fit('SOMEDAY', 256, 300);
  fit('ONLY', 512 + 150, 190);
  fit('EXIT', 512 + 370, 190);
  return c;
}

export async function createRoad(canvas, { animate = true } = {}) {
  const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.25 : 1.5);
  const renderer = new Renderer({ canvas, dpr, alpha: false, antialias: false, powerPreference: 'low-power' });
  const gl = renderer.gl;
  if (!gl) throw new Error('no webgl');

  try {
    await document.fonts.load('800 200px "Overpass Variable"');
  } catch {}

  const texture = new Texture(gl, { image: paintAtlas(), generateMipmaps: false, minFilter: gl.LINEAR });

  const uniforms = {
    uRes: { value: [1, 1] },
    uTime: { value: 0 },
    uDist: { value: 0 },
    uWake: { value: 0 },
    uHorizon: { value: 0.4 },
    uRumble: { value: 0 },
    uWord: { value: 0 },
    uText: { value: texture },
  };
  const program = new Program(gl, { vertex, fragment, uniforms });
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.uRes.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
  }
  resize();
  window.addEventListener('resize', resize);

  const state = { wake: 0, horizon: 0.4, rumble: 0, word: 0, speed: 7, boost: 0, arrive: false };
  // Where the car comes to rest at the exit: EXIT ONLY painted a few car lengths ahead.
  const PAINT_PERIOD = 96;
  const PAINT_REST = 22.5;
  let restAt = null;
  let last = performance.now();
  let raf = 0;
  let running = false;

  function draw(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    uniforms.uTime.value += dt;
    if (animate) {
      const d = uniforms.uDist.value;
      if (state.arrive) {
        restAt ??= Math.ceil((d + 30 - PAINT_REST) / PAINT_PERIOD) * PAINT_PERIOD + PAINT_REST;
        uniforms.uDist.value = d + (restAt - d) * Math.min(1, dt * 1.4);
      } else {
        restAt = null;
        uniforms.uDist.value = d + dt * (state.speed + state.boost);
      }
    }
    uniforms.uWake.value = state.wake;
    uniforms.uHorizon.value = state.horizon;
    uniforms.uRumble.value = state.rumble;
    uniforms.uWord.value = state.word;
    renderer.render({ scene: mesh });
  }

  function loop(now) {
    draw(now);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (running || !animate) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  // Reduced motion: a still frame, redrawn only when the state changes.
  function renderOnce() {
    draw(performance.now());
  }

  if (animate) start();
  else {
    uniforms.uDist.value = 18;
    renderOnce();
    window.addEventListener('resize', renderOnce);
  }

  return { state, renderOnce, stop, start };
}
