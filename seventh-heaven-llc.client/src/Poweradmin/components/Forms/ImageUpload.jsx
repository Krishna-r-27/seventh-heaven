import { useState } from "react";
import { FiUpload } from "react-icons/fi";

const ImageUpload = ({
    label = "Upload Image",
    required = false,
    maxSizeMB = 10,
    onChange,
}) => {
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");

    const handleFile = (file) => {
        if (!file) return;

        // Validate file size
        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`Max file size is ${maxSizeMB}MB`);
            return;
        }

        setError("");

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);

        onChange?.(file);
    };

    const handleInputChange = (e) => {
        handleFile(e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
    };

    return (
        <div className="mt-6">
            <label className="mb-2 block font-medium text-gray-700 dark:text-white">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="flex w-full cursor-pointer flex-col items-center justify-center
        rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 dark:bg-gray-800 px-6 py-10
        text-center transition hover:border-indigo-400 hover:bg-indigo-400"
            >
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-40 w-40 rounded-lg object-cover"
                    />
                ) : (
                    <>
                        {/* Icon */}
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                            <FiUpload className="h-6 w-6 text-gray-600" />
                        </div>

                        {/* Text */}
                            <p className="text-base font-medium text-gray-800 dark:text-white">
                            Drag & Drop Files Here
                        </p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-white">
                            PNG, JPG, SVG images only
                        </p>

                            <span className="mt-3 text-sm font-medium text-indigo-600 underline dark:text-white">
                            Browse File
                        </span>
                    </>
                )}

                {/* Hidden Input */}
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.svg"
                    className="hidden"
                    onChange={handleInputChange}
                />
            </label>

            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

            <p className="mt-2 text-xs text-gray-500 dark:text-white">
                Max size {maxSizeMB}MB | Recommended: 1200 * 1200 px
            </p>
        </div>
    );
};

export default ImageUpload;
