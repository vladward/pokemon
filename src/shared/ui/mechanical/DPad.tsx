const armStyle = {
  background:
    'linear-gradient(to bottom, var(--pdx-metal-100) 0%, var(--pdx-metal-500) 100%)',
  boxShadow: 'inset 0 -2px 3px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.15)',
};

const ARROW_COLOR = 'rgba(255,255,255,0.22)';

export function DPad() {
  return (
    <div className="relative flex-none" style={{ width: 110, height: 110 }}>
      {/* Horizontal arm */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 rounded-sm"
        style={{ ...armStyle, width: '100%', height: '34%' }}
      />
      {/* Vertical arm */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 rounded-sm"
        style={{ ...armStyle, width: '34%', height: '100%' }}
      />
      {/* Center cap */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm"
        style={{
          width: '34%',
          height: '34%',
          background:
            'radial-gradient(circle, var(--pdx-metal-100) 0%, var(--pdx-metal-500) 100%)',
        }}
      />
      {/* Directional arrow markers */}
      <svg
        className="pointer-events-none absolute inset-0"
        width="110"
        height="110"
        viewBox="0 0 110 110"
        aria-hidden
      >
        {/* Up arrow */}
        <polygon points="55,10 49,20 61,20" fill={ARROW_COLOR} />
        {/* Down arrow */}
        <polygon points="55,100 49,90 61,90" fill={ARROW_COLOR} />
        {/* Left arrow */}
        <polygon points="10,55 20,49 20,61" fill={ARROW_COLOR} />
        {/* Right arrow */}
        <polygon points="100,55 90,49 90,61" fill={ARROW_COLOR} />
      </svg>
    </div>
  );
}
