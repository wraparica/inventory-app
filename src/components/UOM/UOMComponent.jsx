import { useGetAllUOM } from '../../hooks/uom/useGetAllUOM'
import { LoadingState, EmptyState, ErrorState } from '../../components/StatusStates';
import UOMTableComponent from '../UOM/UOMTableComponent'
import { useState, useEffect } from "react";

export default function UOMComponent() {
    console.log("UOMComponent rendered");

    useEffect(() => {
        console.log("UOMComponent mounted");

        return () => {
            console.log("UOMComponent unmounted");
        };
    }, []);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { data, status, error } = useGetAllUOM(refreshTrigger);
    const handleUOMAdded = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    return (

        <div className="mt-6">

            {status === "idle" && <EmptyState />}

            {status === "loading" && <LoadingState />}

            {status === "error" && (
                <ErrorState message={error} />
            )}

            {status === "success" && data && (
                <UOMTableComponent data={data} onUOMAdded={handleUOMAdded} />
            )}

        </div>
    );
}