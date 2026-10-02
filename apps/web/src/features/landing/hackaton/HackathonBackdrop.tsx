/** Decorative network, deliberately concentrated away from the introductory copy. */
export function HackathonBackdrop() {
  return (
    <svg
      className="hackathon-backdrop"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hackathon-network-ink" x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="#0482eb" />
          <stop offset="0.65" stopColor="#08cdef" />
          <stop offset="1" stopColor="#80df6f" />
        </linearGradient>
        <radialGradient id="hackathon-network-fade" cx="85%" cy="36%" r="70%">
          <stop stopColor="white" />
          <stop offset="1" stopColor="black" />
        </radialGradient>
        <mask id="hackathon-network-mask">
          <rect width="1440" height="800" fill="url(#hackathon-network-fade)" />
        </mask>
      </defs>
      <g mask="url(#hackathon-network-mask)" fill="none" stroke="url(#hackathon-network-ink)">
        <g strokeWidth="1" opacity="0.4">
          <path d="M680 0 790 90 990 40 1130 150 1330 80 1490 180 M790 90 850 260 1130 150 1190 350 1490 180 M990 40 850 260 1020 440 1190 350 1340 520 1490 440 M1130 150 1390 290 1340 520 1190 350 1020 440 1110 650 1390 710 M850 260 720 410 1020 440 870 600 1110 650 1160 800 M1340 520 1390 710 1530 620" />
          <path d="M-60 600 120 510 260 630 450 550 550 730 740 690 M120 510 90 740 260 630 280 830 M260 630 550 730 450 550 630 470 740 690 870 600" />
        </g>
        <g fill="#08cdef" strokeWidth="6" strokeOpacity="0.12">
          {[
            [790, 90],
            [990, 40],
            [1130, 150],
            [1330, 80],
            [850, 260],
            [1190, 350],
            [1390, 290],
            [1020, 440],
            [1340, 520],
            [1110, 650],
            [1390, 710],
            [720, 410],
            [870, 600],
            [120, 510],
            [260, 630],
            [450, 550],
            [550, 730],
            [740, 690],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />
          ))}
        </g>
      </g>
    </svg>
  )
}
