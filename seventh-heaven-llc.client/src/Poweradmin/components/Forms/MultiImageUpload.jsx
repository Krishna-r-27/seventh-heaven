import { useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { resolveAssetPath } from "../../../utils/assetPath";

const MultiImageUpload = ({
    label = "Upload Images",
    required = false,
    maxSizeMB = 10,
    maxCount = 6,        // max total images (existing + new)
    existingUrls = [],   // already-uploaded image URLs from API (shown in edit mode)
    onChange,
    onExistingChange,
}) => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");

    const handleFiles = (selectedFiles) => {
        const currentTotal = existingUrls.length + files.length;
        const remainingSlots = maxCount - currentTotal;

        if (remainingSlots <= 0) {
            setError(`You can upload up to ${maxCount} images in total. Delete some saved images first, then try again.`);
            return;
        }

        const validFiles = [];

        for (let file of selectedFiles) {
            if (validFiles.length >= remainingSlots) break;

            if (file.size > maxSizeMB * 1024 * 1024) {
                setError(`Each file must be under ${maxSizeMB}MB`);
                return;
            }
            validFiles.push({
                file,
                preview: URL.createObjectURL(file),
            });
        }

        if (validFiles.length === 0) return;

        setError("");
        const updatedFiles = [...files, ...validFiles];
        setFiles(updatedFiles);
        onChange?.(updatedFiles.map((f) => f.file));
    };

    const handleInputChange = (e) => {
        handleFiles(e.target.files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const removeFile = (index) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        onChange?.(updated.map((f) => f.file));
    };

    return (
        <div className="mt-6">
            <label className="mb-2 block font-medium text-gray-700 dark:text-white">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {/* Upload Box */}
            <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="flex w-full cursor-pointer flex-col items-center justify-center
        rounded-xl border-2 border-dashed border-gray-300 bg-gray-50  dark:bg-gray-800  px-6 py-5
        text-center transition hover:border-indigo-400 hover:bg-indigo-400"
            >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                    <FiUpload className="h-5 w-5 text-gray-600" />
                </div>

                <p className="text-base font-medium text-gray-800 dark:text-white">
                    Drag & Drop Images Here
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-white">
                    PNG, JPG, SVG - Multiple allowed
                </p>

                <span className="mt-2 text-sm font-medium text-indigo-600 underline dark:text-white">
                    Browse Files
                </span>

                <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.svg"
                    className="hidden"
                    onChange={handleInputChange}
                />
            </label>

            {/* Error */}
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

            {/* Existing images from API — shown in edit mode */}
            {existingUrls.length > 0 && (
                <div className="mt-4">
                    <p className="mb-2 text-xs font-medium text-gray-500">Current images</p>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {existingUrls.map((url, index) => {
                            const resolved = url && url.startsWith("/uploads/")
                                ? resolveAssetPath(url)
                                : url;
                            return (
                            <div key={`existing-${index}`} className="relative rounded-lg border bg-white p-2">
                                <img
                                    src={resolved}
                                    alt={`existing-${index}`}
                                    className="h-28 w-full rounded-md object-cover"
                                    onError={(e) => { e.target.src = "https://placehold.co/200x112?text=No+Image"; }}
                                />
                                <span className="absolute bottom-1 left-1 rounded bg-gray-700/60 px-1 py-0.5 text-[10px] text-white">saved</span>
                                {onExistingChange && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = existingUrls.filter((_, i) => i !== index);
                                            onExistingChange(updated);
                                        }}
                                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow"
                                    >
                                        <FiX size={14} />
                                    </button>
                                )}
                            </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Preview Grid — newly selected files */}
            {files.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {files.map((item, index) => (
                        <div
                            key={index}
                            className="relative rounded-lg border bg-white p-2"
                        >
                            <img
                                src={item.preview}
                                alt="preview"
                                className="h-28 w-full rounded-md object-cover"
                            />

                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow"
                            >
                                <FiX size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <p className="mt-2 text-sm text-gray-500 dark:text-white">
                Max {maxCount} images total (saved + new). Max size {maxSizeMB}MB per image | Recommended: 1200 × 1200 px
            </p>
        </div>
    );
};

export default MultiImageUpload;