import { useEffect, useRef, useState } from "react";

const SINGLE_PAGE_QUERY = "(max-width: 640px), (max-height: 500px)";
const PAGE_KEY = "cozy-shelves:page:";

function loadPage(bookID) {
  try {
    return Number(localStorage.getItem(PAGE_KEY + bookID)) || 0;
  } catch {
    return 0;
  }
}

function savePage(bookID, page) {
  try {
    localStorage.setItem(PAGE_KEY + bookID, String(page));
  } catch {
    // Storage can be unavailable (private mode); reading still works.
  }
}

function useSinglePage() {
  const [single, setSingle] = useState(
    () => window.matchMedia(SINGLE_PAGE_QUERY).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(SINGLE_PAGE_QUERY);
    const update = () => setSingle(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return single;
}

function Page({ src, index }) {
  if (!src) return <div className="book-page-empty" aria-hidden="true" />;
  return (
    <img
      src={src}
      alt={`Page ${index + 1}`}
      draggable={false}
      loading="eager"
      decoding="async"
    />
  );
}

function Chevron({ direction }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Reader({ book, onClose }) {
  const dialogRef = useRef(null);
  const swipeStart = useRef(null);
  const single = useSinglePage();
  const [page, setPage] = useState(() =>
    Math.min(Math.max(loadPage(book.id) - 1, 0), book.pages.length - 1),
  );
  const [flip, setFlip] = useState(null);

  const total = book.pages.length;
  const step = single ? 1 : 2;
  // Desktop always starts a spread on its left page; the saved page may be any page.
  const firstIndex = single ? page : page - (page % 2);
  const leftIndex = firstIndex;
  const rightIndex = firstIndex + 1;
  const spreads = Math.ceil(total / 2);
  const canPrev = firstIndex > 0 && !flip;
  const canNext = firstIndex + step < total && !flip;

  useEffect(() => {
    savePage(book.id, firstIndex + 1);
  }, [book.id, firstIndex]);

  useEffect(() => {
    if (single) setFlip(null);
  }, [single]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  // Preload the neighbouring pages so a flip never waits on the network.
  useEffect(() => {
    for (const target of [firstIndex - step, firstIndex + step]) {
      if (target < 0 || target >= total) continue;
      for (let i = 0; i < step; i += 1) {
        const src = book.pages[target + i];
        if (src) {
          const image = new Image();
          image.src = src;
        }
      }
    }
  }, [firstIndex, step, total, book.pages]);

  function go(direction) {
    if (flip || !total) return;
    const target = firstIndex + direction * step;
    if (target < 0 || target >= total) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPage(target);
      return;
    }
    setFlip({ direction });
  }

  function finishFlip(event) {
    if (event.target !== event.currentTarget) return;
    setPage(firstIndex + step * flip.direction);
    setFlip(null);
  }

  function onPointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerUp(event) {
    if (!swipeStart.current) return;
    const dx = event.clientX - swipeStart.current.x;
    const dy = event.clientY - swipeStart.current.y;
    swipeStart.current = null;

    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      go(dx < 0 ? 1 : -1);
    }
  }

  function onKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  }

  function close() {
    dialogRef.current?.close();
  }

  let baseLeft = leftIndex;
  let baseRight = rightIndex;
  let leafFront = null;
  let leafBack = null;

  if (flip) {
    if (flip.direction === 1) {
      baseLeft = firstIndex;
      baseRight = firstIndex + 3;
      leafFront = rightIndex;
      leafBack = firstIndex + 2;
    } else {
      baseLeft = firstIndex - 2;
      baseRight = rightIndex;
      leafFront = leftIndex;
      leafBack = firstIndex - 1;
    }
  }

  const firstShown = firstIndex + 1;
  const lastShown = Math.min(firstIndex + step, total);
  const singleTarget = firstIndex + (flip ? flip.direction : 0);
  const progress = single
    ? total > 1
      ? firstIndex / (total - 1)
      : 1
    : spreads > 1
      ? firstIndex / 2 / (spreads - 1)
      : 1;

  return (
    <dialog
      ref={dialogRef}
      className="reader"
      aria-labelledby="reader-title"
      onClose={onClose}
      onKeyDown={onKeyDown}
    >
      <div className="reader-shell">
        <header className="reader-bar">
          <div className="reader-titles">
            <h2 id="reader-title">{book.title}</h2>
            {book.author && <p>{book.author}</p>}
          </div>
          <p className="reader-count" aria-live="polite">
            {single ? "Page" : "Pages"} {firstShown}
            {single ? "" : `–${lastShown}`} of {total}
          </p>
          <button className="reader-close" onClick={close} aria-label="Close book">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="reader-progress" aria-hidden="true">
          <span
            style={{
              width: `${progress * 100}%`,
            }}
          />
        </div>

        <div className="reader-stage">
          <button
            className="reader-nav reader-prev"
            onClick={() => go(-1)}
            aria-disabled={!canPrev}
            tabIndex={canPrev ? 0 : -1}
            aria-label="Previous pages"
          >
            <Chevron direction="left" />
          </button>

          <div className={`reader-book${single ? " reader-book--single" : ""}`}>
            <div
              className={`reader-spread${single ? " reader-spread--single" : ""}`}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => {
                swipeStart.current = null;
              }}
            >
              {single ? (
                <>
                  <div className="book-page book-page--right">
                    <Page src={book.pages[singleTarget]} index={singleTarget} />
                  </div>

                  {flip && (
                    <div
                      className={`page-leaf page-leaf--single ${
                        flip.direction === 1
                          ? "leaf-away-next"
                          : "leaf-away-prev"
                      }`}
                      onAnimationEnd={finishFlip}
                      aria-hidden="true"
                    >
                      <div className="leaf-face leaf-front">
                        <Page src={book.pages[firstIndex]} index={firstIndex} />
                        <span className="leaf-shade" />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="book-page book-page--left">
                    <Page src={book.pages[baseLeft]} index={baseLeft} />
                  </div>
                  <div className="book-page book-page--right">
                    <Page src={book.pages[baseRight]} index={baseRight} />
                  </div>

                  <div className="book-gutter" aria-hidden="true" />

                  {flip && (
                    <div
                      className={`page-leaf ${
                        flip.direction === 1 ? "leaf-next" : "leaf-prev"
                      }`}
                      onAnimationEnd={finishFlip}
                      aria-hidden="true"
                    >
                      <div className="leaf-face leaf-front">
                        <Page src={book.pages[leafFront]} index={leafFront} />
                        <span className="leaf-shade" />
                      </div>
                      <div className="leaf-face leaf-back">
                        <Page src={book.pages[leafBack]} index={leafBack} />
                        <span className="leaf-shade" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <button
            className="reader-nav reader-next"
            onClick={() => go(1)}
            aria-disabled={!canNext}
            tabIndex={canNext ? 0 : -1}
            aria-label="Next pages"
          >
            <Chevron direction="right" />
          </button>
        </div>

        <p className="reader-hint">
          Swipe or use the arrow keys to turn the page
        </p>
      </div>
    </dialog>
  );
}
