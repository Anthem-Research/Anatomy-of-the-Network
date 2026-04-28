import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const chapters = [
  {
    kicker: 'Prelude',
    title: 'The state mistakes monopoly for necessity.',
    body: `The state was once able to present itself as the necessary container of human order because large-scale coordination had few rivals. Memory required archives. Law required courts. Identity required documents. Capital required banks. Work required place. Security required territorial force. The network attacks that necessity.`
  },
  {
    kicker: 'I',
    title: 'What the Network Is Not',
    body: `The network is not the platform, the feed, the interface, or a stream of signals. A million persons may be technically connected without having formed any durable social body. The network begins only where relation gains continuity, where continuity gains trust, and where trust begins to carry memory and function.`
  },
  {
    kicker: 'II',
    title: 'What the Network Is',
    body: `The network is a structure of chosen association through which persons coordinate life, preserve memory, allocate resources, build institutions, and accumulate common capacity across and prior to territory. It is not disorder. It is bounded emergence.`
  },
  {
    kicker: 'III',
    title: 'What the State Is',
    body: `The state begins not with relation, but with capture. It defines a territory, binds a population to it, reserves final authority over law and force, and enters those born under it into documents, classifications, permissions, taxes, and obligations. It simplifies from above.`
  },
  {
    kicker: 'IV',
    title: 'How the State Preserves Itself',
    body: `The state preserves itself by ensuring that association remains secondary. It appropriates the language of peoplehood, occupies the points at which life becomes official, and turns novelty into category, category into compliance, and compliance into retention.`
  },
  {
    kicker: 'V',
    title: 'How the Network Grows',
    body: `The network grows where association recovers function. Below a certain density of trust, memory, and contribution, there is only atmosphere. Once these elements reinforce one another, a different structure appears. A crowd becomes a network. A network becomes an association. An association may become an institution.`
  },
  {
    kicker: 'VI',
    title: 'What the State Fears',
    body: `The state does not fear criticism most. It fears association that becomes operational. It fears the discovery that common life can be built rather than merely inherited through subjection. It fears a rival attractor.`
  },
  {
    kicker: 'VII',
    title: 'What the Network Cannot Yet Solve',
    body: `Emergence is not magic. It depends on boundary conditions. A network with no boundary remains a crowd. A network with no memory cannot learn. A network with no exit becomes another enclosure. A network with no maintenance decays.`
  },
  {
    kicker: 'VIII',
    title: 'Enclosure and Association',
    body: `The state is a system of imposed simplification. The network is a system of bounded emergence. The state encloses first and legitimates later. The network associates first and seeks form later.`
  }
];

const defaults = {
  attraction: 0.48,
  memory: 0.56,
  boundary: 0.42,
  centralization: 0.18,
  drift: 0.28,
  entropy: 0.24
};

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function makePoints(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.002,
    vy: (Math.random() - 0.5) * 0.002,
    home: Math.random() > 0.52 ? 1 : 0,
    phase: Math.random() * Math.PI * 2
  }));
}

