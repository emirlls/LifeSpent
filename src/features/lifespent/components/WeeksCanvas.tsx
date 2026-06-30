import { useEffect, useRef } from "react";

export function WeeksCanvas({ age, exp }: { age: number; exp: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = 7, G = 2, COLS = 52;
    const rows = Math.ceil(exp);
    canvas.width = COLS * (W + G);
    canvas.height = rows * (W + G);
    const lived = Math.floor(age * 52);
    let w = 0;
    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < COLS; col++) {
        ctx.fillStyle = w < lived ? "#F03D71" : w === lived ? "#FF9040" : "#16162A";
        ctx.fillRect(col * (W + G), r * (W + G), W, W);
        w++;
      }
    }
  }, [age, exp]);
  return (
    <canvas
      ref={ref}
      style={{ maxWidth: "100%", borderRadius: "4px", display: "block", margin: "0 auto" }}
    />
  );
}
