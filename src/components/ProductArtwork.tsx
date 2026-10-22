import React from 'react';
import { Product } from '../types/store';

export const SimenesLogo: React.FC<{
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}> = ({ variant = 'light', size = 'md' }) => {
  const isDarkBg = variant === 'dark';
  const scaleClass =
    size === 'sm' ? 'h-8 sm:h-9' : size === 'lg' ? 'h-12 sm:h-14' : 'h-9 sm:h-11';

  return (
    <div className="inline-flex items-center gap-2 sm:gap-3 select-none">
      <svg
        viewBox="0 0 120 96"
        className={`${scaleClass} w-auto shrink-0`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="secNavy" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0F1D40" />
          </linearGradient>
          <linearGradient id="secGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
        </defs>
        {/* Outer shield / emblem frame */}
        <rect
          x="6"
          y="8"
          width="74"
          height="74"
          rx="14"
          fill={isDarkBg ? '#172554' : '#0F1D40'}
          stroke="#FACC15"
          strokeWidth="3"
        />
        {/* Stylized S */}
        <path
          d="M22 30 H46 L36 44 H22 Z M20 48 H44 L36 66 H16 Z"
          fill="#FFFFFF"
        />
        {/* Stylized Z & Lightning Bolt */}
        <path
          d="M52 14 L34 48 H50 L38 82 L70 42 H53 L66 14 Z"
          fill="url(#secGold)"
          stroke="#0F1D40"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Bottom banner text inside SVG */}
        <rect x="44" y="62" width="72" height="22" rx="4" fill="#1E3A8A" />
        <text
          x="80"
          y="76"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="11"
          fontWeight="800"
          fontFamily="Cairo, sans-serif"
          letterSpacing="0.5"
        >
          SIMENES
        </text>
      </svg>
      <div className="flex flex-col leading-tight">
        <span
          className={`font-extrabold tracking-tight whitespace-nowrap ${
            size === 'lg' ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'
          } ${isDarkBg ? 'text-white' : 'text-slate-950'}`}
        >
          سيمنز إيجيبت
        </span>
        <span
          className={`text-[11px] sm:text-xs font-semibold whitespace-nowrap ${
            isDarkBg ? 'text-amber-400' : 'text-blue-900'
          }`}
        >
          للكابلات الكهربائية
        </span>
      </div>
    </div>
  );
};

