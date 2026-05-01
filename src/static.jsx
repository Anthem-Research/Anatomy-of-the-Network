import React from 'react';
import { createRoot } from 'react-dom/client';
import { chapters } from './essay.js';
import './static.css';

function Chapter({ chapter }) {
  return (
    <article className="chapter">
      <p className="kicker">{chapter.kicker}</p>
      <h2>{chapter.title}</h2>
      <div className="chapter-body">
        {chapter.body.map((paragraph, index) => (
          <p key={`${chapter.title}-${index}`}>{paragraph}</p>
        ))}
      </div>
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
        {chapters.map((chapter) => (
          <Chapter key={chapter.title} chapter={chapter} />
        ))}
      </section>

      <footer>
        <p>The state encloses first and legitimates later. The network associates first and seeks form later.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
