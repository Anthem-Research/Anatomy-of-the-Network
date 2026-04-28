import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { chapters } from './essay.js';
import './styles.css';

const presets = {
  drift: { attraction: 0.2, memory: 0.25, boundary: 0.12, centralization: 0.08, drift: 0.72, entropy: 0.45 },
  emergence: { attraction: 0.58, memory: 0.72, boundary: 0.5, centralization: 0.1, drift: 0.22, entropy: 0.14 },
  enclosure: { attraction: 0.28, memory: 0.58, boundary: 0.72, centralization: 0.82, drift: 0.08, entropy: 0.1 },
  capture: { attraction: 0.2, memory: 0.46, boundary: 0.68, centralization: 0.9, drift: 0.06, entropy: 0.12 },
  memory: { attraction: 0.5, memory: 0.95, boundary: 0.38, centralization: 0.06, drift: 0.18, entropy: 0.04 },
  feedback: { attraction: 0.6, memory: 0.78, boundary: 0.46, centralization: 0.16, drift: 0.26, entropy: 0.18 },
  modular: { attraction: 0.5, memory: 0.7, boundary: 0.62, centralization: 0.04, drift: 0.18, entropy: 0.12 },
  adaptive: { attraction: 0.55, memory: 0.68, boundary: 0.42, centralization: 0.12, drift: 0.34, entropy: 0.22 },
  bundle: { attraction: 0.34, memory: 0.58, boundary: 0.82, centralization: 0.76, drift: 0.05, entropy: 0.08 },
  legibility: { attraction: 0.18, memory: 0.54, boundary: 0.78, centralization: 0.72, drift: 0.02, entropy: 0.04 },
  fusion: { attraction: 0.32, memory: 0.62, boundary: 0.9, centralization: 0.88, drift: 0.04, entropy: 0.04 },
  chokepoint: { attraction: 0.22, memory: 0.5, boundary: 0.72, centralization: 0.7, drift: 0.06, entropy: 0.18 },
  lockin: { attraction: 0.16, memory: 0.74, boundary: 0.88, centralization: 0.84, drift: 0.01, entropy: 0.04 },
  threshold: { attraction: 0.7, memory: 0.76, boundary: 0.6, centralization: 0.08, drift: 0.15, entropy: 0.1 },
  function: { attraction: 0.68, memory: 0.86, boundary: 0.58, centralization: 0.18, drift: 0.1, entropy: 0.08 },
  embodiment: { attraction: 0.56, memory: 0.82, boundary: 0.78, centralization: 0.14, drift: 0.06, entropy: 0.06 },
  attractor: { attraction: 0.5, memory: 0.68, boundary: 0.55, centralization: 0.45, drift: 0.24, entropy: 0.2 },
  entropy: { attraction: 0.3, memory: 0.28, boundary: 0.22, centralization: 0.14, drift: 0.68, entropy: 0.86 },
  boundary: { attraction: 0.55, memory: 0.72, boundary: 0.86, centralization: 0.08, drift: 0.08, entropy: 0.08 },
  coevolution: { attraction: 0.48, memory: 0.62, boundary: 0.5, centralization: 0.4, drift: 0.28, entropy: 0.2 },
  rupture: { attraction: 0.7, memory: 0.45, boundary: 0.12, centralization: 0.18, drift: 0.76, entropy: 0.58 },
  finale: { attraction: 0.55, memory: 0.74, boundary: 0.55, centralization: 0.28, drift: 0.16, entropy: 0.12 }
};

const initialPreset = presets.capture;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function mix(a, b, t) {
  return a + (b - a) * t;
}

function makePoints(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.002,
    vy: (Math.random() - 0.5) * 0.002,
    phase: Math.random() * Math.PI * 2
  }));
}

