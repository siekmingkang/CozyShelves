import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Cat from "./components/Cat.jsx";
import { CAT_VARIANTS } from "./components/catVariants.js";
import "./cats.css";

const variants = Object.entries(CAT_VARIANTS);

function CatGallery() {
  return (
    <main className="cats-page">
      <header className="cats-intro">
        <p className="cats-eyebrow">Cozy Shelves · cat study</p>
        <h1>Five golden British Shorthairs</h1>
        <p className="cats-lede">
          Same sleeping pose, five coats. All five live in the room now: each
          page load picks one at random for the chair and the mobile shelf.
          Every cat breathes, sways its tail, twitches an ear, stirs its
          whiskers and opens its eyes for a moment now and then.
        </p>
      </header>

      <div className="cats-grid">
        {variants.map(([key, v], index) => (
          <article className="cat-card" key={key}>
            <div className="cat-card-art">
              <svg
                viewBox="48 122 140 100"
                role="img"
                aria-label={`${v.label}, a golden British Shorthair`}
                focusable="false"
              >
                <ellipse
                  cx="104"
                  cy="207"
                  rx="46"
                  ry="6"
                  fill="#120a05"
                  opacity="0.32"
                />
                <Cat idPrefix={`gallery-${key}`} variant={key} />
              </svg>
            </div>

            <div className="cat-card-meta">
              <span className="cat-index">{String(index + 1).padStart(2, "0")}</span>
              <h2>{v.label}</h2>
              <p>{v.note}</p>
              <ul className="cat-swatches" aria-label={`${v.label} palette`}>
                {[v.fur[0], v.fur[1], v.fur[2], v.eye].map((color) => (
                  <li key={color} style={{ background: color }} />
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <p className="cats-footnote">
        All five respect reduced-motion settings. Reload the room to meet
        another coat.
      </p>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CatGallery />
  </StrictMode>,
);
