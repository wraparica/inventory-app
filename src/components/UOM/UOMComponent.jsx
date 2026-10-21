import { Ruler, Pencil, Trash2 } from "lucide-react";
import Button from "../Ui/Button";

const units = [
    { id: 1, name: "Piece", symbol: "pcs", description: "Phones, cables, tools" },
    { id: 2, name: "Kilogram", symbol: "kg", description: "Rice, flour, raw materials" },
    { id: 3, name: "Gram", symbol: "g", description: "Ingredients, small materials" },
    { id: 4, name: "Liter", symbol: "L", description: "Oil, liquids" },
    { id: 5, name: "Milliliter", symbol: "mL", description: "Small liquid containers" },
    { id: 6, name: "Box", symbol: "box", description: "Packaged goods" },
    { id: 7, name: "Pack", symbol: "pack", description: "Batteries, bundled products" },
    { id: 8, name: "Dozen", symbol: "dozen", description: "Eggs, bulk items" },
    { id: 9, name: "Roll", symbol: "roll", description: "Tape, paper, cables" },
    { id: 10, name: "Bottle", symbol: "bottle", description: "Drinks, cleaning products" },
    { id: 11, name: "Bag", symbol: "bag", description: "Cement, soil, rice bags" },
    { id: 12, name: "Carton", symbol: "carton", description: "Wholesale packaged goods" },
];

export default function UnitsTable() {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-700 p-5">
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Units of Measurement
                        </h2>
                        <p className="text-sm text-slate-400">
                            Manage product measurement units
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                        {units.length} units
                    </span>

                    <Button
                        type="button"
                        variant="outline"
                        disabled={false}
                    >
                        Add UOM
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-800/70 text-xs uppercase text-slate-400">
                        <tr>
                            <th className="px-5 py-4">Unit Name</th>
                            <th className="px-5 py-4">Symbol</th>
                            <th className="px-5 py-4">Description</th>
                            <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-800">
                        {units.map((unit) => (
                            <tr
                                key={unit.id}
                                className="transition-colors hover:bg-slate-800/50"
                            >
                                <td className="whitespace-nowrap px-5 py-4 font-medium text-white">
                                    {unit.name}
                                </td>
                                <td className="px-5 py-4">
                                    <span className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 font-medium text-cyan-400">
                                        {unit.symbol}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-slate-400">
                                    {unit.description}
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            aria-label={`Edit ${unit.name}`}
                                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-700 hover:text-cyan-400"
                                            onClick={() => console.log("Edit unit:", unit)}
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label={`Delete ${unit.name}`}
                                            className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                                            onClick={() => console.log("Delete unit:", unit)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}