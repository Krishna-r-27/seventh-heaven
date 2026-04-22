import { useState, useMemo } from "react";
import {
    HiOutlineInformationCircle,
    HiX,
    HiClipboardCopy,
    HiCheck,
} from "react-icons/hi";

const SeoMetaSection = ({
    title,
    setTitle,
    metaTags,
    setMetaTags,
    productSlug = "your-product-slug",
    baseUrl = "https://www.yoursite.com",
}) => {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const pageUrl = `${baseUrl}/products/${productSlug}`;

    const dynamicMetaExample = useMemo(
        () => `<!-- Basic SEO -->
<meta name="title" content="${title || "Product Name"}" />
<meta name="description" content="Buy ${title || "this product"} at best price. High quality, fast delivery." />
<meta name="keywords" content="${title || "product"}, buy online, best price" />

<!-- Canonical -->
<link rel="canonical" href="${pageUrl}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="product" />
<meta property="og:title" content="${title || "Product Name"}" />
<meta property="og:description" content="Buy ${title || "this product"} at best price." />
<meta property="og:url" content="${pageUrl}" />
<meta property="og:image" content="${baseUrl}/images/${productSlug}.jpg" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title || "Product Name"}" />
<meta name="twitter:description" content="Buy ${title || "this product"} at best price." />
<meta name="twitter:image" content="${baseUrl}/images/${productSlug}.jpg" />`,
        [title, pageUrl, baseUrl, productSlug]
    );

    const handleCopy = async () => {
        await navigator.clipboard.writeText(dynamicMetaExample);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="mt-8 border-t pt-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                SEO Details
            </h3>

            {/* Browser Title */}
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Browser Title (30-65 characters)"
                className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2"
            />

            {/* Meta Tags label + info */}
            <div className="mb-2 flex items-center gap-2">
                <label className="font-medium text-gray-700 dark:text-white">
                    Meta Tags
                </label>
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="text-gray-400 hover:text-indigo-600"
                >
                    <HiOutlineInformationCircle className="h-5 w-5" />
                </button>
            </div>

            <textarea
                rows="4"
                value={metaTags}
                onChange={(e) => setMetaTags(e.target.value)}
                placeholder="Paste meta tags here..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="relative flex h-[80vh] w-full max-w-6xl flex-col rounded-2xl bg-white dark:bg-gray-900 shadow-xl">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                               SEO Meta Tags
                            </h4>

                            <div className="flex items-center gap-3">
                                {/* Copy */}
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                >
                                    {copied ? "Copied" : "Copy"}
                                </button>

                                {/* Close */}
                                <button
                                    onClick={() => setOpen(false)}
                                    className="
    rounded-lg p-2
    text-gray-500 hover:bg-gray-100 hover:text-gray-700
    dark:text-white
    dark:hover:bg-gray-800 dark:hover:text-gray-200
"                                    aria-label="Close modal"
                                >
                                    <HiX className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-4">
                            <pre
                                className="whitespace-pre-wrap break-all rounded-lg bg-gray-100   p-4 text-sm text-gray-800 dark:bg-gray-800 dark:text-white"
                            >
                                {dynamicMetaExample}
                            </pre>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SeoMetaSection;
