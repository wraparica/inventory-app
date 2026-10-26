
import { useMemo, useState } from "react";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Package,
    PackageCheck,
    PackageX,
    AlertTriangle,
    ChevronLeft,
    ChevronRight,
    SlidersHorizontal,
    X,
} from "lucide-react";
import Button from "../Ui/Button";

const initialProducts = [
    {
        id: "1",
        name: 'Laptop 15.6"',
        sku: "LAP-001",
        category: "Electronics & Accessories",
        brand: "HP",
        uom: "Piece",
        stock: 25,
        price: 28999,
        minStock: 5,
        isActive: true,
    },
    {
        id: "2",
        name: "Wireless Mouse",
        sku: "ACC-002",
        category: "Electronics & Accessories",
        brand: "Logitech",
        uom: "Piece",
        stock: 50,
        price: 1250,
        minStock: 10,
        isActive: true,
    },
    {
        id: "3",
        name: "Notebook A5",
        sku: "ST-003",
        category: "Office Supplies",
        brand: "Generic",
        uom: "Piece",
        stock: 100,
        price: 45,
        minStock: 20,
        isActive: true,
    },
    {
        id: "4",
        name: "Printer Ink (Black)",
        sku: "INK-004",
        category: "Office Supplies",
        brand: "Epson",
        uom: "Piece",
        stock: 12,
        price: 650,
        minStock: 15,
        isActive: true,
    },
    {
        id: "5",
        name: "Bottled Water 500ml",
        sku: "FB-005",
        category: "Food & Beverages",
        brand: "Generic",
        uom: "Bottle",
        stock: 200,
        price: 15,
        minStock: 30,
        isActive: true,
    },
    {
        id: "6",
        name: "Disinfectant Spray",
        sku: "CL-006",
        category: "Cleaning Supplies",
        brand: "Generic",
        uom: "Bottle",
        stock: 36,
        price: 120,
        minStock: 10,
        isActive: true,
    },
    {
        id: "7",
        name: "Carton Box (Medium)",
        sku: "PK-007",
        category: "Packaging Materials",
        brand: "Generic",
        uom: "Piece",
        stock: 0,
        price: 45,
        minStock: 10,
        isActive: true,
    },
    {
        id: "8",
        name: "Screwdriver Set",
        sku: "TL-008",
        category: "Tools & Hardware",
        brand: "Stanley",
        uom: "Set",
        stock: 18,
        price: 350,
        minStock: 5,
        isActive: true,
    },
];

const formatPrice = (price) =>
    new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 2,
    }).format(price);

function getStockStatus(product) {
    if (product.stock === 0) {
        return { label: "Out of Stock", className: "bg-red-500/15 text-red-400" };
    }

    if (product.stock <= product.minStock) {
        return { label: "Low Stock", className: "bg-amber-500/15 text-amber-400" };
    }

    return { label: "In Stock", className: "bg-emerald-500/15 text-emerald-400" };
}

function SummaryCard({ title, value, icon: Icon, color }) {
    return (
        <div className="flex min-w-0 items-center gap-4 rounded-xl border border-slate-700/60 p-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${color}`}>
                <Icon size={23} />
            </div>

            <div className="min-w-0">
                <p className="text-sm text-slate-400">{title}</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                    {value}
                </p>
            </div>
        </div>
    );
}

