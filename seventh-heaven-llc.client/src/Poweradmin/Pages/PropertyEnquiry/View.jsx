import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import { adminApi } from "../../../services/adminApi";
import { resolveAssetPath } from "../../../utils/assetPath";
import { showToast } from "../../../lib/toast";

export default function View() {
    const navigate = useNavigate();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "View Listed Properties | PowerAdmin";
    }, []);

    const load = useCallback(() => {
        setLoading(true);
        setError("");
        adminApi
            .get("/propertyinquiries")
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
            await adminApi.delete(`/propertyinquiries/${row.id}`);
            setProperties((prev) => prev.filter((p) => p.id !== row.id));
            showToast.deleted("Property");
        } catch (err) {
            console.error(err);
            showToast.error("Failed to delete property. Please try again.");
        }
    };

    const handleView = (row) => {
        navigate(`/poweradmin/property/enquiry/detail/${row.id}`);
    };

    const columns = [
        {
            title: "FIRST NAME",
            data: "firstname",
        },
        {
            title: "LAST NAME",
            data: "lastname",
        },
        {
            title: "PHONE",
            data: "phone",
        },
        {
            title: "EMAIL",
            data: "email",
        },
        {
            title: "PROPERTY TYPE",
            data: "propertyType",
        },
        {
            title: "VISIT DATE",
            data: "visitDate",
            render: (val) =>
                `<span class="text-sm text-gray-600">${val ? new Date(val).toLocaleDateString() : "—"}</span>`,
        },
        {
            title: "ACTION",
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td, _, row) =>
                renderCell(
                    td,
                    <ActionButtons
                        onView={() => handleView(row)}
                        //onDelete={() => handleDelete(row)}
                    />
                ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="Property Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "View Listed Properties" },
                ]}
            />

            <div className="mt-10">
                {loading && <div className="py-10 text-center text-gray-400"> Loading Listed Properties…</div>}

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
