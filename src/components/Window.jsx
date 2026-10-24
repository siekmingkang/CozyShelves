// Positions are spread deterministically so the CSS has no random layout on render.
const RAIN = Array.from({ length: 34 }, (_, i) => ({
  x: (i * 37 + 9) % 100,
  y: 8 + ((i * 53) % 88),
  dur: 0.9 + (i % 5) * 0.16,
  delay: -((i * 7) % 19) * 0.11,
}));

const SNOW = Array.from({ length: 36 }, (_, i) => ({
  x: (i * 41 + 5) % 100,
  y: 4 + ((i * 29) % 90),
  size: 0.18 + (i % 4) * 0.07,
  dur: 7 + (i % 6) * 1.3,
  delay: -((i * 11) % 40) * 0.4,
}));

export default function Window({ weather }) {
  return (
    <div className="window" data-weather={weather} aria-hidden="true">
      <div className="window-frame">
        <div className="glass">
          <div className="sky" />

          {weather === "sunny" && (
            <>
              <div className="sun">
                <div className="rays" />
              </div>
              <div className="cloud cloud-a" />
              <div className="cloud cloud-b" />
            </>
          )}

          {weather === "rain" && (
            <>
              <div className="cloud cloud-a" />
              <div className="cloud cloud-b" />
            </>
          )}

          {weather === "snow" && <div className="cloud cloud-a" />}

          <svg
            className="landscape"
            viewBox="0 0 200 80"
            preserveAspectRatio="none"
            focusable="false"
          >
            <path
              className="hill-far"
              d="M0 52 Q 30 28 62 45 T 126 40 Q 164 34 200 50 L200 80 L0 80Z"
            />
            <path
              className="hill-near"
              d="M0 68 Q 40 50 82 63 T 158 58 Q 182 56 200 65 L200 80 L0 80Z"
            />
            <g className="pines">
              <path className="pine" d="M22 62 l8-17 l8 17 z" />
              <path className="pine" d="M26 54 l8-19 l8 19 z" opacity=".75" />
              <path className="pine" d="M164 60 l7-15 l7 15 z" />
              <path className="pine" d="M168 53 l8-18 l8 18 z" opacity=".7" />
              <path className="pine" d="M138 64 l6-12 l6 12 z" opacity=".6" />
            </g>
          </svg>

          {weather === "rain" && (
            <div className="rain">
              {RAIN.map((drop, i) => (
                <span
                  key={i}
                  style={{
                    "--x": drop.x,
                    "--y": drop.y,
                    "--dur": `${drop.dur}s`,
                    "--delay": `${drop.delay}s`,
                  }}
                />
              ))}
            </div>
          )}

          {weather === "snow" && (
            <div className="snow">
              {SNOW.map((flake, i) => (
                <span
                  key={i}
                  style={{
                    "--x": flake.x,
                    "--y": flake.y,
                    "--size": `${flake.size}em`,
                    "--dur": `${flake.dur}s`,
                    "--delay": `${flake.delay}s`,
                  }}
                />
              ))}
            </div>
          )}

          <div className="mullion-v" />
          <div className="mullion-h" />
        </div>
      </div>
      <div className="sill" />
    </div>
  );
}
