import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import { adminApi } from "../../../services/adminApi";

export default function ViewEnquiry() {
    const navigate = useNavigate();

    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "View Enquiries | PowerAdmin";

        adminApi
            .get("/contactinquiries")
            .then(({ data }) => setEnquiries(data || []))
            .catch((err) => {
                console.error(err);
                setError("Failed to load enquiries. Please try again.");
            })
            .finally(() => setLoading(false));
    }, []);

    const handleView = (row) => {
        navigate(`/poweradmin/enquiry/detail/${row.id}`);
    };

    const columns = [
        {
            title: "FIRST NAME",
            data: "firstName",
        },
        {
            title: "LAST NAME",
            data: "lastName",
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
            title: "CITY",
            data: "city",
        },
        {
            title: "DATE",
            data: "createdAt",
            render: (val) =>
                `<span class="text-sm text-gray-600">${val ? new Date(val).toLocaleDateString() : "-"}</span>`,
        },
        {
            title: "ACTION",
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td, _, row) =>
                renderCell(td, <ActionButtons onView={() => handleView(row)} />),
        },
    ];

    return (
        <div>
            <PageHeader
                title="Enquiry Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "View Enquiries" },
                ]}
            />

            <div className="mt-10">
                {loading && <div className="py-10 text-center text-gray-400">Loading enquiries...</div>}

                {!loading && error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
                )}

                {!loading && !error && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-200 dark:bg-white/[0.03]">
                        <AppDataTable
                            data={enquiries}
                            columns={columns}
                            searchPlaceholder="Search enquiries..."
                        />
                    </div>
                )}
            </div>
        </div>
    );
}