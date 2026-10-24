import { useRef, useState } from "react";
import books from "virtual:books";
import Window from "./components/Window.jsx";
import Bookshelf from "./components/Bookshelf.jsx";
import Table from "./components/Table.jsx";
import RockingChair from "./components/RockingChair.jsx";
import Reader from "./components/Reader.jsx";
import { CANDLES } from "./components/Candle.jsx";

const WEATHERS = ["sunny", "rain", "snow"];

export default function App() {
  const [weather] = useState(
    () => WEATHERS[Math.floor(Math.random() * WEATHERS.length)],
  );
  const [candle, setCandle] = useState("taper");
  const [openBook, setOpenBook] = useState(null);
  const lastTrigger = useRef(null);

  function openBookAt(book, trigger) {
    lastTrigger.current = trigger ?? document.activeElement;
    setOpenBook(book);
  }

  function closeReader() {
    setOpenBook(null);
    requestAnimationFrame(() => lastTrigger.current?.focus());
  }

  return (
    <main className="room">
      <div className="stage" data-weather={weather}>
        <h1 className="sr-only">Cozy Shelves</h1>
        <p className="sr-only">
          A cozy wooden cabin reading nook. Outside the window it is {weather}.
        </p>

        <div className="wall" aria-hidden="true" />
        <div className="floor" aria-hidden="true" />
        <div className="baseboard" aria-hidden="true" />
        <div className="rug" aria-hidden="true" />
        <div className="plaque" aria-hidden="true">
          Cozy Shelves
        </div>

        <Window weather={weather} />
        <Table candle={candle} />
        <Bookshelf books={books} onOpen={openBookAt} />
        <RockingChair />

        <div className="vignette" aria-hidden="true" />
      </div>

      <div className="candle-picker" role="group" aria-label="Candle design">
        {CANDLES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={candle === id}
            onClick={() => setCandle(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {openBook && (
        <Reader key={openBook.id} book={openBook} onClose={closeReader} />
      )}
    </main>
  );
}
