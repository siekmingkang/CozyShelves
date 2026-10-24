# Cozy Shelves

A full-screen CSS cabin reading nook built with Vite + React. The room is drawn
with CSS and inline SVG; the books are images.

- Center: wooden bookshelf with face-out, clickable book covers
- Left: window with random sun / rain / snow, round wooden table, animated candle
- Right: rocking chair (gently rocking) with a sleeping British Shorthair
- Click a cover to open a full-screen two-page reader. Swipe left/right, use the
  arrow keys, or use the side arrows to turn pages. Esc or the X closes it.

```bash
npm install
npm run dev
```

## Adding books

Each folder in `public/Books/` is one book:

```text
public/Books/My_Book/
├── cover.jpg        # shelf cover (png, jpg/jpeg, webp, avif)
├── meta.json        # optional: { "title": "...", "author": "..." }
├── page_001.png     # reader pages, sorted by number
├── page_002.png
└── ...
```

Books are discovered automatically at dev and build time, so no code changes are
needed. The dev server reloads after the folder has finished copying. Without
`meta.json`, the folder name (with underscores replaced by spaces) is used.

If there are no book folders, the shelf falls back to the decorative CSS spines.

## Notes

- Weather is picked at random on each page load (`src/App.jsx`).
- All motion stops under `prefers-reduced-motion: reduce`.
- The scene scales as one 8:5 illustration. On small screens the room hides its
  furniture and shows the title and shelf, with the shelf along the bottom. The
  reader shows a two-page spread on desktop and one page at a time on mobile;
  the last page read is remembered per book in `localStorage`.
