/**
 * VITE_UNDER_CONSTRUCTION: when "true", "/" shows the placeholder page and
 * the storefront home lives at "/home". When "false", "/" is the real home.
 * Omit or empty defaults to true (matches previous single-route behavior).
 */
const raw = import.meta.env.VITE_UNDER_CONSTRUCTION;

export const underConstructionEnabled =
    raw === undefined || raw === "" ? true : String(raw).toLowerCase() === "true";

/** After customer login — not used for registration (always /profile). */
export function getPostLoginHomePath() {
    return underConstructionEnabled ? "/home" : "/";
}
