import { useState, useEffect } from 'react';
import Button from "../Ui/Button";
import { LoadingState, ErrorState } from '../../components/StatusStates';
import { useDelete } from '../../hooks/uom/useDeleteUOM'

export function ConfirmationDialog({ unit, onClose, onSuccess }) {
    const { data, status, error, deleteUOM } = useDelete();
    useEffect(() => {
        if (status === 'success') {
            onSuccess();
        }
    }, [status, onSuccess]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1118]/80 p-4 backdrop-blur-sm">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="loading-title"
                className="relative flex w-full max-w-sm flex-col gap-4 rounded-xl border border-[#253241] bg-[#111A24] px-10 py-8 text-center shadow-2xl"
            >
                <p className="font-mono text-s uppercase tracking-[0.2em] text-cyan-400">
                    Delete {unit.name}
                </p>
                <h1 className="font-serif text-xl text-slate-50 sm:text-xl">Are you sure you want to delete?</h1>

                <div className="mt-4 flex flex-row gap-3">
                    <Button
                        type="button"
                        variant="delete"
                        onClick={() => deleteUOM(unit._id)}
                        className="flex-1"
                    >
                        Delete
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                </div>


                {(status === "loading") && <LoadingState />}

                {status === "error" && (
                    <ErrorState message={error} />
                )}

            </div>
        </div>
    );
}