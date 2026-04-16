import type { JSX } from "react";

function buildMatrix(seed: string): boolean[][] {
  const size = 21;
  const matrix = Array.from({ length: size }, () => Array.from({ length: size }, () => false));
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }

  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      const value = (hash + row * 17 + column * 31 + (row ^ column) * 13) % 7;
      matrix[row][column] = value === 0 || value === 2 || value === 5;
    }
  }

  const paintFinder = (rowStart: number, columnStart: number) => {
    for (let row = 0; row < 7; row += 1) {
      for (let column = 0; column < 7; column += 1) {
        const isBorder = row === 0 || row === 6 || column === 0 || column === 6;
        const isCenter = row >= 2 && row <= 4 && column >= 2 && column <= 4;
        matrix[rowStart + row][columnStart + column] = isBorder || isCenter;
      }
    }
  };

  paintFinder(0, 0);
  paintFinder(0, size - 7);
  paintFinder(size - 7, 0);

  return matrix;
}

export function AuthQrPreview({ payload, caption }: { payload: string; caption: string }): JSX.Element {
  const matrix = buildMatrix(payload);

  return (
    <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-500">QR Payload</div>
          <p className="mt-1 text-sm text-slate-600">{caption}</p>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-600">
          Live data
        </div>
      </div>

      <div className="mt-5 rounded-[1.4rem] bg-slate-950 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
        <div
          className="mx-auto grid w-full max-w-[220px] gap-[1px] rounded-2xl bg-slate-950"
          style={{ gridTemplateColumns: "repeat(21, minmax(0, 1fr))" }}
        >
          {matrix.flatMap((row, rowIndex) =>
            row.map((cell, columnIndex) => (
              <span
                key={`${rowIndex}-${columnIndex}`}
                className={`block aspect-square rounded-[1.5px] ${cell ? "bg-white" : "bg-slate-950"}`}
              />
            )),
          )}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">Current payload</div>
        <p className="mt-1 break-words text-xs leading-5 text-slate-600">{payload}</p>
      </div>
    </div>
  );
}
