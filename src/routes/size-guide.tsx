import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size Guide — Àṣà & Style" },
      { name: "description", content: "Find your perfect fit with our comprehensive size guide." },
    ],
  }),
  component: SizeGuide,
});

const rows = [
  ["XS", "32", "24", "34", "8"],
  ["S", "34", "26", "36", "10"],
  ["M", "36", "28", "38", "12"],
  ["L", "38", "30", "40", "14"],
  ["XL", "40", "32", "42", "16"],
  ["2XL", "43", "35", "45", "18"],
  ["3XL", "46", "38", "48", "20"],
];

function SizeGuide() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      <h1 className="font-serif text-5xl">Size Guide</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">
        Measure yourself in your underwear with a soft measuring tape. Hold the tape snug but not tight.
      </p>

      <div className="mt-10 overflow-x-auto bg-card rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-forest text-ivory">
            <tr>
              <th className="p-4 text-left">Size</th>
              <th className="p-4 text-left">Bust (in)</th>
              <th className="p-4 text-left">Waist (in)</th>
              <th className="p-4 text-left">Hip (in)</th>
              <th className="p-4 text-left">UK</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-t">
                <td className="p-4 font-bold font-serif">{r[0]}</td>
                <td className="p-4">{r[1]}</td>
                <td className="p-4">{r[2]}</td>
                <td className="p-4">{r[3]}</td>
                <td className="p-4">{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {[
          { t: "Bust", d: "Around the fullest part of your chest, keeping the tape parallel to the floor." },
          { t: "Waist", d: "Around the narrowest part of your torso, just above the belly button." },
          { t: "Hip", d: "Around the fullest part of your hips, about 8 inches below the waist." },
        ].map((x) => (
          <div key={x.t} className="bg-card border rounded-xl p-5">
            <h3 className="font-serif text-xl">{x.t}</h3>
            <p className="text-sm text-muted-foreground mt-2">{x.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
