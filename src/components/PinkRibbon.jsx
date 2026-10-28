import React from 'react';

const RIBBON_PATH = 'M18 90 L40 50 C50 34 46 8 32 8 C18 8 14 34 24 50 L46 90';

/** Awareness ribbon drawn as a railway track: pink rails with white sleepers. */
const PinkRibbon = ({ size = 32, className = '', title = 'GRDA supports Pink October' }) => (
    <svg
        className={className}
        width={size * (64 / 96)}
        height={size}
        viewBox="0 0 64 96"
        role="img"
        aria-label={title}
    >
        <title>{title}</title>
        <defs>
            <linearGradient id="pinkRibbonGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F48FB1" />
                <stop offset="55%" stopColor="#EC407A" />
                <stop offset="100%" stopColor="#C2185B" />
            </linearGradient>
        </defs>
        <path
            d={RIBBON_PATH}
            fill="none"
            stroke="url(#pinkRibbonGradient)"
            strokeWidth="11"
            strokeLinejoin="round"
        />
        <path
            d={RIBBON_PATH}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.75"
            strokeWidth="7"
            strokeDasharray="1.6 4.4"
            strokeLinejoin="round"
        />
    </svg>
);

export default PinkRibbon;
