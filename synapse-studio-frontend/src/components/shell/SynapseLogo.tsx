/** 品牌占位：神经元突触 + 创意火花（抽象 SVG，橙色系） */
export function SynapseLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden
      className="synapse-logo"
    >
      <defs>
        <radialGradient id="synapse-spark-gradient" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#ffb457" />
          <stop offset="45%" stopColor="#ff8f51" />
          <stop offset="100%" stopColor="#1a120c" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="20" fill="url(#synapse-spark-gradient)" opacity={0.4} />
      <path
        d="M24 8 L28 20 L40 22 L30 30 L32 42 L24 34 L16 42 L18 30 L8 22 L20 20 Z"
        fill="none"
        stroke="#ff8f51"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <circle cx="24" cy="22" r="3" fill="#ffb457" />
      <circle cx="14" cy="28" r="2" fill="#ff8f51" />
      <circle cx="34" cy="28" r="2" fill="#ff8f51" />
    </svg>
  );
}
