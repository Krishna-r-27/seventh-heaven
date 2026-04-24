import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { adminApi } from "../../../services/adminApi";
import { showToast } from "../../../lib/toast";
import { resolveAssetPath } from "../../../utils/assetPath";

const emptyModel = {
    title: "",
    description: "",
    propertyType: "",
    guestrooms: 1,
    bedrooms: 1,
    bathrooms: 1,
    amenities: "",
    locationLink: "",
    houseRules: "",
    cancellationPolicy: "",
    showOnHomepage: false,
    isVisible: true,
};

function toBool(v) {
    return v === true || v === 1 || v === "1" || v === "true";
}

export default function AddProperty() {
    const navigate = useNavigate();
    const { id } = useParams(); // <- detect edit id
    const [model, setModel] = useState(emptyModel);
    const [files, setFiles] = useState([]);
    const [existingImages, setExistingImages] = useState([]); // existing images for edit
    const [homepageImages, setHomepageImages] = useState([]);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const BACKEND_BASE_URL = "https://localhost:7176";
    useEffect(() => {
        document.title = id ? "Edit Property | PowerAdmin" : "Add Property | PowerAdmin";
    }, [id]);

    // Load property when editing
    useEffect(() => {
        if (!id) return;
        let mounted = true;
        setSaving(true);
        adminApi
            .get(`/properties/${id}`)
            .then(({ data }) => {
                if (!mounted) return;
                // populate model fields (map arrays back to expected input form)
                setModel({
                    title: data.title ?? "",
                    description: data.description ?? "",
                    propertyType: data.propertyType ?? "",
                    guestrooms: data.guestrooms ?? 1,
                    bedrooms: data.bedrooms ?? 0,
                    bathrooms: data.bathrooms ?? 0,
                    amenities: (data.amenities || []).join(", "),
                    locationLink: data.locationLink ?? "",
                    houseRules: data.houseRules ?? "",
                    cancellationPolicy: data.cancellationPolicy ?? "",
                    showOnHomepage: toBool(data.showOnHomepage),
                    isVisible: toBool(data.isVisible)
               
                });

                // set existing images for previews (resolve asset path for local uploads)
                const imgs = (data.images || []).map((img) => ({
                    id: img.id,
                    url: (img.imageUrl || "").startsWith("/uploads/") ? resolveAssetPath(img.imageUrl) : img.imageUrl,
                    isPrimary: !!img.isPrimary,
                }));
                setExistingImages(imgs);

                // If backend provides homepage indices/flags, populate homepageImages here.
                // Example: if data.homepageImageIndices exists:
                if (Array.isArray(data.homepageImageIndices)) {
                    setHomepageImages(data.homepageImageIndices);
                }
            })
            .catch((err) => {
                console.error("Failed to load property:", err);
                showToast.error("Failed to load property for editing.");
            })
            .finally(() => setSaving(false));
        return () => {
            mounted = false;
        };
    }, [id]);

    // combine existing image previews + new file previews
    const previews = useMemo(() => {
        const existing = existingImages.map((img) => ({ id: `existing-${img.id}`, url: img.url }));
        const newFiles = files.map((f, idx) => ({ id: `new-${idx}`, url: URL.createObjectURL(f) }));
        return [...existing, ...newFiles];
    }, [existingImages, files]);

    useEffect(() => {
        // revoke blob URLs for new files on change/unmount
        return () => {
            previews.forEach((p) => {
                try {
                    if (p?.url?.startsWith?.("blob:")) URL.revokeObjectURL(p.url);
                } catch {
                    /* ignore */
                }
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [previews]);

    useEffect(() => {
        setHomepageImages([]);
    }, [files]);

    function setField(name, value) {
        setModel((s) => ({ ...s, [name]: value }));
        if (errors[name]) {
            setErrors((e) => ({ ...e, [name]: "" }));
        }
    }

    function toggleHomepageImage(idx) {
        setHomepageImages((prev) =>
            prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
        );
    }

    function validate() {
        const newErrors = {};
        if (!model.title || model.title.trim().length === 0) {
            newErrors.title = "Title is required.";
        }
        // For edit allow existing images to satisfy requirement
        if (files.length === 0 && existingImages.length === 0) {
            newErrors.files = "At least one image is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e?.preventDefault?.();

        if (!validate()) {
            showToast.error("Please fix the errors below.");
            return;
        }

        setSaving(true);

        try {
            const form = new FormData();

            // server accepts "payload" JSON (controller supports [FromForm] Create/Update DTO)
            const payload = {
                title: model.title,
                description: model.description,
                propertyType: model.propertyType,
                guestrooms: Number(model.guestrooms) || 1,
                bedrooms: Number(model.bedrooms) || 0,
                bathrooms: Number(model.bathrooms) || 0,
                amenities: (model.amenities || "").split(",").map((x) => x.trim()).filter(Boolean),
                locationLink: model.locationLink,
                houseRules: model.houseRules,
                cancellationPolicy: model.cancellationPolicy,
                showOnHomepage: toBool(model.showOnHomepage),
                isVisible: toBool(model.isVisible),
                homepageImageIndices: homepageImages,
            };

            form.append("payload", JSON.stringify(payload));

            // Append scalar fields too (model binding)
            form.append("Title", model.title ?? "");
            form.append("Description", model.description ?? "");
            form.append("PropertyType", model.propertyType ?? "");
            form.append("Guestrooms", String(model.guestrooms ?? 1));
            form.append("Bedrooms", String(model.bedrooms ?? 0));
            form.append("Bathrooms", String(model.bathrooms ?? 0));
            form.append("Amenities", model.amenities ?? "");
            form.append("LocationLink", model.locationLink ?? "");
            form.append("HouseRules", model.houseRules ?? "");
            form.append("CancellationPolicy", model.cancellationPolicy ?? "");
            form.append("ShowOnHomepage", toBool(model.showOnHomepage) ? "true" : "false");
            form.append("IsVisible", toBool(model.isVisible) ? "true" : "false");

            // include existing image ids to keep when updating
            if (id && existingImages.length > 0) {
                const existingIds = existingImages.map((img) => img.id).filter(Boolean);
                existingIds.forEach((imgId) => {
                    form.append("ExistingImageIds", String(imgId));
                });
            }

            // attach new files
            files.forEach((f) => form.append("files", f));

            // PrimaryIndex maps to the combined image list order expected by backend:
            // - Create: only new files => first new file is primary by default
            // - Update: kept existing images first, then newly uploaded images
            let primaryIndex = null;
            if (id) {
                const existingPrimaryIndex = existingImages.findIndex((img) => !!img.isPrimary);
                if (existingPrimaryIndex >= 0) {
                    primaryIndex = existingPrimaryIndex;
                } else if (files.length > 0) {
                    // combined list starts with existing images, so first new image comes after them
                    primaryIndex = existingImages.length;
                } else if (existingImages.length > 0) {
                    primaryIndex = 0;
                }
            } else if (files.length > 0) {
                primaryIndex = 0;
            }

            if (primaryIndex !== null) {
                form.append("PrimaryIndex", String(primaryIndex));
            }

            // let browser set multipart boundary
            if (id) {
                // edit -> PUT
                await adminApi.put(`/properties/${id}`, form, { headers: { "Content-Type": undefined } });
                showToast.created("Property updated");
            } else {
                // create -> POST
                await adminApi.post("/properties", form, { headers: { "Content-Type": undefined } });
                showToast.created("Property created");
            }

            navigate("/poweradmin/properties");
        } catch (err) {
            console.error("POST/PUT /api/properties failed:", {
                message: err?.message,
                status: err?.response?.status,
                data: err?.response?.data,
            });

            if (err?.response?.status === 401) {
                showToast.error("Session expired. Please sign in.");
                navigate("/poweradmin/signin");
                return;
            }

            showToast.error(err?.response?.data?.message || err?.message || "Save failed");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div>
            <PageHeader
                title={id ? "Edit Property" : "Add Property"}
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin/dashboard" },
                    { label: "Properties", href: "/poweradmin/properties" },
                    { label: id ? "Edit Property" : "Add Property" },
                ]}
            />

            <div className="mt-10">
                <div className="mb-4 text-right">
                    <button
                        type="button"
                        onClick={() => navigate("/poweradmin/properties")}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-indigo-600 px-4 py-2 text-sm text-white font-medium hover:bg-indigo-700 transition"
                    >
                        ← Back to Properties
                    </button>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-200 dark:bg-white/[0.03]">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information Section */}
                        <div className="space-y-4 pb-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                <input
                                    required
                                    className={`w-full rounded-lg border-2 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${errors.title ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-indigo-100"
                                        }`}
                                    value={model.title}
                                    onChange={(e) => setField("title", e.target.value)}
                                    placeholder="e.g., Luxury Beach Villa"
                                />
                                {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows={4}
                                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                                    value={model.description}
                                    onChange={(e) => setField("description", e.target.value)}
                                    placeholder="Describe the property..."
                                />
                            </div>
                        </div>

                        {/* Property Details Section */}
                        <div className="space-y-4 pb-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800">Property Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                                    <select
                                        className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                                        value={model.propertyType}
                                        onChange={(e) => setField("propertyType", e.target.value)}
                                    >
                                        <option value="">Property Type</option>
                                        <option>Apartment</option>
                                        <option>Villa</option>
                                        <option>Studio</option>
                                        <option>1 BHK</option>
                                        <option>2 BHK</option>
                                        <option>Commercial</option>
                                        <option>Penthouse</option>
                                        <option>Town Houses</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                                    <input
                                        type="number"
                                        min={1}
                                        className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                                        value={model.guestrooms}
                                        onChange={(e) => setField("guestrooms", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                                    <input
                                        type="number"
                                        min={0}
                                        className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                                        value={model.bedrooms}
                                        onChange={(e) => setField("bedrooms", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                                    <input
                                        type="number"
                                        min={0}
                                        className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                                        value={model.bathrooms}
                                        onChange={(e) => setField("bathrooms", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Amenities & Location Section */}
                        <div className="space-y-4 pb-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800">Amenities & Location</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma separated)</label>
                                <input
                                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                                    value={model.amenities}
                                    onChange={(e) => setField("amenities", e.target.value)}
                                    placeholder="WiFi, Air conditioning, Washing machine, Pool, Gym"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location Link</label>
                                <input
                                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                                    value={model.locationLink}
                                    onChange={(e) => setField("locationLink", e.target.value)}
                                    placeholder="https://maps.google.com/..."
                                />
                            </div>
                        </div>

                        {/* House Rules & Cancellation Section */}
                        <div className="space-y-4 pb-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800">Policies</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">House Rules</label>
                                <textarea
                                    rows={3}
                                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                                    value={model.houseRules}
                                    onChange={(e) => setField("houseRules", e.target.value)}
                                    placeholder="Enter house rules..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cancellation Policy</label>
                                <textarea
                                    rows={3}
                                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                                    value={model.cancellationPolicy}
                                    onChange={(e) => setField("cancellationPolicy", e.target.value)}
                                    placeholder="Enter cancellation policy..."
                                />
                            </div>
                        </div>

                        {/* Images Section shows previews from combined existing + new files */}
                        <div className="space-y-4 pb-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800">Images *</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Upload Images</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => setFiles(Array.from(e.target.files))}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-8l-3.172-3.172a4 4 0 00-5.656 0L28 20M9 20l3.172-3.172a4 4 0 015.656 0L28 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                                    </label>
                                </div>
                                {errors.files && <p className="text-xs text-red-600 mt-1">{errors.files}</p>}
                            </div>

                            {previews.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-gray-700 mb-3">Selected Images ({previews.length})</p>
                                    <div className="space-y-3">
                                        {previews.map((p, idx) => (
                                            <div key={p.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                                {/* Image Preview */}
                                                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                                                    {/*<img*/}
                                                    {/*    src={*/}
                                                    {/*        p.url && p.url.startsWith("/uploads/")*/}
                                                    {/*            ? `${window.location.origin}${p.url}`*/}
                                                    {/*            : p.url && p.url.startsWith("/uploads/")*/}
                                                    {/*                ? `${process.env.REACT_APP_API_BASE_URL || "http://localhost:7176"}${p.url}`*/}
                                                    {/*                : p.url*/}
                                                           
                                                    {/*    }*/}
                                                    {/*    alt=""*/}
                                                    {/*    className="w-full h-full object-cover"*/}
                                                    {/*/>*/}
                                                    <img
                                                        src={p.url?.startsWith("/uploads/") ? `${BACKEND_BASE_URL}${p.url}` : p.url}
                                                        alt=""
                                                        className="h-16 w-16 rounded-md border border-gray-200 object-cover"
                                                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                                                    />
                                                </div>
                                          

                                                {/* Image Info and Options */}
                                                <div className="flex-1 space-y-2">
                                                    <p className="text-sm font-medium text-gray-700">Image {idx + 1}</p>

                                                    {/* Homepage Checkbox */}
                                                    <button
                                                        type="button"
                                                        role="checkbox"
                                                        aria-checked={homepageImages.includes(idx)}
                                                        onClick={() => toggleHomepageImage(idx)}
                                                        className="flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <span
                                                            className={`inline-flex h-4 w-4 items-center justify-center rounded border text-[11px] leading-none transition ${
                                                                homepageImages.includes(idx)
                                                                    ? "border-indigo-600 bg-indigo-600 text-white"
                                                                    : "border-gray-400 bg-white text-transparent"
                                                            }`}
                                                        >
                                                            ✓
                                                        </span>
                                                        <span className="text-sm text-gray-600">
                                                            Show on homepage
                                                        </span>
                                                    </button>
                                                </div>

                                                {/* Status Badges */}
                                                <div className="flex gap-2">
                                                    {homepageImages.includes(idx) && (
                                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                                            Homepage
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Display Options */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Display Options</h3>
                            <button
                                type="button"
                                role="checkbox"
                                aria-checked={toBool(model.showOnHomepage)}
                                onClick={() =>
                                    setModel((prev) => ({
                                        ...prev,
                                        showOnHomepage: !toBool(prev?.showOnHomepage),
                                    }))
                                }
                                className="flex items-center gap-3 cursor-pointer"
                            >
                                <span
                                    className={`inline-flex h-4 w-4 items-center justify-center rounded border text-[11px] leading-none transition ${
                                        toBool(model.showOnHomepage)
                                            ? "border-indigo-600 bg-indigo-600 text-white"
                                            : "border-gray-400 bg-white text-transparent"
                                    }`}
                                >
                                    ✓
                                </span>
                                <span className="text-sm font-medium text-gray-700">Show on Homepage</span>
                            </button>
                            <button
                                type="button"
                                role="checkbox"
                                aria-checked={toBool(model.isVisible)}
                                onClick={() =>
                                    setModel((prev) => ({
                                        ...prev,
                                        isVisible: !toBool(prev?.isVisible),
                                    }))
                                }
                                className="flex items-center gap-3 cursor-pointer"
                            >
                                <span
                                    className={`inline-flex h-4 w-4 items-center justify-center rounded border text-[11px] leading-none transition ${
                                        toBool(model.isVisible)
                                            ? "border-indigo-600 bg-indigo-600 text-white"
                                            : "border-gray-400 bg-white text-transparent"
                                    }`}
                                >
                                    ✓
                                </span>
                                <span className="text-sm font-medium text-gray-700">Visible in Frontend</span>
                            </button>
                      
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => navigate("/poweradmin/properties")}
                                className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 transition flex items-center gap-2"
                            >
                                {saving && (
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                )}
                                {saving ? "Saving..." : id ? "Update Property" : "Create Property"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}