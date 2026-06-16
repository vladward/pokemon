export function PokedexContactShadow() {
  return (
    <>
      {/* Dense core shadow — sits tight under the device */}
      <div
        className="pointer-events-none absolute -bottom-3 left-1/2 h-6 w-[70%] -translate-x-1/2"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.75) 0%, transparent 80%)',
          filter: 'blur(6px)',
        }}
      />
      {/* Wide soft falloff — simulates ambient occlusion spread */}
      <div
        className="pointer-events-none absolute -bottom-8 left-1/2 h-14 w-[95%] -translate-x-1/2"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.40) 0%, transparent 70%)',
          filter: 'blur(14px)',
        }}
      />
    </>
  );
}
