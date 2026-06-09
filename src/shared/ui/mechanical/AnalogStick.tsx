const RING_SIZES = [48, 34, 22] as const;

export function AnalogStick() {
  return (
    <div
      className="relative flex-none rounded-full"
      style={{
        width: 56,
        height: 56,
        background:
          'radial-gradient(circle at 50% 50%, var(--pdx-metal-100) 0%, var(--pdx-metal-500) 45%, var(--pdx-metal-900) 100%)',
        boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.5)',
      }}
    >
      {RING_SIZES.map((size) => (
        <div
          key={size}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: size, height: size, border: '1px solid rgba(255,255,255,0.1)' }}
        />
      ))}
      {/* Concave centre */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 18,
          height: 18,
          background:
            'radial-gradient(circle, var(--pdx-metal-900) 40%, var(--pdx-metal-500) 100%)',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.9)',
        }}
      />
    </div>
  );
}
