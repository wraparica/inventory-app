import { useGetAllUOM } from '../../hooks/uom/useGetAllUOM'
import { LoadingState, EmptyState, ErrorState } from '../../components/StatusStates';
import UOMTableComponent from '../UOM/UOMTableComponent'
import { useState, useEffect } from "react";

export default function UOMComponent() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { data, status, error } = useGetAllUOM(refreshTrigger);
    const handleUOMAdded = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    return (

        <div className="mt-6">

            {status === "idle" && <EmptyState />}

            {(status === "loading") && <LoadingState message="Loading…" />}

            {status === "error" && (
                <ErrorState message={error} />
            )}

            {status === "success" && data && (
                <UOMTableComponent units={data} onUOMAdded={handleUOMAdded} />
            )}

        </div>
    );
}