function Field({ settings, section }) {
  const canvasRef = useRef(null);
  const pointsRef = useRef(makePoints(92));
  const memoryRef = useRef([]);
  const frameRef = useRef(0);

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

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#f3efe5';
      ctx.fillRect(0, 0, w, h);

      const pts = pointsRef.current;
      const center = { x: 0.52, y: 0.48 };
      const attractors = [
        { x: 0.36, y: 0.38 },
        { x: 0.64, y: 0.58 },
        { x: 0.49, y: 0.72 }
      ];

      for (const p of pts) {
        const target = attractors[p.id % attractors.length];
        const toLocalX = target.x - p.x;
        const toLocalY = target.y - p.y;
        const toCenterX = center.x - p.x;
        const toCenterY = center.y - p.y;

        p.vx += toLocalX * settings.attraction * 0.00035;
        p.vy += toLocalY * settings.attraction * 0.00035;
        p.vx += toCenterX * settings.centralization * 0.00085;
        p.vy += toCenterY * settings.centralization * 0.00085;
        p.vx += Math.sin(frameRef.current * 0.008 + p.phase) * settings.drift * 0.00018;
        p.vy += Math.cos(frameRef.current * 0.007 + p.phase) * settings.drift * 0.00018;
        p.vx *= 0.986 - settings.entropy * 0.012;
        p.vy *= 0.986 - settings.entropy * 0.012;
        p.x = clamp(p.x + p.vx, 0.06, 0.94);
        p.y = clamp(p.y + p.vy, 0.08, 0.92);
      }

      const linkThreshold = 0.115 + settings.boundary * 0.05;
      const newLinks = [];
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkThreshold && (a.id + b.id + frameRef.current) % 4 === 0) {
            newLinks.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, life: settings.memory });
          }
        }
      }
      memoryRef.current.push(...newLinks.slice(0, 16));
      memoryRef.current = memoryRef.current
        .map((m) => ({ ...m, life: m.life - (0.0025 + settings.entropy * 0.004) }))
        .filter((m) => m.life > 0)
        .slice(-720);

      ctx.lineWidth = 0.75;
      for (const m of memoryRef.current) {
        ctx.strokeStyle = `rgba(24, 23, 20, ${clamp(m.life * 0.34, 0, 0.24)})`;
        ctx.beginPath();
        ctx.moveTo(m.ax * w, m.ay * h);
        ctx.lineTo(m.bx * w, m.by * h);
        ctx.stroke();
      }

      if (settings.boundary > 0.24) {
        ctx.strokeStyle = `rgba(24, 23, 20, ${0.08 + settings.boundary * 0.18})`;
        ctx.lineWidth = 1.1;
        for (const a of attractors) {
          ctx.beginPath();
          const radius = 52 + settings.boundary * 56 - settings.entropy * 22;
          ctx.ellipse(a.x * w, a.y * h, radius, radius * 0.72, Math.sin(frameRef.current * 0.003 + a.x) * 0.45, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (settings.centralization > 0.18) {
        const r = 95 + settings.centralization * 145;
        ctx.strokeStyle = `rgba(130, 36, 28, ${0.08 + settings.centralization * 0.24})`;
        ctx.lineWidth = 1.2 + settings.centralization * 1.3;
        ctx.beginPath();
        ctx.ellipse(center.x * w, center.y * h, r, r * 0.8, 0.15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(center.x * w, center.y * h, 3.4 + settings.centralization * 7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(130, 36, 28, ${0.18 + settings.centralization * 0.28})`;
        ctx.fill();
      }

      for (const p of pts) {
        const size = 1.5 + settings.memory * 1.5;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(24, 23, 20, 0.72)';
        ctx.fill();
      }

      ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.fillStyle = 'rgba(24, 23, 20, 0.46)';
      const label = settings.centralization > 0.55 ? 'enclosure' : settings.boundary > 0.55 && settings.memory > 0.5 ? 'bounded emergence' : 'drift';
      ctx.fillText(label, 22, h - 24);
      ctx.fillText(`chapter ${String(section + 1).padStart(2, '0')}`, w - 104, h - 24);

      raf = window.requestAnimationFrame(draw);
    }

    draw();
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [settings, section]);

  return <canvas className="field-canvas" ref={canvasRef} aria-label="Interactive abstract field simulation" />;
}

function Slider({ label, value, onChange }) {
  return (
    <label className="control">
      <span>{label}</span>
      <input type="range" min="0" max="1" step="0.01" value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

function App() {
  const [settings, setSettings] = useState(defaults);
  const [section, setSection] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const progress = doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight);
      setSection(clamp(Math.floor(progress * chapters.length), 0, chapters.length - 1));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const mode = useMemo(() => {
    if (settings.centralization > 0.62 && settings.boundary > 0.45) return 'enclosure';
    if (settings.memory > 0.52 && settings.boundary > 0.42 && settings.attraction > 0.36) return 'bounded emergence';
    return 'drift';
  }, [settings]);

  const update = (key) => (value) => setSettings((s) => ({ ...s, [key]: value }));

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Anthem Research</p>
        <h1>Anatomy of the Network</h1>
        <p className="thesis">The state is imposed simplification. The network is bounded emergence.</p>
        <a href="#instrument" className="enter">enter the field</a>
      </section>

      <section id="instrument" className="instrument">
        <div className="visual-panel">
          <Field settings={settings} section={section} />
        </div>
        <aside className="control-panel">
          <div className="mode">{mode}</div>
          <Slider label="attraction" value={settings.attraction} onChange={update('attraction')} />
          <Slider label="memory" value={settings.memory} onChange={update('memory')} />
          <Slider label="boundary" value={settings.boundary} onChange={update('boundary')} />
          <Slider label="centralization" value={settings.centralization} onChange={update('centralization')} />
          <Slider label="drift" value={settings.drift} onChange={update('drift')} />
          <Slider label="entropy" value={settings.entropy} onChange={update('entropy')} />
          <button type="button" onClick={() => setSettings(defaults)}>reset</button>
        </aside>
      </section>

      <section className="chapters">
        {chapters.map((chapter) => (
          <article className="chapter" key={chapter.title}>
            <p className="kicker">{chapter.kicker}</p>
            <h2>{chapter.title}</h2>
            <p>{chapter.body}</p>
          </article>
        ))}
      </section>

      <footer>
        <p>The state encloses first and legitimates later. The network associates first and seeks form later.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
