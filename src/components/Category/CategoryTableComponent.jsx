import { Pencil, Trash2 } from "lucide-react";
import Button from "../Ui/Button";
import { CategoryActionComponent } from "./CategoryActionComponent";
import { useState, useEffect } from "react";
import { EmptyState, LoadingState, ErrorState } from "../StatusStates";
import { ConfirmationDialog } from "../Ui/ConfirmationDialog";
import Switch from "../Ui/Switch";
import { useDelete } from '../../hooks/category/useDeleteCategory'


export default function UnitsTable({ categories, onCategoryAdded }) {
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showEditCategory, setShowEditCategory] = useState(false);
    const [showDeleteCategory, setShowDeleteCategory] = useState(false);
    const [item, setItem] = useState(null);

    const { data, status, error, deleteCategory } = useDelete();
    
        useEffect(() => {
            if (status === 'success') {
                onCategoryAdded();
            }
        }, [status, onCategoryAdded]);
    return (
        <div className="w-full overflow-hidden rounded-xl border border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-700 p-5">
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Product Category
                        </h2>
                        <p className="text-sm text-slate-400">
                            Manage product categories
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-center text-sm text-slate-300">
                        {categories.length} categories
                    </span>

                    <Button
                        type="button"
                        variant="outline"
                        disabled={false}
                        onClick={() => {
                            setShowAddCategory(true)
                        }}
                    >
                        Add Category
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                {categories.length === 0 && <EmptyState title="No Categories Yet" description="You haven't added any category yet. Add your first category to start managing your products accurately." />}

                {categories.length > 0 &&
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-800/70 text-xs uppercase text-slate-400">
                            <tr>
                                <th className="px-5 py-4">Category Name</th>
                                <th className="px-5 py-4">Description</th>
                                <th className="px-5 py-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-800">
                            {categories.map((category) => (
                                <tr
                                    key={category._id}
                                    className="transition-colors hover:bg-slate-800/50"
                                >
                                    <td className="whitespace-nowrap px-5 py-4 font-medium text-white">
                                        {category.name}
                                    </td>
                                    <td className="px-5 py-4 text-slate-400">
                                        {category.description}
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                aria-label={`Edit ${category.name}`}
                                                className="rounded-lg p-2 text-slate-400 hover:bg-slate-700 hover:text-cyan-400"
                                                onClick={() => {
                                                    setItem(category);
                                                    setShowEditCategory(true);
                                                }}
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                aria-label={`Delete ${category.name}`}
                                                className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                                                onClick={
                                                    () => {
                                                        setItem(category);
                                                        setShowDeleteCategory(true);
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

            {(showAddCategory) && <CategoryActionComponent
                onClose={(created) => {
                    setShowAddCategory(false);
                }}

                onSuccess={() =>
                    onCategoryAdded()
                }
                mode={"create"}
                category={null}
            />}

            {(showDeleteCategory) && <ConfirmationDialog unit={item}
                onClose={() => {
                    setShowDeleteCategory(false);
                    setItem(null);
                }}

                onAccept={(id) => {
                    setShowDeleteCategory(false)
                    deleteCategory(id)
                }}

                title={`Delete ${item.name}`}
                description="Are you sure you want to delete?"
            />}

            {(showEditCategory) && <CategoryActionComponent
                onClose={(created) => {
                    setShowEditCategory(false);
                    setItem(null);
                }}

                onSuccess={() =>
                    onCategoryAdded()
                }

                mode={"edit"}
                category={item}
            />}

            {(status === "loading") && <LoadingState message="Loading…" />}

            {status === "error" && (
                <ErrorState message={error} />
            )}
        </div>

    );
}