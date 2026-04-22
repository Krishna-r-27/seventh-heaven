export function resolveAssetPath(path) {
    if (!path) return path;

    // External URLs or data URIs - leave as is
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
        return path;
    }

    const basePath = import.meta.env.VITE_BASE_PATH || "/";

    // Normalise base ("/vedic-stones" or "/")
    const normalizedBase = basePath.endsWith("/")
        ? basePath.slice(0, -1)
        : basePath;

    // If already prefixed with base, don't double-prefix
    if (normalizedBase && path.startsWith(normalizedBase + "/")) {
        return path;
    }

    // Ensure path starts with "/"
    const rel = path.startsWith("/") ? path : `/${path}`;

    // Root deployment ("/") just returns original
    if (!normalizedBase || normalizedBase === "") {
        return rel;
    }

    return `${normalizedBase}${rel}`;
}

