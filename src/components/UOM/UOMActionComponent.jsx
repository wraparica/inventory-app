import { useState, useEffect } from 'react';
import { usePost } from '../../hooks/uom/useCreateUOM'
import { useEditUOM } from '../../hooks/uom/useEditUOM'
import TextInput from "../Ui/TextInput";
import FormError from "../Ui/FormError";
import Button from "../Ui/Button";
import { LoadingState, ErrorState } from '../StatusStates';

export function UOMActionComponent({ onClose, onSuccess, unit, mode }) {
    const { data, status, error, createUOM } = usePost();
    const {
        data: editData,
        status: editStatus,
        error: editError,
        updateUOM,
    } = useEditUOM();
    const [form, setForm] = useState({
        name: mode === "edit" ? unit?.name ?? '' : '',
        symbol: mode === "edit" ? unit?.symbol ?? '' : '',
        description: mode === "edit" ? unit?.description ?? '' : '',
    });


    const [errors, setErrors] = useState({});
    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                return value.trim().length < 1
                    ? 'Name is required'
                    : '';

            case 'symbol':
                return value.trim().length < 1
                    ? 'Symbol is required'
                    : '';

            case 'description':
                return value.trim().length < 1
                    ? 'Description is required'
                    : '';

            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear the field error while the user corrects it.
        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            name: validateField('name', form.name),
            symbol: validateField('symbol', form.symbol),
            description: validateField('description', form.description),
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) {
            return;
        }

        const payload = {
            name: form.name.trim(),
            symbol: form.symbol.trim(),
            description: form.description.trim(),
        };

        if (mode === "create") {
            createUOM(payload.name, payload.symbol, payload.description);
        } else if (mode === "edit" && unit?._id) {
            updateUOM(unit._id, payload.name, payload.symbol, payload.description);
        }
    };

    const isFormValid =
        form.name.trim().length > 0 &&
        form.symbol.trim().length > 0 &&
        form.description.trim().length > 0;

    useEffect(() => {
        if (status === 'success' || editStatus === 'success') {
            onSuccess();
        }
    }, [status, editStatus, onSuccess]);

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1118]/80 p-4 backdrop-blur-sm">
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="loading-title"
                    className="relative flex w-full max-w-sm flex-col gap-4 rounded-xl border border-[#253241] bg-[#111A24] px-10 py-8 text-center shadow-2xl"
                >
                    <h1 className="font-serif text-3xl text-slate-50 sm:text-2xl">
                        {mode === "edit" ? "Edit UOM" : "Add UOM"}
                    </h1>

                    {/* Name */}
                    <TextInput
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Unit Name"
                        ariaLabel="Unit Name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                            errors.name ? "name-error" : undefined
                        }
                        autoComplete="name"
                        required
                    />

                    {errors.name && (
                        <div className="text-left">
                            <FormError id="name-error">
                                {errors.name}
                            </FormError>
                        </div>
                    )}



                    {/* Symbol */}
                    <TextInput
                        type="text"
                        name="symbol"
                        value={form.symbol}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Symbol"
                        ariaLabel="Symbol"
                        aria-invalid={Boolean(errors.symbol)}
                        aria-describedby={
                            errors.symbol ? "symbol-error" : undefined
                        }
                        autoComplete="symbol"
                        required
                    />

                    {errors.symbol && (
                        <div className="text-left">
                            <FormError id="symbol-error">
                                {errors.symbol}
                            </FormError>
                        </div>
                    )}

                    {/* Description */}
                    <TextInput
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Description"
                        ariaLabel="Description"
                        aria-invalid={Boolean(errors.description)}
                        autoComplete="description"
                        required
                    />

                    {errors.description && (
                        <div className="text-left">
                            <FormError id="description-error">
                                {errors.description}
                            </FormError>
                        </div>
                    )}


                    <div className="mt-4 flex flex-row gap-3">
                        <Button
                            type="submit"
                            variant="outline"
                            disabled={status === "loading" || editStatus === "loading" || !isFormValid}
                            className="flex-1"
                        >
                            {mode === "edit" ? "Update" : "Add"}
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </div>


                    {(status === "loading" || editStatus === "loading") &&
                        <LoadingState message="Loading…" />
                    }

                    {(editStatus === "loading") &&
                        <LoadingState message="Loading…" />
                    }

                    {status === "error" && (
                        <ErrorState message={error} />
                    )}

                    {editStatus === "error" && (
                        <ErrorState message={editError} />
                    )}


                </div>
            </div>
        </form>
    );
}