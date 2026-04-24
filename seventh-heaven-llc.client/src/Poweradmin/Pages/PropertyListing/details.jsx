import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { adminApi } from "../../../services/adminApi";

export default function Details() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        adminApi
            .get(`/propertylistings/${id}`)
            .then((res) => setData(res.data))
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, [id]);

    //return (
    //    <div>
    //        <PageHeader
    //            title="Property Details"
    //            breadcrumbs={[
    //                { label: "Dashboard", href: "/poweradmin" },
    //                { label: "Properties", href: "/poweradmin/properties" },
    //                { label: "Details" },
    //            ]}
    //        />

    //        <div className="mt-10">
    //            {loading && <div className="text-center py-10 text-gray-400">Loading...</div>}

    //            {!loading && data && (
    //                <div className="max-w-4xl mx-auto bg-white shadow rounded-2xl p-6 space-y-6">

    //                    {/* Basic Info */}
    //                    <div>
    //                        <h2 className="text-lg font-semibold mb-3">Basic Information</h2>
    //                        <div className="grid grid-cols-2 gap-4 text-sm">
    //                            <p><b>First Name:</b> {data.firstname}</p>
    //                            <p><b>Last Name:</b> {data.lastname}</p>
    //                            <p><b>Phone:</b> {data.phone}</p>
    //                            <p><b>Email:</b> {data.email}</p>
    //                            <p><b>City:</b> {data.city}</p>
    //                            <p><b>Property Type:</b> {data.propertyType}</p>
    //                        </div>
    //                    </div>

    //                    {/* Property Info */}
    //                    <div>
    //                        <h2 className="text-lg font-semibold mb-3">Property Info</h2>
    //                        <div className="grid grid-cols-2 gap-4 text-sm">
    //                            <p><b>Rooms:</b> {data.rooms}</p>
    //                            <p><b>Bathrooms:</b> {data.bathrooms}</p>
    //                            <p><b>Max Guests:</b> {data.maxGuests}</p>
    //                            <p><b>Amenities:</b> {data.amenities}</p>
    //                        </div>
    //                    </div>

    //                    {/* Address */}
    //                    <div>
    //                        <h2 className="text-lg font-semibold mb-3">Address</h2>
    //                        <p className="text-sm">{data.address}</p>
    //                    </div>

    //                    {/* Details */}
    //                    <div>
    //                        <h2 className="text-lg font-semibold mb-3">Details</h2>
    //                        <p className="text-sm">{data.details}</p>
    //                    </div>

    //                    {/* Back Button */}
    //                    <div className="pt-4">
    //                        <button
    //                            onClick={() => navigate(-1)}
    //                            className="rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
    //                        >
    //                            Back
    //                        </button>
    //                    </div>
    //                </div>
    //            )}
    //        </div>
    //    </div>
    //);

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
                            <div className="mb-8">
                                <h3 className="text-md font-semibold text-gray-700 mb-4 border-b pb-2">
                                    Basic Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                    <Info label="First Name" value={data.firstname} />
                                    <Info label="Last Name" value={data.lastname} />
                                    <Info label="Phone" value={data.phone} />
                                    <Info label="Email" value={data.email} />
                                    <Info label="City" value={data.city} />
                                    <Info label="Property Type" value={data.propertyType} />
                                </div>
                            </div>

                            {/* PROPERTY INFO */}
                            <div className="mb-8">
                                <h3 className="text-md font-semibold text-gray-700 mb-4 border-b pb-2">
                                    Property Info
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                    <Info label="Rooms" value={data.rooms} />
                                    <Info label="Bathrooms" value={data.bathrooms} />
                                    <Info label="Max Guests" value={data.maxGuests} />
                                    <Info label="Amenities" value={data.amenities} />
                                </div>
                            </div>

                            {/* ADDRESS */}
                            <div className="mb-8">
                                <h3 className="text-md font-semibold text-gray-700 mb-4 border-b pb-2">
                                    Address
                                </h3>
                                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                                    {data.address || "—"}
                                </p>
                            </div>

                            {/* DETAILS */}
                            <div>
                                <h3 className="text-md font-semibold text-gray-700 mb-4 border-b pb-2">
                                    Details
                                </h3>
                                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                                    {data.details || "—"}
                                </p>
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

                                