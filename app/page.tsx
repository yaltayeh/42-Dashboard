import { Detils } from "@/components/detils";
import Refresh from "@/components/refresh";
import { Timer } from "@/components/timer";
import { cn } from "@/lib/utils";
import { BlockFrame } from "@/types/definitions";

export default function Home() {
  const cols = 20;
  const rows = 10;
  const unit_x = 100 / (cols - 1);
  const unit_y = 100 / (rows - 1);

  const blocks: BlockFrame[] = [
    { x: 0, y: 0, z: 1, w: 2, h: 3, component: Detils },
    { x: 3, y: 4, z: 1, w: 2, h: 4, component: Timer },
    { x: 7, y: 4, z: 2, w: 3, h: 2, component: Detils },
    { x: 5, y: 6, z: 1, w: 2, h: 2, component: Detils },
    { x: 0, y: 0, z: 100, w: 1, h: 1, component: Refresh, isBoard: false },
  ]

  const dots = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const left = col * unit_x;
      const top = row * unit_y;
      dots.push(
        <div
          key={`${row}-${col}`}
          className="w-1 h-1 bg-black rounded-full absolute"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      );
    }
  }

  return (
    <main className=" ">
      <div className="w-full h-full fixed justify-center bg-white p-5">
        <div className=" relative w-full h-full bg-gray-600 rounded-2xl">
          <div className="relative w-full h-full">
            {blocks.map((rec, index) => (
              <div key={index}
                className={cn("absolute", rec.isBoard === false ? "" : "bg-gray-500 border-2 border-black/20 rounded-2xl")}
                style={{
                  left: `${rec.x * unit_x}%`,
                  top: `${rec.y * unit_y}%`,
                  zIndex: rec.z,
                  width: `${rec.w * unit_x}%`,
                  height: `${rec.h * unit_y}%`
                }}>
                {rec.component && <rec.component
                  x={rec.x}
                  y={rec.y}
                  z={rec.z}
                  w={rec.w}
                  h={rec.h}
                />}
              </div>
            ))}
            <div>{dots}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
