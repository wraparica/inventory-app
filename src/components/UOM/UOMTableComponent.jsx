import { Pencil, Trash2 } from "lucide-react";
import Button from "../Ui/Button";
import { UOMActionComponent } from "./UOMActionComponent";
import { useState } from "react";
import { EmptyState } from "../StatusStates";
import { ConfirmationDialog } from "../Ui/ConfirmationDialog";


export default function UnitsTable({ data, onUOMAdded }) {
    const [showAddUOM, setShowAddUOM] = useState(false);
    const [showEditUOM, setShowEditUOM] = useState(false);
    const [showDeleteUOM, setShowDeleteUOM] = useState(false);
    const [item, setItem] = useState(null);
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

                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-center text-sm text-slate-300">
                        {data.length} units
                    </span>

                    <Button
                        type="button"
                        variant="outline"
                        disabled={false}
                        onClick={() => {
                            setShowAddUOM(true)
                        }}
                    >
                        Add UOM
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                {data.length === 0 && <EmptyState title="No Units of Measurement Yet" description="You haven't added any units of measurement yet. Add your first UOM to start managing your products accurately." />}

                {data.length > 0 &&
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
                            {data.map((unit) => (
                                <tr
                                    key={unit._id}
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
                                                onClick={() => {
                                                    setItem(unit);
                                                    setShowEditUOM(true);
                                                }}
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                aria-label={`Delete ${unit.name}`}
                                                className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                                                onClick={
                                                    () => {
                                                        setItem(unit);
                                                        setShowDeleteUOM(true);
                                                    }
                                                }
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>

            {(showAddUOM) && <UOMActionComponent
                onClose={(created) => {
                    setShowAddUOM(false);
                }}

                onSuccess={() =>
                    onUOMAdded()
                }
                mode={"create"}
                unit={null}
            />}

            {(showDeleteUOM) && <ConfirmationDialog unit={item}
                onClose={() => {
                    setShowDeleteUOM(false);
                    setItem(null);
                }}

                onSuccess={() =>
                    onUOMAdded()
                }

                title={`Delete ${item.name}`}
                description="Are you sure you want to delete?"
            />}

            {(showEditUOM) && <UOMActionComponent
                onClose={(created) => {
                    setShowEditUOM(false);
                    setItem(null);
                }}

                onSuccess={() =>
                    onUOMAdded()
                }

                mode={"edit"}
                unit={item}
            />}
        </div>

    );
}