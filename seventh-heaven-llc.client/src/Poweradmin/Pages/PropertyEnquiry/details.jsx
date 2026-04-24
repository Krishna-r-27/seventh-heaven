import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { adminApi } from "../../../services/adminApi";

export default function details() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        adminApi
            .get(`/propertyinquiries/${id}`)
            .then((res) => setData(res.data))
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <div>
            <PageHeader
                title="Property Details"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "Properties", href: "/poweradmin/properties" },
                    { label: "Details" },
                ]}
            />

            <div className="mt-10">
                {loading && (
                    <div className="text-center py-10 text-gray-400">
                        Loading...
                    </div>
                )}

                {!loading && data && (
                    <div className="max-w-5xl mx-auto space-y-6">

                        {/* CARD */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

                            {/* HEADER */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Property Overview
                                </h2>

                                <button
                                    onClick={() => navigate(-1)}
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-indigo-600 px-4 py-2 text-sm text-white font-medium hover:bg-indigo-700 transition"
                                >
                                    ← Back
                                </button>
                            </div>

                            {/* BASIC INFO */}
                            {/* BASIC INFO */}
                            <div className="mb-8">
                                <h3 className="text-md font-semibold text-gray-700 mb-4 border-b pb-2">
                                    Customer Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                    <Info label="First Name" value={data.firstname} />
                                    <Info label="Last Name" value={data.lastname} />
                                    <Info label="Phone" value={data.phone} />
                                    <Info label="Email" value={data.email} />
                                </div>
                            </div>

                            {/* INQUIRY INFO */}
                            <div className="mb-8">
                                <h3 className="text-md font-semibold text-gray-700 mb-4 border-b pb-2">
                                    Inquiry Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                    <Info label="Property Type" value={data.propertyType} />
                                    <Info label="No. of Persons" value={data.noOfPersons} />
                                    <Info
                                        label="Visit Date"
                                        value={data.visitDate ? new Date(data.visitDate).toLocaleDateString() : "—"}
                                    />
                                    <Info
                                        label="Enquiry Date"
                                        value={data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "—"}
                                    />
                                </div>
                            </div>

                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    function Info({ label, value }) {
        return (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-sm font-medium text-gray-800">
                    {value || "—"}
                </p>
            </div>
        );
    }
}

