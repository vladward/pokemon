import Image from 'next/image';

interface Props {
  sprite: string | null;
  spriteArtwork: string | null;
  name: string;
}

export function SpriteStage({ sprite, spriteArtwork, name }: Props) {
  const image = spriteArtwork ?? sprite;

  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden" style={{ maxHeight: '260px' }}>
      {/* Radial backlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 55%, var(--pdx-hud-cyan-glow) 0%, transparent 60%)',
        }}
      />

      {/* Arena corner bracket markers */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* Top-left */}
        <path d="M4 14 L4 4 L14 4" stroke="var(--pdx-hud-cyan)" strokeWidth="0.8" strokeOpacity="0.55" fill="none" strokeLinecap="round" />
        {/* Top-right */}
        <path d="M86 4 L96 4 L96 14" stroke="var(--pdx-hud-cyan)" strokeWidth="0.8" strokeOpacity="0.55" fill="none" strokeLinecap="round" />
        {/* Bottom-left */}
        <path d="M4 86 L4 96 L14 96" stroke="var(--pdx-hud-cyan)" strokeWidth="0.8" strokeOpacity="0.55" fill="none" strokeLinecap="round" />
        {/* Bottom-right */}
        <path d="M86 96 L96 96 L96 86" stroke="var(--pdx-hud-cyan)" strokeWidth="0.8" strokeOpacity="0.55" fill="none" strokeLinecap="round" />
      </svg>

      {/* Reticle SVG ring */}
      <svg
        viewBox="0 0 160 160"
        className="pointer-events-none absolute h-52 w-52 motion-safe:animate-reticle-pulse"
        fill="none"
        aria-hidden
      >
        <circle
          cx="80"
          cy="80"
          r="70"
          stroke="var(--pdx-hud-cyan)"
          strokeWidth="0.8"
          strokeOpacity="0.35"
          strokeDasharray="4 6"
        />
        <circle
          cx="80"
          cy="80"
          r="60"
          stroke="var(--pdx-hud-cyan)"
          strokeWidth="0.5"
          strokeOpacity="0.2"
        />
        {/* Tick marks at cardinal points */}
        <line x1="80" y1="8" x2="80" y2="18" stroke="var(--pdx-hud-cyan)" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="80" y1="142" x2="80" y2="152" stroke="var(--pdx-hud-cyan)" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="8" y1="80" x2="18" y2="80" stroke="var(--pdx-hud-cyan)" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="142" y1="80" x2="152" y2="80" stroke="var(--pdx-hud-cyan)" strokeWidth="1.5" strokeOpacity="0.6" />
      </svg>

      {image ? (
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          priority
          className="relative z-10 h-52 w-52 select-none object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)] motion-safe:animate-image-breath"
        />
      ) : (
        <div className="h-52 w-52 rounded-full opacity-20" style={{ background: 'var(--pdx-hud-cyan)' }} />
      )}
    </div>
  );
}
