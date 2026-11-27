import React, { useState } from 'react';
import { Globe, MapPin, Compass, ShieldCheck, Sparkles, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export function WorldMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const hub = { x: 670, y: 260, label: "India Processing & Innovation Hub", country: "India" };

  const targetMarkets = [
    { id: "eu", x: 490, y: 165, name: "Europe", description: "Strategic horizon for clean-label food & nutrition formulations." },
    { id: "me", x: 575, y: 220, name: "Middle East", description: "Growing demand for standardized natural fruit ingredients." },
    { id: "sea", x: 770, y: 290, name: "Southeast Asia", description: "Regional synergy for food processing and functional beverages." },
    { id: "ea", x: 820, y: 190, name: "East Asia", description: "Advanced nutritional, confectionery, and beauty application markets." },
    { id: "na", x: 230, y: 175, name: "North America", description: "Large-scale functional snack, dietary supplement, and bakery space." },
    { id: "latam", x: 310, y: 340, name: "Latin America", description: "Agricultural exchange and botanical ingredient collaboration." }
  ];

  return (
    <div className="relative w-full bg-[#102A43] text-white rounded-md p-6 sm:p-10 overflow-hidden border border-[#B89B5E]/30 shadow-xl">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FAF7F0_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top Meta Bar */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#B89B5E]/20">
        <div>
          <div className="flex items-center gap-2 text-[#B89B5E] text-xs uppercase tracking-widest font-semibold">
            <Globe className="w-4 h-4" />
            <span>Global Vision & Reach</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] mt-1">
            Engineered at Origin. Structured for Global Supply.
          </h3>
        </div>
        <div className="flex items-center gap-2 bg-[#285943]/40 border border-[#285943] px-3.5 py-1.5 rounded-full text-xs text-[#FAF7F0]">
          <span className="w-2 h-2 rounded-full bg-[#B89B5E] animate-pulse" />
          <span>Hub Origin: Karnataka & Maharashtra Agro-Corridor, India</span>
        </div>
      </div>

      {/* Map Graphic Canvas */}
      <div className="relative my-6 w-full aspect-[2/1] min-h-[300px] sm:min-h-[400px] flex items-center justify-center">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full object-contain"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B89B5E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#285943" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Continents Simplified Stylized Geometry */}
          <g fill="#1D3B58" opacity="0.55" stroke="#2A4D6F" strokeWidth="0.75">
            {/* North America */}
            <path d="M 120 80 Q 200 60 270 90 Q 300 130 280 200 Q 220 230 180 240 Q 140 180 120 80 Z" />
            <path d="M 180 90 Q 240 70 260 120 Q 210 160 170 140 Z" />
            {/* South America */}
            <path d="M 270 250 Q 340 260 350 330 Q 330 430 280 440 Q 250 350 270 250 Z" />
            {/* Europe */}
            <path d="M 450 90 Q 520 80 540 130 Q 510 170 460 160 Q 430 130 450 90 Z" />
            {/* Africa */}
            <path d="M 460 180 Q 550 180 560 260 Q 540 370 490 380 Q 440 290 460 180 Z" />
            {/* Asia */}
            <path d="M 550 80 Q 750 60 880 130 Q 890 230 800 280 Q 720 240 650 210 Q 560 150 550 80 Z" />
            {/* India Subcontinent */}
            <path d="M 640 200 Q 690 200 700 240 Q 670 310 650 300 Q 630 240 640 200 Z" fill="#285943" opacity="0.9" stroke="#B89B5E" strokeWidth="1.5" />
            {/* Australia */}
            <path d="M 780 340 Q 860 330 870 390 Q 820 430 770 400 Z" />
          </g>

          {/* Arcs radiating from India Hub to World regions */}
          {targetMarkets.map((market) => {
            const midX = (hub.x + market.x) / 2;
            const midY = Math.min(hub.y, market.y) - 40;
            const pathData = `M ${hub.x} ${hub.y} Q ${midX} ${midY} ${market.x} ${market.y}`;
            const isHovered = activeRegion === market.id;

            return (
              <g key={market.id}>
                {/* Arc line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={isHovered ? "#B89B5E" : "url(#arcGradient)"}
                  strokeWidth={isHovered ? "2" : "1.2"}
                  strokeDasharray={isHovered ? "none" : "4,4"}
                  className="transition-all duration-300"
                />

                {/* Target Node */}
                <circle
                  cx={market.x}
                  cy={market.y}
                  r={isHovered ? "7" : "5"}
                  fill={isHovered ? "#B89B5E" : "#1D3B58"}
                  stroke="#FAF7F0"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setActiveRegion(market.id)}
                  onMouseLeave={() => setActiveRegion(null)}
                />

                {/* Target Label */}
                <text
                  x={market.x}
                  y={market.y - 12}
                  textAnchor="middle"
                  fill="#FAF7F0"
                  fontSize="10"
                  fontFamily="sans-serif"
                  fontWeight="600"
                  className="pointer-events-none tracking-wider uppercase opacity-90"
                >
                  {market.name}
                </text>
              </g>
            );
          })}

          {/* Epicenter Origin Hub Node (India) */}
          <g transform={`translate(${hub.x}, ${hub.y})`} filter="url(#glow)">
            <circle r="16" fill="#B89B5E" opacity="0.25" className="animate-ping" />
            <circle r="9" fill="#B89B5E" stroke="#FAF7F0" strokeWidth="2" />
            <circle r="3.5" fill="#102A43" />
          </g>

          {/* Hub Tooltip Label */}
          <g transform={`translate(${hub.x}, ${hub.y + 24})`}>
            <rect x="-80" y="-14" width="160" height="24" rx="4" fill="#102A43" stroke="#B89B5E" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fill="#FAF7F0" fontSize="9" fontWeight="700" letterSpacing="0.5">
              BHUVIQ NYRA ORIGIN (INDIA)
            </text>
          </g>
        </svg>
      </div>

      {/* Target Regions Quick Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4 border-t border-[#B89B5E]/20 text-xs">
        {targetMarkets.map((market) => (
          <div
            key={market.id}
            onMouseEnter={() => setActiveRegion(market.id)}
            onMouseLeave={() => setActiveRegion(null)}
            className={cn(
              "p-2.5 rounded-sm transition-all duration-200 border cursor-pointer",
              activeRegion === market.id
                ? "bg-[#B89B5E]/20 border-[#B89B5E] text-[#FAF7F0]"
                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
            )}
          >
            <p className="font-semibold text-white flex items-center justify-between">
              <span>{market.name}</span>
              <span className="text-[10px] text-[#B89B5E]">●</span>
            </p>
            <p className="text-[10px] line-clamp-2 mt-0.5 text-white/60">
              {market.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom statement adhering directly to prompt */}
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-white/70 gap-2">
        <p className="max-w-2xl leading-relaxed">
          <strong className="text-white">Long-Term Vision:</strong> We are building our processing integrity and cold-chain packaging systems specifically with the compliance, documentation, and stability standards required to serve discerning B2B partners across international markets.
        </p>
        <span className="shrink-0 text-[11px] font-mono text-[#B89B5E]">Export Standard ISO / Multi-Barrier Pack</span>
      </div>
    </div>
  );
}
