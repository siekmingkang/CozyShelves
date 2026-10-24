import Cat from "./Cat.jsx";

const SPINE_COLORS = [
  "#7d2e2a",
  "#2f4858",
  "#6b4f2a",
  "#3f5c46",
  "#8a6a3b",
  "#5a3a5e",
  "#a1522e",
  "#2e4a62",
  "#7a6236",
  "#4a3a2c",
  "#8c3f3f",
  "#416b63",
];

function makeRow(count, offset) {
  return Array.from({ length: count }, (_, i) => ({
    w: 0.92 + ((i * 5 + offset) % 6) * 0.14,
    h: 3.5 + ((i * 7 + offset) % 5) * 0.25,
    color: SPINE_COLORS[(i + offset) % SPINE_COLORS.length],
    lean: i === count - 1 && offset % 2 === 0,
  }));
}

const PLACEHOLDER_SHELVES = [
  makeRow(17, 0),
  makeRow(15, 4),
  makeRow(16, 7),
  makeRow(14, 2),
];

const FLAT_BOOKS = [
  { w: 4.6, color: "#7d2e2a" },
  { w: 4.2, color: "#2f4858" },
  { w: 3.8, color: "#8a6a3b" },
];

function ShelfCat() {
  return (
    <svg
      className="shelf-cat"
      viewBox="52 126 132 92"
      aria-hidden="true"
      focusable="false"
    >
      <Cat idPrefix="shelf" />
    </svg>
  );
}

function PlaceholderShelf() {
  return (
    <div className="bookshelf" aria-hidden="true">
      <div className="shelf-case">
        {PLACEHOLDER_SHELVES.map((books, row) => (
          <div className="shelf-row" key={row}>
            {books.map((book, i) => (
              <div
                className={`book${book.lean ? " book--lean" : ""}`}
                key={i}
                style={{
                  "--w": `${book.w}em`,
                  "--h": `${book.h}em`,
                  "--c": book.color,
                }}
              />
            ))}

            {row === 3 && (
              <div className="book-stack">
                {FLAT_BOOKS.map((book, i) => (
                  <div
                    className="book book--flat"
                    key={i}
                    style={{
                      "--w": `${book.w}em`,
                      "--c": book.color,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <ShelfCat />
    </div>
  );
}

function spreadOverShelves(books, rowCount) {
  const rows = Array.from({ length: rowCount }, () => []);
  const base = Math.floor(books.length / rowCount);
  const extra = books.length % rowCount;
  let cursor = 0;

  for (let row = 0; row < rowCount; row += 1) {
    const count = base + (row < extra ? 1 : 0);
    rows[row] = books.slice(cursor, cursor + count);
    cursor += count;
  }

  return rows;
}

// Fewer books get taller shelves, so a small library still reads as a display.
function shelfLayout(books) {
  const rowCount = books.length <= 6 ? 2 : books.length <= 12 ? 3 : 4;
  const rows = spreadOverShelves(books, rowCount);
  const perRow = Math.max(...rows.map((row) => row.length), 1);
  const rowCaps = { 2: 11.5, 3: 7.5, 4: 5.4 };
  const coverH = Math.min(
    rowCaps[rowCount],
    (26 / perRow - 0.55) * 1.22,
  );

  return {
    rows,
    coverH: `${coverH}em`,
    coverMaxW: `${26 / perRow - 0.55}em`,
  };
}

export default function Bookshelf({ books, onOpen }) {
  if (books.length === 0) return <PlaceholderShelf />;

  const { rows, coverH, coverMaxW } = shelfLayout(books);

  return (
    <section className="bookshelf" aria-label="Bookshelf">
      <div className="shelf-case">
        {rows.map((row, rowIndex) => (
          <div
            className="shelf-row shelf-row--real"
            key={rowIndex}
            style={{ "--cover-h": coverH, "--cover-max-w": coverMaxW }}
          >
            {row.map((book) => (
              <button
                className="shelf-book"
                key={book.id}
                onClick={(event) => onOpen(book, event.currentTarget)}
                aria-label={`Read ${book.title}`}
                title={`Read ${book.title}`}
              >
                <img src={book.cover} alt="" draggable={false} />
              </button>
            ))}
          </div>
        ))}
      </div>
      <ShelfCat />
    </section>
  );
}
