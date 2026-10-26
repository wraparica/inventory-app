import { useGetAllCategory } from '../../hooks/category/useGetAllCategory'
import { LoadingState, EmptyState, ErrorState } from '../../components/StatusStates';
import CategoryTableComponent from './CategoryTableComponent'
import { useState, useEffect } from "react";

export default function CategoryComponent() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { data, status, error } = useGetAllCategory(refreshTrigger);
    const handleCategoryAdded = () => {
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
                <CategoryTableComponent categories={data} onCategoryAdded={handleCategoryAdded} />
            )}

        </div>
    );
}