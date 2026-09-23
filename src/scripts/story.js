import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (a, b, v) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a, b, t) => a + (b - a) * t;

export function initStory(road) {
  const lenis = new Lenis({ lerp: 0.1, anchors: { offset: 0 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const $ = (sel) => document.querySelector(sel);
  const autopilot = $('.autopilot');
  const lines = $('.autopilot-lines');
  const mile = $('.mile-num');
  const wake = $('.wake');
  const jolt = $('.wake-jolt');
  const letter = $('.letter');

  /* Autopilot: the same day passes like lane dashes, and the mile marker keeps counting. */
  gsap.to(lines, {
    y: () => -(lines.scrollHeight - window.innerHeight * 0.45),
    ease: 'none',
    scrollTrigger: {
      trigger: autopilot,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        mile.textContent = String(212 + Math.floor(self.progress * 17));
      },
    },
  });

  /* Wake: the rumble strip, the jolt, then daylight and the problem named. */
  const wakeSplit = SplitText.create('.wake-title', { type: 'lines', mask: 'lines' });
  gsap
    .timeline({
      scrollTrigger: { trigger: wake, start: 'top top', end: 'bottom bottom', scrub: 0.5 },
    })
    .to(jolt, { autoAlpha: 0, filter: 'blur(10px)', scale: 0.97, duration: 0.18, ease: 'power1.in' }, 0.3)
    .from(wakeSplit.lines, { yPercent: 110, duration: 0.2, stagger: 0.05, ease: 'power3.out' }, 0.6)
    .from('.wake-body', { autoAlpha: 0, y: 28, duration: 0.18, ease: 'power2.out' }, 0.74)
    .to({}, { duration: 0.08 });

  /* Cost: the heading surfaces line by line; the missed moments follow as a list. */
  SplitText.create('.cost-title', {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.lines, {
        yPercent: 110,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.09,
        scrollTrigger: { trigger: '.cost-title', start: 'top 80%', once: true },
      }),
  });
  gsap.from('.cost-list li', {
    autoAlpha: 0,
    x: 36,
    duration: 0.7,
    ease: 'expo.out',
    stagger: 0.12,
    scrollTrigger: { trigger: '.cost-list', start: 'top 85%', once: true },
  });

  /* Story: fifteen mile markers go by as the section passes. */
  const markers = $('.markers');
  gsap.fromTo(
    markers,
    { x: () => window.innerWidth * 0.4 },
    {
      x: () => -(markers.scrollWidth - window.innerWidth * 0.6),
      ease: 'none',
      scrollTrigger: {
        trigger: '.story',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );

  /* The exit sign approaches: it grows toward you as you close the distance. */
  gsap.fromTo(
    '.sign',
    { scale: 0.82, yPercent: 6, transformOrigin: '50% 100%' },
    {
      scale: 1,
      yPercent: 0,
      ease: 'none',
      scrollTrigger: { trigger: letter, start: 'top bottom', end: 'bottom bottom', scrub: true },
    },
  );

  if (!road) return;

  /* The road follows the whole scroll story from one set of measurements. */
  let m = null;
  const measure = () => {
    const box = (el) => {
      const r = el.getBoundingClientRect();
      return { top: r.top + window.scrollY, h: r.height };
    };
    m = { wake: box(wake), letter: box(letter), vh: window.innerHeight };
  };
  ScrollTrigger.addEventListener('refresh', measure);
  measure();

  const nightHorizon = () => (window.innerWidth < 760 ? 0.34 : 0.4);
  const dayHorizon = -0.02;
  const s = road.state;
  let shaking = false;

  gsap.ticker.add(() => {
    const y = lenis.scroll;
    const { vh } = m;
    const pw = clamp01((y - m.wake.top) / Math.max(1, m.wake.h - vh));
    const pl = clamp01((y - (m.letter.top - vh)) / vh);

    const rumble = pw > 0 && pw < 0.24 ? Math.sin((pw / 0.24) * Math.PI) : 0;
    s.rumble = rumble;
    s.wake = smooth(0.24, 0.62, pw);
    s.horizon = lerp(lerp(nightHorizon(), dayHorizon, smooth(0.36, 0.82, pw)), 0.36, smooth(0.1, 0.9, pl));
    s.word = pl > 0.2 ? 1 : 0;
    s.arrive = pl > 0.6;
    s.speed = lerp(7, 3.5, s.wake);
    s.boost = Math.min(Math.abs(lenis.velocity) * 0.5, 30);

    if (rumble > 0) {
      gsap.set(jolt, { x: (Math.random() - 0.5) * 8 * rumble, y: (Math.random() - 0.5) * 4 * rumble });
      shaking = true;
    } else if (shaking) {
      gsap.set(jolt, { x: 0, y: 0 });
      shaking = false;
    }
  });
}