function Field({ target, section, pulse }) {
  const canvasRef = useRef(null);
  const pointsRef = useRef(makePoints(112));
  const memoryRef = useRef([]);
  const settingsRef = useRef(initialPreset);
  const frameRef = useRef(0);

  useEffect(() => {
    settingsRef.current = { ...settingsRef.current, ...target };
  }, [target]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      frameRef.current += 1;
      const t = frameRef.current;
      const targetSettings = { ...target };
      const s = settingsRef.current;
      for (const key of Object.keys(targetSettings)) s[key] = mix(s[key], targetSettings[key], 0.025);

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#f3efe5';
      ctx.fillRect(0, 0, w, h);

      const pts = pointsRef.current;
      const center = { x: 0.52 + Math.sin(t * 0.002) * 0.02, y: 0.48 };
      const attractors = [
        { x: 0.32, y: 0.34 },
        { x: 0.68, y: 0.36 },
        { x: 0.38, y: 0.7 },
        { x: 0.66, y: 0.68 }
      ];

      for (const p of pts) {
        const targetA = attractors[p.id % attractors.length];
        const toLocalX = targetA.x - p.x;
        const toLocalY = targetA.y - p.y;
        const toCenterX = center.x - p.x;
        const toCenterY = center.y - p.y;
        p.vx += toLocalX * s.attraction * 0.00034;
        p.vy += toLocalY * s.attraction * 0.00034;
        p.vx += toCenterX * s.centralization * 0.00098;
        p.vy += toCenterY * s.centralization * 0.00098;
        p.vx += Math.sin(t * 0.01 + p.phase) * s.drift * 0.00022;
        p.vy += Math.cos(t * 0.008 + p.phase) * s.drift * 0.00022;
        p.vx *= 0.985 - s.entropy * 0.014;
        p.vy *= 0.985 - s.entropy * 0.014;
        p.x = clamp(p.x + p.vx, 0.05, 0.95);
        p.y = clamp(p.y + p.vy, 0.06, 0.94);
      }

      const linkThreshold = 0.105 + s.boundary * 0.065;
      const links = [];
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkThreshold && (a.id + b.id + t) % 5 === 0) links.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, life: s.memory });
        }
      }
      memoryRef.current.push(...links.slice(0, 18));
      memoryRef.current = memoryRef.current
        .map((m) => ({ ...m, life: m.life - (0.002 + s.entropy * 0.0048) }))
        .filter((m) => m.life > 0)
        .slice(-980);

      for (const m of memoryRef.current) {
        ctx.strokeStyle = `rgba(24,23,20,${clamp(m.life * 0.36, 0, 0.28)})`;
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(m.ax * w, m.ay * h);
        ctx.lineTo(m.bx * w, m.by * h);
        ctx.stroke();
      }

      if (s.boundary > 0.16) {
        attractors.forEach((a, i) => {
          ctx.strokeStyle = `rgba(24,23,20,${0.045 + s.boundary * 0.16})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(a.x * w, a.y * h, 42 + s.boundary * 68, 30 + s.boundary * 48, Math.sin(t * 0.003 + i) * 0.6, 0, Math.PI * 2);
          ctx.stroke();
        });
      }

      if (s.centralization > 0.12) {
        const r = 68 + s.centralization * 185;
        ctx.strokeStyle = `rgba(116,37,27,${0.08 + s.centralization * 0.25})`;
        ctx.lineWidth = 1.1 + s.centralization * 1.8;
        ctx.beginPath();
        ctx.ellipse(center.x * w, center.y * h, r, r * 0.78, 0.18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(center.x * w, center.y * h, 3 + s.centralization * 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(116,37,27,${0.16 + s.centralization * 0.34})`;
        ctx.fill();
      }

      if (pulse && t - pulse.frame < 130) {
        const age = (t - pulse.frame) / 130;
        const alpha = (1 - age) * 0.38;
        ctx.strokeStyle = `rgba(116,37,27,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.5, 28 + age * Math.min(w, h) * 0.38, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, 1.25 + s.memory * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(24,23,20,0.72)';
        ctx.fill();
      }

      ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.fillStyle = 'rgba(24,23,20,0.46)';
      const label = s.centralization > 0.58 ? 'enclosure' : s.boundary > 0.48 && s.memory > 0.5 ? 'bounded emergence' : 'drift';
      ctx.fillText(label, 22, h - 24);
      ctx.fillText(`chapter ${String(section + 1).padStart(2, '0')}`, w - 104, h - 24);

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [target, section, pulse]);

  return <canvas className="field-canvas" ref={canvasRef} aria-label="interactive field" />;
}

function renderText(text, triggers, triggerEffect) {
  let parts = [{ text, active: false, effect: null }];
  for (const trigger of triggers) {
    const next = [];
    for (const part of parts) {
      if (part.active || !part.text.includes(trigger.phrase)) {
        next.push(part);
        continue;
      }
      const [before, ...rest] = part.text.split(trigger.phrase);
      if (before) next.push({ text: before, active: false, effect: null });
      next.push({ text: trigger.phrase, active: true, effect: trigger.effect });
      if (rest.join(trigger.phrase)) next.push({ text: rest.join(trigger.phrase), active: false, effect: null });
    }
    parts = next;
  }
  return parts.map((part, i) => part.active ? (
    <button className="text-trigger" key={i} type="button" onClick={() => triggerEffect(part.effect)}>{part.text}</button>
  ) : <React.Fragment key={i}>{part.text}</React.Fragment>);
}

function App() {
  const [section, setSection] = useState(0);
  const [effect, setEffect] = useState(chapters[0].effect);
  const [pulse, setPulse] = useState(null);
  const articleRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number(visible.target.dataset.index);
      setSection(index);
      setEffect(chapters[index].effect);
    }, { threshold: [0.25, 0.45, 0.65], rootMargin: '-12% 0px -30% 0px' });
    articleRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const target = useMemo(() => presets[effect] || initialPreset, [effect]);
  const triggerEffect = (name) => {
    setEffect(name);
    setPulse({ frame: 0, name, stamp: Date.now() });
    setTimeout(() => setEffect(chapters[section]?.effect || 'emergence'), 2400);
  };
  const pulseForField = pulse ? { ...pulse, frame: 1 } : null;

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Anthem Research</p>
        <h1>Anatomy of the Network</h1>
        <p className="thesis">The state is imposed simplification. The network is bounded emergence.</p>
        <a href="#reading" className="enter">enter the field</a>
      </section>

      <section id="reading" className="reading-layout">
        <aside className="sticky-field">
          <Field target={target} section={section} pulse={pulseForField} />
          <div className="field-caption">
            <span>{effect}</span>
            <span>tap marked phrases to perturb the field</span>
          </div>
        </aside>

        <section className="chapters interactive-chapters">
          {chapters.map((chapter, chapterIndex) => (
            <article
              className="chapter"
              key={chapter.title}
              data-index={chapterIndex}
              ref={(node) => { articleRefs.current[chapterIndex] = node; }}
            >
              <p className="kicker">{chapter.kicker}</p>
              <h2>{chapter.title}</h2>
              <div className="chapter-body">
                {chapter.body.map((paragraph, paragraphIndex) => (
                  <p key={`${chapter.title}-${paragraphIndex}`} onClick={() => triggerEffect(chapter.effect)}>
                    {renderText(paragraph, chapter.triggers, triggerEffect)}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>
      </section>

      <footer>
        <p>The state encloses first and legitimates later. The network associates first and seeks form later.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
