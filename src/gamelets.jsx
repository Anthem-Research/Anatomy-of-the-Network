import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { chapters } from './essay.js';
import './gamelets.css';

const W = 640;
const H = 360;
const clusterCenters = [
  [190, 130],
  [440, 125],
  [230, 250],
  [470, 245]
];

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function nodes(count = 36) {
  return Array.from({ length: count }, (_, index) => {
    const group = index % clusterCenters.length;
    const [cx, cy] = clusterCenters[group];
    const angle = index * 2.399963;
    const radius = 18 + ((index * 17) % 44);
    return {
      id: index,
      group,
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius
    };
  });
}

function InstrumentFrame({ title, label, children, verdict }) {
  return (
    <section className="instrument-frame">
      <div className="instrument-head">
        <p>{label}</p>
        <h3>{title}</h3>
      </div>
      <div className="instrument-body">{children}</div>
      <p className="instrument-verdict">{verdict}</p>
    </section>
  );
}

function Slider({ label, value, onChange }) {
  return (
    <label className="game-slider">
      <span>{label}</span>
      <input type="range" min="0" max="1" step="0.01" value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function Toggle({ active, children, onClick }) {
  return (
    <button type="button" className={active ? 'pill active' : 'pill'} onClick={onClick}>{children}</button>
  );
}

function BaseSvg({ children }) {
  return <svg className="game-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="interactive systems diagram">{children}</svg>;
}

function CoordinationMachine() {
  const [center, setCenter] = useState(0.65);
  const [relation, setRelation] = useState(0.3);
  const [memory, setMemory] = useState(0.25);
  const pts = useMemo(() => nodes(34), []);
  const verdict = center > 0.7 ? 'coordination collapses into a center' : relation + memory > 1.1 ? 'distributed coherence appears' : 'weak order remains atmospheric';
  return (
    <InstrumentFrame title="Coordination Machine" label="instrument 00" verdict={verdict}>
      <BaseSvg>
        <circle className="red-line" cx="320" cy="180" r={38 + center * 82} opacity={0.15 + center * 0.35} />
        {pts.map((p) => {
          const x = p.x * (1 - center * 0.35) + 320 * center * 0.35;
          const y = p.y * (1 - center * 0.35) + 180 * center * 0.35;
          return <line key={`c-${p.id}`} className="red-line faint" x1={x} y1={y} x2="320" y2="180" opacity={center * 0.35} />;
        })}
        {pts.map((p, i) => pts.slice(i + 1).map((q) => p.group === q.group && (p.id + q.id) % 6 === 0 ? (
          <line key={`${p.id}-${q.id}`} className="ink-line" x1={p.x} y1={p.y} x2={q.x} y2={q.y} opacity={relation * memory * 0.55} />
        ) : null))}
        {pts.map((p) => <circle key={p.id} className="ink-dot" cx={p.x * (1 - center * 0.35) + 320 * center * 0.35} cy={p.y * (1 - center * 0.35) + 180 * center * 0.35} r="3" />)}
      </BaseSvg>
      <div className="instrument-controls">
        <Slider label="central pull" value={center} onChange={setCenter} />
        <Slider label="local relation" value={relation} onChange={setRelation} />
        <Slider label="memory" value={memory} onChange={setMemory} />
      </div>
    </InstrumentFrame>
  );
}

function ConnectionInstrument() {
  const [state, setState] = useState({ connection: true, attention: false, memory: false, trust: false, boundary: false, function: false });
  const pts = useMemo(() => nodes(42), []);
  const score = Number(state.memory) + Number(state.trust) + Number(state.boundary) + Number(state.function);
  const verdict = score >= 4 ? 'association has become durable' : state.memory && state.trust ? 'a weak network is forming' : state.attention ? 'a public forms and dissolves' : state.connection ? 'connection is still not association' : 'noise';
  const toggle = (key) => setState((s) => ({ ...s, [key]: !s[key] }));
  return (
    <InstrumentFrame title="Connection Is Not Association" label="instrument 01" verdict={verdict}>
      <BaseSvg>
        {state.attention && <circle className="red-line" cx="320" cy="180" r="46" opacity="0.4" />}
        {state.boundary && clusterCenters.map(([cx, cy], i) => <ellipse key={i} className="ink-line" cx={cx} cy={cy} rx="86" ry="62" opacity="0.35" />)}
        {state.connection && pts.map((p) => <line key={`hub-${p.id}`} className="red-line faint" x1={p.x} y1={p.y} x2="320" y2="180" opacity="0.22" />)}
        {(state.memory || state.trust) && pts.map((p, i) => pts.slice(i + 1).map((q) => p.group === q.group && (p.id + q.id) % (state.trust ? 5 : 9) === 0 ? (
          <line key={`${p.id}-${q.id}`} className="ink-line" x1={p.x} y1={p.y} x2={q.x} y2={q.y} opacity={state.memory ? 0.42 : 0.18} />
        ) : null))}
        {state.function && clusterCenters.map(([cx, cy], i) => <rect key={i} className="ink-line" x={cx - 10} y={cy - 10} width="20" height="20" opacity="0.42" />)}
        {pts.map((p) => <circle key={p.id} className="ink-dot" cx={p.x} cy={p.y} r="3" />)}
      </BaseSvg>
      <div className="pill-row">
        {Object.keys(state).map((key) => <Toggle key={key} active={state[key]} onClick={() => toggle(key)}>{key}</Toggle>)}
      </div>
    </InstrumentFrame>
  );
}

function BoundedEmergence() {
  const [memory, setMemory] = useState(0.55);
  const [boundary, setBoundary] = useState(0.5);
  const [functionality, setFunctionality] = useState(0.45);
  const [entropy, setEntropy] = useState(0.25);
  const pts = useMemo(() => nodes(48), []);
  const viability = memory * 0.32 + functionality * 0.36 + (1 - Math.abs(boundary - 0.55) * 1.7) * 0.24 - entropy * 0.28;
  const verdict = boundary < 0.22 ? 'too little boundary: drift' : boundary > 0.86 ? 'too much boundary: enclosure' : viability > 0.52 ? 'bounded emergence' : 'unstable association';
  return (
    <InstrumentFrame title="Bounded Emergence" label="instrument 02" verdict={verdict}>
      <BaseSvg>
        {clusterCenters.map(([cx, cy], i) => <ellipse key={i} className={boundary > 0.82 ? 'red-line' : 'ink-line'} cx={cx} cy={cy} rx={38 + boundary * 72} ry={28 + boundary * 52} opacity={0.08 + boundary * 0.42} />)}
        {pts.map((p, i) => pts.slice(i + 1).map((q) => p.group === q.group && (p.id + q.id) % 7 === 0 ? (
          <line key={`${p.id}-${q.id}`} className="ink-line" x1={p.x} y1={p.y} x2={q.x} y2={q.y} opacity={memory * functionality * (1 - entropy) * 0.7} />
        ) : null))}
        {pts.map((p) => {
          const drift = entropy * 36;
          return <circle key={p.id} className="ink-dot" cx={p.x + Math.sin(p.id) * drift} cy={p.y + Math.cos(p.id * 1.7) * drift} r={2.6 + functionality * 1.6} />;
        })}
        <line className="axis" x1="82" y1="326" x2="558" y2="326" />
        <circle className="red-fill" cx={82 + clamp(boundary) * 476} cy={326} r="4" />
      </BaseSvg>
      <div className="instrument-controls">
        <Slider label="memory" value={memory} onChange={setMemory} />
        <Slider label="boundary" value={boundary} onChange={setBoundary} />
        <Slider label="function" value={functionality} onChange={setFunctionality} />
        <Slider label="entropy" value={entropy} onChange={setEntropy} />
      </div>
    </InstrumentFrame>
  );
}

function EnclosureEngine() {
  const [central, setCentral] = useState(0.72);
  const [legible, setLegible] = useState(0.62);
  const pts = useMemo(() => nodes(40), []);
  const verdict = central + legible > 1.2 ? 'ordered by compression' : 'partial enclosure';
  return (
    <InstrumentFrame title="Enclosure Engine" label="instrument 03" verdict={verdict}>
      <BaseSvg>
        {Array.from({ length: 8 }, (_, i) => <line key={`v-${i}`} className="axis" x1={90 + i * 66} y1="55" x2={90 + i * 66} y2="305" opacity={legible * 0.35} />)}
        {Array.from({ length: 5 }, (_, i) => <line key={`h-${i}`} className="axis" x1="90" y1={70 + i * 55} x2="555" y2={70 + i * 55} opacity={legible * 0.35} />)}
        <circle className="red-line" cx="320" cy="180" r={62 + central * 115} opacity="0.36" />
        {pts.map((p) => <circle key={p.id} className="ink-dot" cx={p.x * (1 - central * 0.55) + 320 * central * 0.55} cy={p.y * (1 - central * 0.55) + 180 * central * 0.55} r="3" />)}
      </BaseSvg>
      <div className="instrument-controls"><Slider label="centralization" value={central} onChange={setCentral} /><Slider label="legibility" value={legible} onChange={setLegible} /></div>
    </InstrumentFrame>
  );
}

function LockInBasin() {
  const [cost, setCost] = useState(0.68);
  const [alt, setAlt] = useState(0.36);
  const [attempts, setAttempts] = useState(0);
  const progress = clamp(0.18 + alt * 0.72 - cost * 0.42 + (attempts % 4) * 0.04);
  const verdict = progress > 0.68 ? 'exit becomes plausible' : 'the basin retains the subject';
  return (
    <InstrumentFrame title="Lock-In Basin" label="instrument 04" verdict={verdict}>
      <BaseSvg>
        <path className="red-line" d="M90 115 C170 310 260 310 320 185 C390 70 500 90 555 265" opacity="0.38" />
        <circle className="red-line" cx="160" cy="238" r={42 + cost * 38} opacity="0.32" />
        <circle className="ink-line" cx="505" cy="238" r={30 + alt * 46} opacity="0.32" />
        <circle className="red-fill" cx={160 + progress * 345} cy={238 - Math.sin(progress * Math.PI) * 110} r="7" />
      </BaseSvg>
      <div className="instrument-controls"><Slider label="exit cost" value={cost} onChange={setCost} /><Slider label="alternative coherence" value={alt} onChange={setAlt} /></div>
      <button className="plain-button" type="button" onClick={() => setAttempts((v) => v + 1)}>attempt exit</button>
    </InstrumentFrame>
  );
}

function ThresholdFormation() {
  const [values, setValues] = useState([0.65, 0.45, 0.3, 0.2, 0.1]);
  const labels = ['affinity', 'trust', 'rule', 'function', 'embodiment'];
  const stage = values.findIndex((value) => value < 0.5);
  const active = stage === -1 ? 5 : stage;
  const verdict = active === 5 ? 'embodiment: abstraction ends' : `${labels[active]} remains the next threshold`;
  return (
    <InstrumentFrame title="Threshold Formation" label="instrument 05" verdict={verdict}>
      <BaseSvg>
        {labels.map((label, i) => {
          const x = 110 + i * 105;
          const on = values[i] >= 0.5;
          return <g key={label}><circle className={on ? 'red-line' : 'ink-line'} cx={x} cy="170" r={28 + values[i] * 34} opacity={on ? 0.52 : 0.2} /><text className="svg-label" x={x} y="258" textAnchor="middle">{label}</text></g>;
        })}
        {labels.slice(0, -1).map((_, i) => <line key={i} className="ink-line" x1={138 + i * 105} y1="170" x2={187 + i * 105} y2="170" opacity={values[i] > 0.5 ? 0.4 : 0.12} />)}
      </BaseSvg>
      <div className="instrument-controls">{labels.map((label, i) => <Slider key={label} label={label} value={values[i]} onChange={(v) => setValues((old) => old.map((x, index) => index === i ? v : x))} />)}</div>
    </InstrumentFrame>
  );
}

function RivalAttractor() {
  const [statePull, setStatePull] = useState(0.62);
  const [network, setNetwork] = useState(0.45);
  const [density, setDensity] = useState(0.48);
  const pts = useMemo(() => nodes(50), []);
  const balance = clamp((network * density) / Math.max(0.1, statePull));
  const verdict = balance > 0.72 ? 'rival attractor becomes credible' : 'state basin remains dominant';
  return (
    <InstrumentFrame title="Rival Attractor" label="instrument 06" verdict={verdict}>
      <BaseSvg>
        <circle className="red-line" cx="185" cy="180" r={60 + statePull * 95} opacity="0.32" />
        <circle className="ink-line" cx="465" cy="180" r={45 + network * density * 110} opacity="0.35" />
        {pts.map((p) => <circle key={p.id} className="ink-dot" cx={185 * (1 - balance) + p.x * 0.1 + 465 * balance} cy={180 + Math.sin(p.id) * (24 + density * 48)} r="3" />)}
      </BaseSvg>
      <div className="instrument-controls"><Slider label="state pull" value={statePull} onChange={setStatePull} /><Slider label="network function" value={network} onChange={setNetwork} /><Slider label="density" value={density} onChange={setDensity} /></div>
    </InstrumentFrame>
  );
}

function EntropyStress() {
  const [boundary, setBoundary] = useState(true);
  const [repair, setRepair] = useState(false);
  const [exit, setExit] = useState(true);
  const [stress, setStress] = useState(0.58);
  const strength = Number(boundary) * 0.35 + Number(repair) * 0.35 + Number(exit) * 0.2;
  const fracture = clamp(stress - strength + 0.25);
  const verdict = fracture > 0.58 ? 'the form fractures' : !exit ? 'coherence risks enclosure' : 'stress is absorbed';
  return (
    <InstrumentFrame title="Entropy Stress Test" label="instrument 07" verdict={verdict}>
      <BaseSvg>
        <ellipse className={boundary ? 'ink-line' : 'red-line'} cx="320" cy="180" rx={155 - fracture * 30} ry={95 - fracture * 20} opacity="0.34" />
        {Array.from({ length: 18 }, (_, i) => <line key={i} className="red-line" x1={250 + i * 8} y1={110 + Math.sin(i) * 20} x2={255 + i * 12 + fracture * 50} y2={240 + Math.cos(i) * 24} opacity={fracture * 0.5} />)}
        {nodes(30).map((p) => <circle key={p.id} className="ink-dot" cx={320 + (p.x - 320) * (0.52 + fracture * 0.65)} cy={180 + (p.y - 180) * (0.5 + fracture * 0.65)} r="3" />)}
      </BaseSvg>
      <div className="pill-row"><Toggle active={boundary} onClick={() => setBoundary(!boundary)}>boundary</Toggle><Toggle active={repair} onClick={() => setRepair(!repair)}>repair</Toggle><Toggle active={exit} onClick={() => setExit(!exit)}>exit</Toggle></div>
      <div className="instrument-controls"><Slider label="stress" value={stress} onChange={setStress} /></div>
    </InstrumentFrame>
  );
}

function Coevolution() {
  const stateMoves = ['classify', 'absorb', 'suppress'];
  const networkMoves = ['route', 'fork', 'embody'];
  const [s, setS] = useState(0);
  const [n, setN] = useState(0);
  const verdict = `${stateMoves[s]} / ${networkMoves[n]}: the field adapts in both directions`;
  return (
    <InstrumentFrame title="Co-Evolution" label="instrument 08" verdict={verdict}>
      <BaseSvg>
        <circle className="red-line" cx="210" cy="180" r="86" opacity="0.3" />
        <circle className="ink-line" cx="430" cy="180" r="86" opacity="0.3" />
        {Array.from({ length: 6 }, (_, i) => <path key={i} className={i % 2 ? 'red-line' : 'ink-line'} d={`M${250 + i * 8} ${112 + i * 24} C320 ${80 + i * 22}, 330 ${280 - i * 18}, ${390 - i * 8} ${124 + i * 22}`} opacity="0.32" />)}
        <text className="svg-label" x="210" y="185" textAnchor="middle">{stateMoves[s]}</text>
        <text className="svg-label" x="430" y="185" textAnchor="middle">{networkMoves[n]}</text>
      </BaseSvg>
      <div className="pill-row"><button className="pill" onClick={() => setS((s + 1) % stateMoves.length)}>state response</button><button className="pill" onClick={() => setN((n + 1) % networkMoves.length)}>network response</button></div>
    </InstrumentFrame>
  );
}

function PhaseMap() {
  const [association, setAssociation] = useState(0.55);
  const [boundary, setBoundary] = useState(0.52);
  const x = 110 + association * 420;
  const y = 290 - boundary * 210;
  const verdict = association < 0.35 && boundary < 0.35 ? 'drift' : association > 0.55 && boundary > 0.82 ? 'enclosure' : association > 0.5 && boundary > 0.42 ? 'institutional association' : 'unstable formation';
  return (
    <InstrumentFrame title="Phase Map" label="instrument 09" verdict={verdict}>
      <BaseSvg>
        <rect className="axis" x="110" y="80" width="420" height="210" />
        <line className="axis" x1="110" y1="185" x2="530" y2="185" />
        <line className="axis" x1="320" y1="80" x2="320" y2="290" />
        <circle className="red-fill" cx={x} cy={y} r="7" />
        <text className="svg-label" x="122" y="276">drift</text>
        <text className="svg-label" x="392" y="103">enclosure risk</text>
        <text className="svg-label" x="356" y="266">association</text>
      </BaseSvg>
      <div className="instrument-controls"><Slider label="association" value={association} onChange={setAssociation} /><Slider label="boundary" value={boundary} onChange={setBoundary} /></div>
    </InstrumentFrame>
  );
}

const instruments = [CoordinationMachine, ConnectionInstrument, BoundedEmergence, EnclosureEngine, LockInBasin, ThresholdFormation, RivalAttractor, EntropyStress, Coevolution, PhaseMap];

function Chapter({ chapter, index }) {
  const Instrument = instruments[index] || PhaseMap;
  return (
    <article className="chapter">
      <p className="kicker">{chapter.kicker}</p>
      <h2>{chapter.title}</h2>
      <div className="chapter-body">
        {chapter.body.map((paragraph, paragraphIndex) => <p key={`${chapter.title}-${paragraphIndex}`}>{paragraph}</p>)}
      </div>
      <Instrument />
    </article>
  );
}

function App() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Anthem Research</p>
        <h1>Anatomy of the Network</h1>
        <p className="thesis">The state is imposed simplification. The network is bounded emergence.</p>
        <a href="#essay" className="enter">read the essay</a>
      </section>
      <section id="essay" className="chapters">
        {chapters.map((chapter, index) => <Chapter key={chapter.title} chapter={chapter} index={index} />)}
      </section>
      <footer><p>The state encloses first and legitimates later. The network associates first and seeks form later.</p></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
