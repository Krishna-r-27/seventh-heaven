import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { adminApi } from "../../../services/adminApi";

function Info({ label, value }) {
    return (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="mb-1 text-xs text-gray-500">{label}</p>
            <p className="whitespace-pre-wrap text-sm font-medium text-gray-800">
                {value || "-"}
            </p>
        </div>
    );
}

export default function ViewDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(() => Boolean(id));
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            return;
        }

        adminApi
            .get(`/contactinquiries/${id}`)
            .then((res) => setData(res.data))
            .catch((err) => {
                console.error(err);
                setError("Failed to load enquiry details. Please try again.");
            })
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <div>
            <PageHeader
                title="Enquiry Details"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "Enquiries", href: "/poweradmin/enquiry" },
                    { label: "Details" },
                ]}
            />

            <div className="mt-10">
                {loading && <div className="py-10 text-center text-gray-400">Loading...</div>}

                {!loading && error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
                )}

                {!loading && !error && data && (
                    <div className="mx-auto max-w-5xl space-y-6">
                        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-800">Contact Enquiry Overview</h2>

                                <button
                                    onClick={() => navigate(-1)}
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                                >
                                    Back
                                </button>
                            </div>

                            <div className="mb-8">
                                <h3 className="mb-4 border-b pb-2 text-md font-semibold text-gray-700">
                                    Customer Information
                                </h3>

                                <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                                    <Info label="First Name" value={data.firstName} />
                                    <Info label="Last Name" value={data.lastName} />
                                    <Info label="Phone" value={data.phone} />
                                    <Info label="Email" value={data.email} />
                                    <Info label="City" value={data.city} />
                                    <Info
                                        label="Enquiry Date"
                                        value={data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "-"}
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-4 border-b pb-2 text-md font-semibold text-gray-700">
                                    Message
                                </h3>
                                <div className="whitespace-pre-wrap rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                                    {data.message || "-"}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
