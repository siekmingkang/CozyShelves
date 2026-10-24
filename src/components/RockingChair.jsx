import Cat from "./Cat.jsx";

export default function RockingChair() {
  return (
    <div className="chair" aria-hidden="true">
      <svg viewBox="0 0 220 300" focusable="false">
        <defs>
          <linearGradient id="wood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a9713f" />
            <stop offset="0.5" stopColor="#7a4a27" />
            <stop offset="1" stopColor="#4a2b18" />
          </linearGradient>
          <linearGradient id="woodDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7a4a27" />
            <stop offset="1" stopColor="#3a2112" />
          </linearGradient>
        </defs>

        <g className="chair-rock">
          <path
            d="M30 256 Q 112 282 194 250"
            fill="none"
            stroke="url(#woodDark)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M20 272 Q 112 298 200 266"
            fill="none"
            stroke="url(#wood)"
            strokeWidth="9"
            strokeLinecap="round"
          />

          <path
            d="M64 202 L 44 260"
            stroke="url(#woodDark)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M156 202 L 177 256"
            stroke="url(#woodDark)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          <path
            d="M64 204 L 52 76"
            stroke="url(#wood)"
            strokeWidth="7.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M156 204 L 168 76"
            stroke="url(#wood)"
            strokeWidth="7.5"
            strokeLinecap="round"
            fill="none"
          />

          <path
            d="M46 74 Q 110 54 174 74"
            stroke="url(#wood)"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />

          <g stroke="url(#wood)" strokeWidth="3.4" strokeLinecap="round">
            <path d="M82 196 L 76 68" />
            <path d="M96 198 L 93 63" />
            <path d="M110 199 L 110 60" />
            <path d="M124 198 L 127 63" />
            <path d="M138 196 L 144 68" />
          </g>

          <path
            d="M56 195 Q 110 207 164 195 L 155 217 Q 110 227 65 217 Z"
            fill="url(#wood)"
            stroke="#3a2112"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <path
            d="M72 216 L 56 280"
            stroke="url(#wood)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M148 216 L 164 278"
            stroke="url(#wood)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          <path
            d="M56 148 C 36 156 36 176 58 177 L 78 177"
            stroke="url(#wood)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M164 148 C 184 156 184 176 162 177 L 142 177"
            stroke="url(#wood)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          <Cat idPrefix="chair" />
        </g>
      </svg>
    </div>
  );
}
