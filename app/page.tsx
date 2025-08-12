import { DataProvider } from "@/context/data-store";
import pb from "@/lib/pocketbase";
import { cn } from "@/lib/utils";
import { componentsMap } from "@/types/data-define";
import { Block, ComponentsOptions, Layout } from "@/types/definitions";

function CallComponent({ block }: { block: Block }) {
  const Component = componentsMap[block.component || ComponentsOptions.Detils];

  return (
    <Component
      x={block.x || 0}
      y={block.y || 0}
      z={block.z || 1}
      w={block.w || 1}
      h={block.h || 1}
    />
  )
}

export default async function Home() {
  let cols = 50;
  let rows = 10;

  const blocks: Block[] = [
    {
      x: 0,
      y: 0,
      z: 100,
      w: 1,
      h: 1,
      component: ComponentsOptions.Refresh,
      isBoard: false
    }
  ]


  try {
    const layout = await pb.collection("layouts")
      .getFirstListItem<Layout>("")
    rows = layout.rows;
    cols = layout.cols;

    if (layout.blocks)
      blocks.push(...layout.blocks)

  } catch {
  }

  const unit_x = 100 / (cols - 1);
  const unit_y = 100 / (rows - 1);

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
            <DataProvider>
              {blocks.map((block, index) => (
                <div key={index}
                  className={cn("absolute", block.isBoard === false ? "" : "bg-gray-500 border-2 border-black/20 rounded-2xl")}
                  style={{
                    left: `${(block.x || 0) * unit_x}%`,
                    top: `${(block.y || 0) * unit_y}%`,
                    zIndex: block.z || 1,
                    width: `${(block.w || 1) * unit_x}%`,
                    height: `${(block.h || 1) * unit_y}%`
                  }}>
                  <CallComponent block={block} />
                </div>
              ))}
            </DataProvider>
            <div>{dots}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
