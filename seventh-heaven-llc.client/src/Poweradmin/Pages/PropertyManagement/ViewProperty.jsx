import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import { adminApi } from "../../../services/adminApi";
import { resolveAssetPath } from "../../../utils/assetPath";
import { showToast } from "../../../lib/toast";
//import "datatables.net-dt/css/jquery.dataTables.css";

/*
  ViewProperty
  - Mirrors the pattern used by ViewZodiac/ViewCategory:
    * PageHeader
    * AppDataTable driven by columns array
    * ActionButtons for edit/delete
    * Status toggle (Show on homepage) rendered via createdCell
*/

export default function ViewProperty() {
    const navigate = useNavigate();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "View Properties | PowerAdmin";
    }, []);

    const load = useCallback(() => {
        setLoading(true);
        setError("");
        adminApi
            .get("/properties")
            .then(({ data }) => setProperties(data || []))
            .catch((err) => {
                console.error(err);
                setError("Failed to load properties. Please try again.");
            })
            .finally(() => setLoading(false));
    }, []);

    // Load data only on mount - empty dependency array ensures this runs once
    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (row) => {
        if (!window.confirm(`Delete "${row.title}"? This cannot be undone.`)) return;
        try {
            await adminApi.delete(`/properties/${row.id}`);
            setProperties((prev) => prev.filter((p) => p.id !== row.id));
            showToast.deleted("Property");
        } catch (err) {
            console.error(err);
            showToast.error("Failed to delete property. Please try again.");
        }
    };

    const handleEdit = (row) => {
        navigate(`/poweradmin/properties/edit/${row.id}`);
    };

    const columns = [
        {
            title: "VISIBLE",
            data: "isVisible",
            defaultContent: false,
            render: (val) => (val ? "True" : "False"),
        },
        {
            title: "IMAGE",
            data: "images",
            orderable: false,
            searchable: false,
            render: (imgs) => {
                const first = (imgs || [])[0];
                if (!first?.imageUrl) return `<span class="text-gray-300 text-xs">—</span>`;
                const src = first.imageUrl.startsWith("/uploads/") ? resolveAssetPath(first.imageUrl) : first.imageUrl;
                return `<img src="${src}" alt="property" class="h-10 w-10 rounded object-cover" />`;
            },
        },
        {
            title: "TITLE",
            data: "title",
        },
        {
            title: "TYPE",
            data: "propertyType",
            render: (val) => `<span class="text-sm text-gray-600">${val ?? "—"}</span>`,
        },
        {
            title: "GUESTS",
            data: "guestrooms",
            render: (val) => `<span class="text-sm text-gray-600">${val ?? 0}</span>`,
        },
        {
            title: "BEDROOMS",
            data: "bedrooms",
            render: (val) => `<span class="text-sm text-gray-600">${val ?? 0}</span>`,
        },
        {
            title: "BATHROOMS",
            data: "bathrooms",
            render: (val) => `<span class="text-sm text-gray-600">${val ?? 0}</span>`,
        },
        //{
        //  title: "SHOW ON HOMEPAGE",
        //  data: "showOnHomepage",
        //  orderable: false,
        //  searchable: false,
        //  createdCell: (td, cellData, row) =>
        //    renderCell(
        //      td,
        //      <ShowOnHomepageToggle
        //        row={row}
        //        onToggled={(updated) =>
        //          setProperties((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
        //        }
        //      />
        //    ),
        //},
        {
            title: "SORT ORDER",
            data: "sortOrder",
        },
        {
            title: "ACTION",
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td, _, row) =>
                renderCell(
                    td,
                    <ActionButtons onEdit={() => handleEdit(row)} onDelete={() => handleDelete(row)} />
                ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="Property Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "View Properties" },
                ]}
            />

            <div className="mt-10">
                {loading && <div className="py-10 text-center text-gray-400">Loading properties…</div>}

                {!loading && error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
                )}

                {!loading && !error && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-200 dark:bg-white/[0.03]">
                        <div className="mb-4 flex justify-end">
                            <button
                                onClick={() => navigate("/poweradmin/properties/add")}
                                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
                            >
                                + Add Property
                            </button>
                        </div>

                        <AppDataTable data={properties} columns={columns} searchPlaceholder="Search properties..." />
                    </div>
                )}
            </div>
        </div>
    );
}

// Toggle component for "Show on homepage"
function ShowOnHomepageToggle({ row, onToggled }) {
    const [saving, setSaving] = useState(false);

    const handleToggle = async () => {
        setSaving(true);
        try {
            await adminApi.patch(`/properties/${row.id}/toggle-homepage`);
            onToggled({ ...row, showOnHomepage: !row.showOnHomepage });
            showToast.statusUpdated?.();
        } catch (err) {
            console.error(err);
            showToast.error("Failed to update homepage flag.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={saving}
            className={`rounded-full px-3 py-1 text-xs font-medium disabled:opacity-50 ${row.showOnHomepage ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
        >
            {row.showOnHomepage ? "Shown" : "Not shown"}
        </button>
    );
}
