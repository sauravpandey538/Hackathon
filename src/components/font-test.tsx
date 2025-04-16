export function FontTest() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Default Font (Inter)</h2>
        <p className="text-lg font-bold">
          abcdefghijklmnopqrstuvwxyz
        </p>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Monospace Font (JetBrains Mono)</h2>
        <p className="text-lg font-mono">
          abcdefghijklmnopqrstuvwxyz
        </p>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Display Font (Space Grotesk)</h2>
        <p className="text-lg font-display">
          abcdefghijklmnopqrstuvwxyz
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Code Font (Fira Code)</h2>
        <p className="text-lg font-code">
          abcdefghijklmnopqrstuvwxyz
        </p>
      </div>
    </div>
  );
} 