function StatusBadge({ product }) {
    if (!product.isActive) {
        return (
            <span className="inline-flex whitespace-nowrap rounded-full bg-slate-500/15 px-3 py-1 text-xs font-medium text-slate-400">
                Inactive
            </span>
        );
    }

    const status = getStockStatus(product);

    return (
        <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${status.className}`}>
            {status.label}
        </span>
    );
}

export default function ProductsPage() {
    const [products, setProducts] = useState(initialProducts);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");
    const [brandFilter, setBrandFilter] = useState("All Brands");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [page, setPage] = useState(1);
    const [deleteProduct, setDeleteProduct] = useState(null);

    const pageSize = 8;

    const categories = [
        ...new Set(products.map((product) => product.category)),
    ];

    const brands = [
        ...new Set(products.map((product) => product.brand)),
    ];

    const filteredProducts = useMemo(() => {
        const query = search.trim().toLowerCase();

        return products.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(query) ||
                product.sku.toLowerCase().includes(query);

            const matchesCategory =
                categoryFilter === "All Categories" ||
                product.category === categoryFilter;

            const matchesBrand =
                brandFilter === "All Brands" ||
                product.brand === brandFilter;

            const matchesStatus =
                statusFilter === "All Status" ||
                (statusFilter === "Active" && product.isActive) ||
                (statusFilter === "Inactive" && !product.isActive) ||
                (statusFilter === "Low Stock" &&
                    product.isActive &&
                    product.stock > 0 &&
                    product.stock <= product.minStock) ||
                (statusFilter === "Out of Stock" &&
                    product.isActive &&
                    product.stock === 0);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesBrand &&
                matchesStatus
            );
        });
    }, [products, search, categoryFilter, brandFilter, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const visibleProducts = filteredProducts.slice(
        startIndex,
        startIndex + pageSize
    );

    const activeCount = products.filter((product) => product.isActive).length;
    const inactiveCount = products.length - activeCount;
    const outOfStockCount = products.filter(
        (product) => product.isActive && product.stock === 0
    ).length;

    const resetPage = (setter, value) => {
        setter(value);
        setPage(1);
    };

    const handleDelete = () => {
        setProducts((current) =>
            current.filter((product) => product.id !== deleteProduct.id)
        );
        setDeleteProduct(null);
    };

    const handleAddProduct = () => {
        // Connect this to your Add Product modal or route.
        alert("Connect your Add Product form here.");
    };

    const handleEditProduct = (product) => {
        // Open your edit modal and pass the selected product.
        alert(`Connect your edit form for ${product.name}.`);
    };

    return (
        <div className="min-h-full space-y-6 p-4 text-slate-100 sm:p-6">
            {/* Page header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                        Products
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Manage your inventory products
                    </p>
                </div>

                

                <Button
                    type="button"
                    variant="outline"
                    disabled={false}
                    onClick={handleAddProduct}
                >
                    Add Product
                </Button>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    title="Total Products"
                    value={products.length}
                    icon={Package}
                    color="bg-cyan-500/15 text-cyan-400"
                />
                <SummaryCard
                    title="Active Products"
                    value={activeCount}
                    icon={PackageCheck}
                    color="bg-emerald-500/15 text-emerald-400"
                />
                <SummaryCard
                    title="Inactive Products"
                    value={inactiveCount}
                    icon={PackageX}
                    color="bg-slate-500/15 text-slate-300"
                />
                <SummaryCard
                    title="Out of Stock"
                    value={outOfStockCount}
                    icon={AlertTriangle}
                    color="bg-red-500/15 text-red-400"
                />
            </div>

            {/* Search and filters */}
            <div className="rounded-xl border border-slate-700/60 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[minmax(220px,1.5fr)_repeat(3,minmax(140px,1fr))_auto]">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => resetPage(setSearch, e.target.value)}
                            placeholder="Search products or SKU..."
                            aria-label="Search products"
                            className="w-full rounded-lg border border-slate-700 bg-slate-900/60 py-3 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
                        />
                    </div>

                    <select
                        value={categoryFilter}
                        onChange={(e) => resetPage(setCategoryFilter, e.target.value)}
                        aria-label="Filter by category"
                        className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500"
                    >
                        <option>All Categories</option>
                        {categories.map((category) => (
                            <option key={category}>{category}</option>
                        ))}
                    </select>

                    <select
                        value={brandFilter}
                        onChange={(e) => resetPage(setBrandFilter, e.target.value)}
                        aria-label="Filter by brand"
                        className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500"
                    >
                        <option>All Brands</option>
                        {brands.map((brand) => (
                            <option key={brand}>{brand}</option>
                        ))}
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => resetPage(setStatusFilter, e.target.value)}
                        aria-label="Filter by status"
                        className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500"
                    >
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Low Stock</option>
                        <option>Out of Stock</option>
                    </select>

                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setCategoryFilter("All Categories");
                            setBrandFilter("All Brands");
                            setStatusFilter("All Status");
                            setPage(1);
                        }}
                        title="Reset filters"
                        aria-label="Reset filters"
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-700/60"
                    >
                        <SlidersHorizontal size={18} />
                        <span className="xl:hidden">Reset filters</span>
                    </button>
                </div>
            </div>

            {/* Products table */}
            <div className="overflow-hidden rounded-xl border border-slate-700/60">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] border-collapse text-left">
                        <thead className="bg-slate-800/80">
                            <tr className="text-xs uppercase tracking-wide text-slate-400">
                                <th className="px-5 py-4 font-medium">Product</th>
                                <th className="px-4 py-4 font-medium">Category</th>
                                <th className="px-4 py-4 font-medium">Brand</th>
                                <th className="px-4 py-4 font-medium">UOM</th>
                                <th className="px-4 py-4 font-medium">Stock</th>
                                <th className="px-4 py-4 font-medium">Price</th>
                                <th className="px-4 py-4 font-medium">Status</th>
                                <th className="px-5 py-4 text-right font-medium">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-700/50">
                            {visibleProducts.map((product) => (
                                <tr
                                    key={product.id}
                                    className="transition hover:bg-slate-700/20"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-cyan-400">
                                                <Package size={20} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-100">
                                                    {product.name}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-400">
                                                    SKU: {product.sku}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 text-sm text-slate-300">
                                        {product.category}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-slate-300">
                                        {product.brand}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-slate-300">
                                        {product.uom}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-slate-300">
                                        {product.stock}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-200">
                                        {formatPrice(product.price)}
                                    </td>
                                    <td className="px-4 py-4">
                                        <StatusBadge product={product} />
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleEditProduct(product)}
                                                aria-label={`Edit ${product.name}`}
                                                className="rounded-lg p-2.5 text-slate-300 transition hover:bg-cyan-500/15 hover:text-cyan-400"
                                            >
                                                <Pencil size={17} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeleteProduct(product)}
                                                aria-label={`Delete ${product.name}`}
                                                className="rounded-lg p-2.5 text-slate-300 transition hover:bg-red-500/15 hover:text-red-400"
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {visibleProducts.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-5 py-16 text-center">
                                        <Package
                                            size={32}
                                            className="mx-auto mb-3 text-slate-500"
                                        />
                                        <p className="font-medium text-slate-200">
                                            No products found
                                        </p>
                                        <p className="mt-1 text-sm text-slate-400">
                                            Try changing your search or filters.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col gap-3 border-t border-slate-700/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-400">
                        Showing{" "}
                        {filteredProducts.length === 0 ? 0 : startIndex + 1}
                        {" "}to{" "}
                        {Math.min(startIndex + pageSize, filteredProducts.length)}
                        {" "}of {filteredProducts.length} products
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            aria-label="Previous page"
                            className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <span className="px-3 text-sm text-slate-300">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            type="button"
                            disabled={currentPage === totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            aria-label="Next page"
                            className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete confirmation modal */}
            {deleteProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-title"
                        className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/15 text-red-400">
                                <Trash2 size={22} />
                            </div>
                            <button
                                type="button"
                                onClick={() => setDeleteProduct(null)}
                                aria-label="Close dialog"
                                className="text-slate-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <h2 id="delete-title" className="mt-4 text-lg font-semibold text-white">
                            Delete product?
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Are you sure you want to delete{" "}
                            <span className="font-medium text-slate-200">
                                {deleteProduct.name}
                            </span>
                            ? This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setDeleteProduct(null)}
                                className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-400"
                            >
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
