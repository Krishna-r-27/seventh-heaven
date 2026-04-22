import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind classes safely - Shadcn mate khub jaruri chhe.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

/**
 * Creates a stable unique id (not cryptographically secure).
 */
export function uid(prefix = '') {
    const t = Date.now().toString(36);
    const r = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
    return `${prefix}${t}-${r}`;
}

/**
 * Debounce a function.
 */
export function debounce(fn, wait = 200) {
    let timer = null;
    const debounced = function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, wait);
    };
    debounced.cancel = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    };
    return debounced;
}

/**
 * Format number as currency (Vedic Stones mate INR best rehse).
 */
export function formatCurrency(value = 0, currency = 'INR', locale = 'en-IN') {
    if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
        try {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency,
                maximumFractionDigits: 0 // Stones ni price ma point ni jarur nathi hoti
            }).format(value);
        } catch {
            // fallback
        }
    }
    return `£ ${Number(value).toLocaleString()}`;
}

/**
 * Simple slugify for product names / routes (SEO mate).
 */
export function slugify(value = '') {
    return String(value)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * LocalStorage helpers (Cart mate bau kam avse).
 */
export const storage = {
    get(key, fallback = null) {
        try {
            if (typeof window === 'undefined') return fallback;
            const v = window.localStorage.getItem(key);
            return v == null ? fallback : JSON.parse(v);
        } catch {
            return fallback;
        }
    },
    set(key, value) {
        try {
            if (typeof window === 'undefined') return;
            const v = typeof value === 'string' ? value : JSON.stringify(value);
            window.localStorage.setItem(key, v);
        } catch {
            // ignore
        }
    },
    remove(key) {
        try {
            if (typeof window === 'undefined') return;
            window.localStorage.removeItem(key);
        } catch {
            // ignore
        }
    },
};

// Baaki na badha utility functions jem hatu em j
export function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }
export function isObject(val) { return val && typeof val === 'object' && !Array.isArray(val); }
export function capitalize(s = '') { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

const utils = {
    cn,
    uid,
    debounce,
    formatCurrency,
    slugify,
    storage,
    deepClone,
    isObject,
    capitalize
};

export default utils;