export const ProductArtwork: React.FC<{
  variant: Product['artworkVariant'];
  crossSection?: string;
  className?: string;
}> = ({ variant, crossSection = '1.5', className = 'w-full h-full' }) => {
  const sizeNumber = crossSection.replace(/[^0-9.×x]/g, '') || '2.0';

  // 1. Stranded Wire Spools (matching the authentic shrink-wrapped roll with Simenes Egypt circular label)
  if (variant.startsWith('wire-spool') || variant === 'flexible-spool') {
    const wireColor =
      variant === 'wire-spool-1.5'
        ? '#1E293B'
        : variant === 'wire-spool-2.0'
        ? '#0F172A'
        : variant === 'wire-spool-3.0'
        ? '#1E3A8A'
        : variant === 'wire-spool-4.0'
        ? '#7F1D1D'
        : variant === 'wire-spool-6.0'
        ? '#14532D'
        : variant === 'flexible-spool'
        ? '#B91C1C'
        : '#0F172A';

    return (
      <svg
        viewBox="0 0 400 300"
        className={className}
        role="img"
        aria-label={`لفة سلك سيمنز إيجيبت مقاس ${crossSection}`}
      >
        <defs>
          <radialGradient id={`bg-${variant}`} cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </radialGradient>
          <radialGradient id={`wire-${variant}`} cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="45%" stopColor={wireColor} />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          <linearGradient id="copperGleam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDBA74" />
            <stop offset="50%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
        </defs>

        {/* Studio background */}
        <rect width="400" height="300" fill={`url(#bg-${variant})`} />
        <ellipse cx="200" cy="262" rx="135" ry="18" fill="#0F172A" opacity="0.14" />

        {/* Outer wound wire coil */}
        <circle
          cx="200"
          cy="150"
          r="122"
          fill={`url(#wire-${variant})`}
          stroke="#334155"
          strokeWidth="3"
        />
        {/* Concentric wire strands texture */}
        {[114, 106, 98, 90, 82].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="150"
            r={r}
            fill="none"
            stroke="#94A3B8"
            strokeWidth={i % 2 === 0 ? '1.2' : '0.7'}
            strokeDasharray={i % 2 === 0 ? '14 6' : '22 8'}
            opacity="0.35"
          />
        ))}

        {/* Authentic Simenes Egypt Circular Faceplate Label */}
        <circle
          cx="200"
          cy="150"
          r="94"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2.5"
        />

        {/* Top Navy Banner inside white faceplate */}
        <rect x="132" y="78" width="136" height="22" rx="6" fill="#0F1D40" />
        <text
          x="200"
          y="93"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="10"
          fontWeight="800"
          fontFamily="Cairo, sans-serif"
        >
          سيمنز إيجيبت للكابلات
        </text>
        <text
          x="200"
          y="112"
          textAnchor="middle"
          fill="#0F1D40"
          fontSize="8.5"
          fontWeight="800"
          fontFamily="Cairo, sans-serif"
        >
          SIMENES EGYPT ELECTRIC CABLES
        </text>

        {/* Left spec box: 99.9% COPPER */}
        <rect
          x="114"
          y="126"
          width="44"
          height="48"
          rx="6"
          fill="#F8FAFC"
          stroke="#0F1D40"
          strokeWidth="1.5"
        />
        <text
          x="136"
          y="139"
          textAnchor="middle"
          fill="#0F1D40"
          fontSize="7.5"
          fontWeight="800"
          fontFamily="Cairo, sans-serif"
        >
          450/750V
        </text>
        <text
          x="136"
          y="152"
          textAnchor="middle"
          fill="#B45309"
          fontSize="9"
          fontWeight="800"
          fontFamily="Cairo, sans-serif"
        >
          99.9%
        </text>
        <text
          x="136"
          y="165"
          textAnchor="middle"
          fill="#0F172A"
          fontSize="7.5"
          fontWeight="800"
          fontFamily="Cairo, sans-serif"
        >
          نحاس نقي
        </text>

        {/* Right spec box: SIZE mm2 */}
        <rect
          x="242"
          y="126"
          width="46"
          height="50"
          rx="6"
          fill="#0F1D40"
        />
        <text
          x="265"
          y="139"
          textAnchor="middle"
          fill="#FACC15"
          fontSize="8"
          fontWeight="700"
          fontFamily="Cairo, sans-serif"
        >
          SIZE
        </text>
        <text
          x="265"
          y="158"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="14"
          fontWeight="800"
          fontFamily="Cairo, sans-serif"
        >
          {sizeNumber}
        </text>
        <text
          x="265"
          y="171"
          textAnchor="middle"
          fill="#CBD5E1"
          fontSize="7.5"
          fontWeight="700"
          fontFamily="Cairo, sans-serif"
        >
          mm² H07V-R
        </text>

        {/* Center spool core hole */}
        <circle
          cx="200"
          cy="152"
          r="31"
          fill="#334155"
          stroke="#94A3B8"
          strokeWidth="3"
        />
        <circle cx="200" cy="152" r="20" fill="#0F172A" />

        {/* Bottom label badges */}
        <rect x="135" y="194" width="130" height="18" rx="4" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
        <text
          x="200"
          y="206"
          textAnchor="middle"
          fill="#78350F"
          fontSize="9"
          fontWeight="800"
          fontFamily="Cairo, sans-serif"
        >
          الطول 100 متر • مطابق للمواصفات
        </text>

        <text
          x="200"
          y="225"
          textAnchor="middle"
          fill="#0F1D40"
          fontSize="8.5"
          fontWeight="800"
          fontFamily="Cairo, sans-serif"
        >
          MADE IN EGYPT • م.ق.م
        </text>

        {/* Exposed gleaming 7-strand copper wire tip at bottom right */}
        <path
          d="M 285 225 Q 320 235 342 215"
          fill="none"
          stroke={wireColor}
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 340 216 L 368 196"
          fill="none"
          stroke="url(#copperGleam)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="368" cy="196" r="4.5" fill="#FDBA74" />
      </svg>
    );
  }

  // 2. Armored & Multi-Core Copper Power Cables
  if (
    variant.startsWith('armored') ||
    variant === 'copper-multicore' ||
    variant === 'thermo-cable' ||
    variant === 'single-core-power'
  ) {
    const isArmored = variant.startsWith('armored');
    const coresCount =
      variant === 'single-core-power'
        ? 1
        : variant === 'thermo-cable'
        ? 2
        : variant.includes('3x')
        ? 3
        : 4;

    return (
      <svg
        viewBox="0 0 400 300"
        className={className}
        role="img"
        aria-label={`كابل نحاس سيمنز إيجيبت مقاس ${crossSection}`}
      >
        <defs>
          <linearGradient id="studioGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="sheathGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="45%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="steelArmor" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <radialGradient id="copperCore" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="45%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#7C2D12" />
          </radialGradient>
        </defs>

        <rect width="400" height="300" fill="url(#studioGrad)" />

        {/* Coiled background cable loops */}
        <ellipse
          cx="185"
          cy="160"
          rx="130"
          ry="92"
          fill="none"
          stroke="#1E293B"
          strokeWidth="26"
        />
        <ellipse
          cx="185"
          cy="160"
          rx="104"
          ry="70"
          fill="none"
          stroke="#0F172A"
          strokeWidth="24"
        />

        {/* Foreground Angled Cable Barrel */}
        <path
          d="M 55 230 L 225 110 L 275 168 L 105 288 Z"
          fill="url(#sheathGrad)"
        />
        {/* Printed spec text along cable jacket */}
        <text
          x="150"
          y="200"
          transform="rotate(-35 150 200)"
          fill="#FACC15"
          fontSize="10"
          fontWeight="700"
          fontFamily="JetBrains Mono, monospace"
        >
          SIMENES EGYPT {sizeNumber} mm² 0.6/1KV
        </text>

        {/* Steel Tape / Wire Armor Layer (if armored) */}
        {isArmored && (
          <ellipse
            cx="252"
            cy="140"
            rx="46"
            ry="46"
            fill="url(#steelArmor)"
            stroke="#475569"
            strokeWidth="3"
          />
        )}

        {/* Inner Bedding & Cross-section Face */}
        <circle
          cx="252"
          cy="140"
          r={isArmored ? 38 : 44}
          fill="#1E293B"
          stroke="#64748B"
          strokeWidth="2.5"
        />

        {/* Individual Insulated Conductors + Pure Copper Strands */}
        {coresCount === 1 && (
          <g>
            <circle cx="252" cy="140" r="28" fill="url(#copperCore)" stroke="#FDBA74" strokeWidth="2" />
            {[
              [0, 0],
              [-12, -10],
              [12, -10],
              [-12, 10],
              [12, 10],
              [0, -15],
              [0, 15],
            ].map(([dx, dy], idx) => (
              <circle
                key={idx}
                cx={252 + dx}
                cy={140 + dy}
                r="5.5"
                fill="#EA580C"
                stroke="#FFEDD5"
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {coresCount === 2 && (
          <g>
            <circle cx="235" cy="140" r="16" fill="#DC2626" />
            <circle cx="235" cy="140" r="10" fill="url(#copperCore)" />
            <circle cx="269" cy="140" r="16" fill="#2563EB" />
            <circle cx="269" cy="140" r="10" fill="url(#copperCore)" />
          </g>
        )}

        {coresCount === 3 && (
          <g>
            {[
              { cx: 252, cy: 119, Jacket: '#DC2626' },
              { cx: 234, cy: 152, Jacket: '#EAB308' },
              { cx: 270, cy: 152, Jacket: '#2563EB' },
            ].map((core, i) => (
              <g key={i}>
                <circle cx={core.cx} cy={core.cy} r="15" fill={core.Jacket} />
                <circle cx={core.cx} cy={core.cy} r="10" fill="url(#copperCore)" />
                <circle cx={core.cx - 3} cy={core.cy - 3} r="3" fill="#FFEDD5" opacity="0.8" />
              </g>
            ))}
          </g>
        )}

        {coresCount === 4 && (
          <g>
            {[
              { cx: 237, cy: 125, Jacket: '#DC2626' },
              { cx: 267, cy: 125, Jacket: '#EAB308' },
              { cx: 237, cy: 155, Jacket: '#2563EB' },
              { cx: 267, cy: 155, Jacket: '#0F172A' },
            ].map((core, i) => (
              <g key={i}>
                <circle
                  cx={core.cx}
                  cy={core.cy}
                  r="13.5"
                  fill={core.Jacket}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
                <circle cx={core.cx} cy={core.cy} r="9" fill="url(#copperCore)" />
                <circle cx={core.cx - 2.5} cy={core.cy - 2.5} r="2.5" fill="#FFEDD5" opacity="0.85" />
              </g>
            ))}
          </g>
        )}

        {/* Bottom-Right Spec Corner Tag (avoids top-left discount badge) */}
        <rect x="236" y="234" width="144" height="46" rx="8" fill="#0F1D40" />
        <text
          x="308"
          y="253"
          textAnchor="middle"
          fill="#FACC15"
          fontSize="11"
          fontWeight="800"
          fontFamily="Cairo, sans-serif"
        >
          {isArmored ? 'كابل قوى مسلح STA' : 'كابل نحاس نقي 99.9%'}
        </text>
        <text
          x="308"
          y="270"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="11"
          fontWeight="700"
          fontFamily="Cairo, sans-serif"
        >
          {crossSection}
        </text>
      </svg>
    );
  }

  // 3. Conduits, Flexible Hoses, Junction Boxes
  if (
    variant === 'upvc-conduit' ||
    variant === 'flex-hose' ||
    variant === 'junction-box'
  ) {
    return (
      <svg
        viewBox="0 0 400 300"
        className={className}
        role="img"
        aria-label={`مواسير وخراطيم كهرباء ${crossSection}`}
      >
        <rect width="400" height="300" fill="#F1F5F9" />
        {variant === 'upvc-conduit' && (
          <g>
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} transform={`translate(0, ${i * 28})`}>
                <rect
                  x="45"
                  y="65"
                  width="290"
                  height="22"
                  rx="11"
                  fill={i % 2 === 0 ? '#FFFFFF' : '#E2E8F0'}
                  stroke="#94A3B8"
                  strokeWidth="2"
                />
                <ellipse
                  cx="335"
                  cy="76"
                  rx="8"
                  ry="11"
                  fill="#334155"
                  stroke="#64748B"
                  strokeWidth="2"
                />
                <text
                  x="160"
                  y="80"
                  fill="#0F1D40"
                  fontSize="9"
                  fontWeight="700"
                  fontFamily="JetBrains Mono, monospace"
                >
                  SIMENES UPVC 20mm FIRE RETARDANT
                </text>
              </g>
            ))}
          </g>
        )}

        {variant === 'flex-hose' && (
          <g>
            <circle
              cx="200"
              cy="155"
              r="95"
              fill="none"
              stroke="#EA580C"
              strokeWidth="28"
              strokeDasharray="8 4"
            />
            <circle
              cx="200"
              cy="155"
              r="65"
              fill="none"
              stroke="#C2410C"
              strokeWidth="24"
              strokeDasharray="8 4"
            />
            <rect x="135" y="132" width="130" height="46" rx="8" fill="#0F1D40" />
            <text
              x="200"
              y="153"
              textAnchor="middle"
              fill="#FACC15"
              fontSize="12"
              fontWeight="800"
              fontFamily="Cairo, sans-serif"
            >
              خرطوم مرن ثقيل
            </text>
            <text
              x="200"
              y="170"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10"
              fontWeight="700"
            >
              لفة 50 متر • 16 مم
            </text>
          </g>
        )}

        {variant === 'junction-box' && (
          <g>
            <rect
              x="95"
              y="75"
              width="210"
              height="150"
              rx="14"
              fill="#EAB308"
              stroke="#CA8A04"
              strokeWidth="4"
            />
            <rect
              x="115"
              y="95"
              width="170"
              height="110"
              rx="8"
              fill="#1E293B"
            />
            <circle cx="105" cy="150" r="6" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
            <circle cx="295" cy="150" r="6" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
            <circle cx="200" cy="150" r="22" fill="#334155" stroke="#FACC15" strokeWidth="2" />
            <text
              x="200"
              y="255"
              textAnchor="middle"
              fill="#0F1D40"
              fontSize="13"
              fontWeight="800"
              fontFamily="Cairo, sans-serif"
            >
              علب ماجيك هندسية بمسامير نحاس
            </text>
          </g>
        )}
      </svg>
    );
  }

  // 4. Distribution Boards (panel-12, panel-24, mccb-breaker)
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label={`لوحة توزيع كهرباء ${crossSection}`}
    >
      <rect width="400" height="300" fill="#E2E8F0" />
      {/* Outer Powder-Coated Metal Enclosure */}
      <rect
        x="70"
        y="28"
        width="260"
        height="244"
        rx="12"
        fill="#F8FAFC"
        stroke="#64748B"
        strokeWidth="4"
      />
      <rect
        x="86"
        y="44"
        width="228"
        height="212"
        rx="6"
        fill="#1E293B"
      />
      {/* Pure Copper Busbars at top */}
      <rect x="104" y="58" width="192" height="10" rx="3" fill="#EA580C" />
      <rect x="104" y="74" width="192" height="8" rx="3" fill="#2563EB" />
      <rect x="104" y="88" width="192" height="8" rx="3" fill="#EAB308" />

      {/* Main Breaker + Branch MCB Row 1 */}
      <rect x="104" y="110" width="44" height="58" rx="4" fill="#0F172A" stroke="#FACC15" strokeWidth="2" />
      <rect x="114" y="132" width="24" height="12" rx="2" fill="#DC2626" />

      {[0, 1, 2, 3, 4, 5].map((idx) => (
        <g key={idx} transform={`translate(${158 + idx * 23}, 112)`}>
          <rect width="19" height="54" rx="3" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
          <rect x="4" y="22" width="11" height="10" rx="1.5" fill="#0F1D40" />
          <circle cx="9.5" cy="44" r="2.5" fill="#16A34A" />
        </g>
      ))}

      {/* Second Row for 24-way panel */}
      <rect x="104" y="182" width="192" height="54" rx="4" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
      <text
        x="200"
        y="214"
        textAnchor="middle"
        fill="#FACC15"
        fontSize="12"
        fontWeight="800"
        fontFamily="Cairo, sans-serif"
      >
        SIMENES EGYPT • {variant === 'panel-24' ? '24 WAY 3-PHASE' : '12 WAY COPPER BUSBAR'}
      </text>
    </svg>
  );
};
