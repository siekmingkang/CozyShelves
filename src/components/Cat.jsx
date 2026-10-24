import "./Cat.css";
import { CAT_VARIANTS } from "./catVariants.js";

const VARIANTS = Object.keys(CAT_VARIANTS);
const RANDOM_VARIANT = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];

export default function Cat({ idPrefix = "cat", variant = RANDOM_VARIANT }) {
  const key = CAT_VARIANTS[variant] ? variant : RANDOM_VARIANT;
  const v = CAT_VARIANTS[key];
  const fur = `url(#${idPrefix}-fur)`;
  const furLight = `url(#${idPrefix}-fur-light)`;
  const haunch = `url(#${idPrefix}-haunch)`;
  const tabbyOpacity = Math.min(1, v.stripeOpacity + 0.12);

  return (
    <>
      <defs>
        <linearGradient id={`${idPrefix}-fur`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={v.fur[0]} />
          <stop offset="0.55" stopColor={v.fur[1]} />
          <stop offset="1" stopColor={v.fur[2]} />
        </linearGradient>
        <linearGradient
          id={`${idPrefix}-fur-light`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0" stopColor={v.light[0]} />
          <stop offset="1" stopColor={v.light[1]} />
        </linearGradient>
        <radialGradient id={`${idPrefix}-haunch`} cx="50%" cy="48%" r="50%">
          <stop offset="0.2" stopColor={v.shade} stopOpacity="0.8" />
          <stop offset="1" stopColor={v.shade} stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className={`cat cat--${key}`}>
        <g className="cat-tail">
          <path
            d={v.tailPath}
            fill="none"
            stroke={fur}
            strokeWidth="12"
            strokeLinecap="round"
          />
          {v.tailTip && (
            <path
              d={v.tailTipPath}
              fill="none"
              stroke={v.tailTip}
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.8"
            />
          )}
        </g>

        <ellipse cx="112" cy="184" rx="41" ry="25" fill={fur} />
        <ellipse
          cx="136"
          cy="190"
          rx="20"
          ry="18"
          fill={haunch}
          opacity={v.shadeOpacity}
        />

        <g
          stroke={v.stripe}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity={v.stripeOpacity}
        >
          <path d="M118 164 q 8 5 16 1" />
          <path d="M123 172 q 8 5 16 1" />
          <path d="M126 180 q 8 4 15 0" />
          {v.tabby && <path d="M130 188 q 8 4 14 0" />}
        </g>

        <ellipse
          cx="87"
          cy="195"
          rx="16"
          ry="10"
          fill={v.bib}
          opacity={v.bibOpacity}
        />

        <g className="cat-head">
          <g className="cat-ear cat-ear--left">
            <path
              d="M63 158 Q 58 151 59 141 Q 60 136 65 137 Q 72 141 78 148 Z"
              fill={fur}
            />
            {v.earTip && (
              <path
                d="M61 150 Q 58 143 59 138 Q 62 136 67 140 Q 66 145 64 148 Z"
                fill={v.earTip}
                opacity="0.6"
              />
            )}
            <path
              d="M65 155 Q 62 148 63 144 Q 66 142 69 145 Q 72 148 73 150 Z"
              fill={v.innerEar}
              opacity="0.7"
            />
          </g>
          <g className="cat-ear cat-ear--right">
            <path
              d="M95 148 Q 100 143 104 137 Q 108 133 109 139 Q 110 147 108 157 Z"
              fill={fur}
            />
            {v.earTip && (
              <path
                d="M102 144 Q 104 137 106 134 Q 109 135 108 140 Q 107 145 105 147 Z"
                fill={v.earTip}
                opacity="0.6"
              />
            )}
            <path
              d="M98 149 Q 102 144 104 142 Q 106 143 105 148 L 105 153 Z"
              fill={v.innerEar}
              opacity="0.7"
            />
          </g>

          <circle cx="84" cy="168" r="24" fill={fur} />
          <ellipse
            cx="73"
            cy="177"
            rx="10"
            ry="7"
            fill={furLight}
            opacity="0.35"
          />
          <ellipse
            cx="96"
            cy="176"
            rx="9"
            ry="6"
            fill={furLight}
            opacity="0.28"
          />

          {v.tabby && (
            <g
              stroke={v.stripe}
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={tabbyOpacity}
            >
              <path d="M73 154 L 77 149 L 81 154" />
              <path d="M86 154 L 90 149 L 94 154" />
            </g>
          )}

          <g className="cat-open-eyes">
            <ellipse
              cx="76.5"
              cy="171"
              rx="4.7"
              ry="4.5"
              fill={v.eye}
              stroke={v.line}
              strokeWidth="0.7"
            />
            <ellipse
              cx="96.5"
              cy="170.5"
              rx="4.7"
              ry="4.5"
              fill={v.eye}
              stroke={v.line}
              strokeWidth="0.7"
            />
            <ellipse cx="76.5" cy="171" rx="1.6" ry="2.7" fill={v.pupil} />
            <ellipse cx="96.5" cy="170.5" rx="1.6" ry="2.7" fill={v.pupil} />
            <circle cx="78" cy="169.5" r="1" fill="#fff9eb" opacity="0.85" />
            <circle cx="98" cy="169" r="1" fill="#fff9eb" opacity="0.85" />
          </g>

          <g
            className="cat-eye-shut"
            stroke={v.line}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          >
            <path d="M71 170 q 6 4 11 0" />
            <path d="M91 169 q 6 4 11 0" />
          </g>

          <path d="M82 178 l 5 0 l -2.5 3.4 z" fill={v.nose} />

          <g stroke={v.line} strokeWidth="2" strokeLinecap="round" fill="none">
            <path d="M85 181 q -4 4 -7 1" />
            <path d="M86 181 q 4 4 7 1" />
          </g>

          <g
            className="cat-whiskers"
            stroke={v.whisker}
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.55"
          >
            <path d="M74 183 L 60 181" />
            <path d="M74 186 L 61 188" />
            <path d="M96 183 L 110 181" />
            <path d="M96 186 L 109 188" />
          </g>
        </g>

        <g className="cat-paws">
          <ellipse
            cx="76"
            cy="197"
            rx="7.5"
            ry="4.5"
            fill={v.paw ?? furLight}
          />
          <ellipse
            cx="93"
            cy="197"
            rx="7.5"
            ry="4.5"
            fill={v.paw ?? furLight}
          />
        </g>
      </g>
    </>
  );
}
