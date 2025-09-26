import FillTilesGame from "@/components/FillTilesGame";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <FillTilesGame rows={5} cols={5} start={{ row: 0, col: 0 }} disabledTiles={[{ row: 2, col: 3 },
    { row: 1, col: 1 },
    { row: 3, col: 0 },
    { row: 4, col: 4 },]} />
    </div>
  );
}
