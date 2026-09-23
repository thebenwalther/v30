const root = document.documentElement;
const motion = root.classList.contains('motion');
const canvas = document.querySelector('.road');

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

async function boot() {
  let road = null;
  if (canvas && hasWebGL()) {
    root.classList.add('gl');
    try {
      const { createRoad } = await import('./road.js');
      road = await createRoad(canvas, { animate: motion });
      requestAnimationFrame(() => root.classList.add('road-ready'));
    } catch {
      root.classList.remove('gl');
      road = null;
    }
  }
  if (motion) {
    const { initStory } = await import('./story.js');
    initStory(road);
  }
}

boot();
