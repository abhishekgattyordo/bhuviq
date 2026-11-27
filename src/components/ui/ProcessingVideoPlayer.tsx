import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface TelemetryMetric {
  metric: string;
  value: string;
  unit: string;
  status?: 'optimal' | 'normal' | 'warning';
}

export interface ProcessingVideoPlayerProps {
  videoUrl?: string;
  posterImage?: string;
  stageNumber?: string;
  stageTitle?: string;
  stageSubtitle?: string;
  telemetry?: TelemetryMetric[];
  className?: string;
}

export function ProcessingVideoPlayer({
  videoUrl,
  posterImage = "/images/process_puree_homogenizer_1790837594587.jpg",
  stageNumber = "03",
  stageTitle = "Node 03: SS-316 Puree Homogenization & Dehydration Line",
  stageSubtitle = "Live SCADA telemetry with automated temperature & flow assay",
  telemetry = [
    { metric: "Line Temp", value: "68.4", unit: "°C", status: "optimal" },
    { metric: "Puree Flow", value: "1,240", unit: "kg/h", status: "optimal" },
    { metric: "SS-316 Press", value: "2.4", unit: "bar", status: "normal" },
    { metric: "ISO Cleanroom", value: "Class 100k", unit: "Air", status: "optimal" },
  ],
  className
}: ProcessingVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasError(false);
      }).catch(() => {
        setHasError(true);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className={cn("relative rounded-sm overflow-hidden border border-white/20 bg-[#102A43] shadow-xl text-white", className)}>
      {/* Video element */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
        {videoUrl && !hasError ? (
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterImage}
            muted={isMuted}
            playsInline
            loop
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full">
            <img
              src={posterImage}
              alt={stageTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80";
              }}
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#B89B5E]/30 border border-[#B89B5E] flex items-center justify-center text-[#B89B5E]">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <p className="text-xs font-mono text-[#B89B5E] font-bold uppercase tracking-wider">
                Industrial Facility Standby Feed
              </p>
              <p className="text-[11px] text-white/70 max-w-sm">
                Live line monitoring and automated operational assay active.
              </p>
            </div>
          </div>
        )}

        {/* Video Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

        {/* Header telemetry node info */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] px-2 py-0.5 bg-[#B89B5E] text-[#102A43] font-bold rounded">
              NODE {stageNumber}
            </span>
            <span className="text-xs font-semibold text-white drop-shadow truncate max-w-[200px] sm:max-w-none">
              {stageTitle}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs text-[10px] font-mono text-emerald-400 border border-emerald-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>LIVE</span>
          </div>
        </div>

        {/* Floating Play/Pause Center Button if paused and video present */}
        {videoUrl && !hasError && !isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute z-20 w-14 h-14 rounded-full bg-[#B89B5E]/90 hover:bg-[#B89B5E] text-[#102A43] flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
            aria-label="Play video"
          >
            <Play className="w-6 h-6 ml-0.5 fill-current" />
          </button>
        )}

        {/* Controls Bar at bottom of video */}
        {videoUrl && !hasError && (
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-20 px-2 py-1.5 rounded bg-black/60 backdrop-blur-xs text-white">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="p-1 hover:text-[#B89B5E] transition-colors cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="p-1 hover:text-[#B89B5E] transition-colors cursor-pointer"
                aria-label="Restart video"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="p-1 hover:text-[#B89B5E] transition-colors cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleFullscreen}
                className="p-1 hover:text-[#B89B5E] transition-colors cursor-pointer"
                aria-label="Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Telemetry Metrics Bar */}
      {telemetry && telemetry.length > 0 && (
        <div className="p-3 sm:p-4 bg-[#0B1D2E] border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {telemetry.map((t, idx) => (
            <div key={idx} className="p-2 rounded bg-white/5 border border-white/10 space-y-0.5">
              <span className="text-[10px] text-white/60 font-mono block uppercase">
                {t.metric}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono font-bold text-sm text-[#FAF7F0]">{t.value}</span>
                <span className="text-[10px] text-[#B89B5E] font-mono">{t.unit}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
