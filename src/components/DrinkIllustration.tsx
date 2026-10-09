import { useId } from "react";

/** Original vector artwork. No remote assets or image licensing dependency. */
export default function DrinkIllustration({
  color = "#b9d76b",
  deep = "#638c3f",
  label = "Illustrated lime and mint mojito",
  className = "",
}: {
  color?: string;
  deep?: string;
  label?: string;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={className}
      viewBox="0 0 480 560"
      role="img"
      aria-labelledby={`${id}-title`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={`${id}-title`}>{label}</title>
      <defs>
        <linearGradient id={`${id}-liquid`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={color} />
          <stop offset="1" stopColor={deep} />
        </linearGradient>
        <linearGradient id={`${id}-glass`}>
          <stop stopColor="#fff" stopOpacity=".5" />
          <stop offset=".28" stopColor="#fff" stopOpacity=".06" />
          <stop offset=".8" stopColor="#fff" stopOpacity=".03" />
          <stop offset="1" stopColor="#fff" stopOpacity=".5" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d="M142 191 L162 459 Q240 490 318 459 L338 191Z" />
        </clipPath>
      </defs>
      <ellipse
        cx="244"
        cy="496"
        rx="131"
        ry="17"
        fill="#08261c"
        opacity=".16"
      />
      <path
        d="M277 230 316 68"
        stroke="#46634b"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M275 230 314 68"
        stroke="#b6b9a1"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M140 185 159 462 Q240 498 321 462 L340 185"
        fill={`url(#${id}-glass)`}
        stroke="#c5d6bd"
        strokeWidth="2"
      />
      <g clipPath={`url(#${id}-clip)`}>
        <path
          d="M135 259 Q240 241 345 259 L326 470 Q240 499 154 470Z"
          fill={`url(#${id}-liquid)`}
          opacity=".88"
        />
        <g
          fill="#fff"
          fillOpacity=".32"
          stroke="#fff"
          strokeOpacity=".5"
          strokeWidth="2"
        >
          <rect
            x="162"
            y="224"
            width="65"
            height="65"
            rx="10"
            transform="rotate(-15 194 256)"
          />
          <rect
            x="243"
            y="228"
            width="68"
            height="62"
            rx="10"
            transform="rotate(18 277 259)"
          />
          <rect
            x="204"
            y="309"
            width="71"
            height="67"
            rx="10"
            transform="rotate(-12 239 342)"
          />
          <rect
            x="166"
            y="387"
            width="61"
            height="60"
            rx="9"
            transform="rotate(15 196 417)"
          />
          <rect
            x="265"
            y="384"
            width="58"
            height="64"
            rx="10"
            transform="rotate(-16 294 416)"
          />
        </g>
        <g fill="#f9fbe6" opacity=".7">
          <circle cx="186" cy="343" r="3" />
          <circle cx="290" cy="317" r="4" />
          <circle cx="247" cy="421" r="3" />
          <circle cx="211" cy="299" r="3" />
          <circle cx="299" cy="370" r="2" />
          <circle cx="182" cy="461" r="2" />
          <circle cx="233" cy="390" r="2" />
        </g>
        <g fill="#527846" opacity=".8">
          <path d="M235 395Q206 370 227 348Q255 364 235 395" />
          <path d="M279 465Q247 444 263 422Q294 434 279 465" />
          <path d="M177 308Q155 282 177 273Q199 290 177 308" />
        </g>
      </g>
      <ellipse
        cx="240"
        cy="190"
        rx="100"
        ry="24"
        fill="#d5e3cb"
        fillOpacity=".16"
        stroke="#e1ebd6"
        strokeWidth="3"
      />
      <path
        d="M153 218 170 451"
        stroke="#fff"
        strokeOpacity=".55"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M322 226 307 451"
        stroke="#fff"
        strokeOpacity=".24"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g transform="translate(160 186) rotate(-20)">
        <circle r="62" fill="#52813e" />
        <circle r="55" fill="#eef1bc" />
        <circle r="47" fill="#bbd967" />
        <g stroke="#eef1bc" strokeWidth="4">
          <path d="M0 -47V47M-47 0H47M-33 -33 33 33M-33 33 33 -33" />
        </g>
        <circle r="7" fill="#eef1bc" />
      </g>
      <g stroke="#294e30" strokeWidth="2">
        <path d="M254 211Q199 184 219 126Q275 137 254 211" fill="#4f7c47" />
        <path d="M254 211Q258 141 306 140Q316 192 254 211" fill="#385f37" />
        <path d="M254 211Q273 178 307 190Q288 228 254 211" fill="#638e48" />
        <path
          d="M254 212 228 147M254 212 294 155"
          fill="none"
          stroke="#9ab274"
        />
      </g>
      <path
        d="M180 480Q240 497 299 480"
        stroke="#fff"
        strokeOpacity=".5"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}
