import React, { useState } from 'react';
import { story, START_NODE } from './story.js';

export default function App() {
  const [nodeId, setNodeId] = useState(START_NODE);
  const [path, setPath] = useState([START_NODE]);
  const node = story[nodeId];

  function choose(nextId) {
    setNodeId(nextId);
    setPath((p) => [...p, nextId]);
  }

  function restart() {
    setNodeId(START_NODE);
    setPath([START_NODE]);
  }

  return (
    <div className="stage">
      <div className="starfield" aria-hidden="true" />

      <header className="masthead">
        <span className="signal-dot" />
        <span className="masthead-title">The Last Signal</span>
        <span className="masthead-meta">Listening Post 6, Kessler Drift</span>
      </header>

      <main className="reader">
        <p className="chapter">{node.chapter}</p>

        {node.body.map((para, i) => (
          <p className="para" key={i}>
            {para}
          </p>
        ))}

        {node.ending ? (
          <div className="ending">
            <p className="ending-title">{node.endingTitle}</p>
            <p className="para">{node.endingBody}</p>
            <button className="choice restart" onClick={restart}>
              Begin again
            </button>
          </div>
        ) : (
          <div className="choices">
            {node.choices.map((choice) => (
              <button
                key={choice.next}
                className="choice"
                onClick={() => choose(choice.next)}
              >
                {choice.label}
              </button>
            ))}
          </div>
        )}
      </main>

      <footer className="progress" aria-label="Chapters visited">
        {path.map((id, i) => (
          <span key={i} className={`progress-dot ${id === nodeId ? 'active' : ''}`} />
        ))}
      </footer>
    </div>
  );
}
