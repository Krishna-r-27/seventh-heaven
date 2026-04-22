// src/lib/toast.js
// ─────────────────────────────────────────────────────────────────────────────
// Thin wrappers over sonner that apply consistent durations and styles for
// every data-changing action across the storefront and the admin panel.
//
// Usage:
//   import { showToast } from '@/lib/toast';
//   showToast.success('Product saved!');
//   showToast.error('Something went wrong');
//   showToast.promise(apiCall(), { loading: 'Saving…', success: 'Saved!', error: 'Failed' });
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';
import { toast } from 'sonner';
import {CheckCircle2, AlertCircle, ShoppingCart, Heart, Trash2, RefreshCw, User, Lock, Save, Plus, ArrowUpDown} from 'lucide-react';

export const showToast = {
    // ── Storefront ────────────────────────────────────────────────────────

    /** Login success — ✅ green, 3 s */
    loginSuccess: () =>
        toast.success('Logged in successfully', {
            duration: 3000,
            icon: React.createElement(CheckCircle2, { className: "text-green-500", size: 18 }),
        }),

    /** After signup — email verification required (no session yet). */
    verificationEmailSent: (firstName) =>
        toast.success(firstName ? `Thanks, ${firstName}!` : 'Check your email', {
            description:
                'We sent a verification link and a 6-digit code. Enter the code below or use the link in the email.',
            duration: 5000,
            icon: React.createElement(CheckCircle2, { className: "text-green-500", size: 18 }),
        }),

    /** Registration success — kept for flows that create a session immediately (e.g. admin). */
    registerSuccess: (firstName) =>
        toast.success(
            firstName ? `Welcome, ${firstName}! 🎉` : 'Account created successfully! 🎉',
            {
                description: 'You are now logged in.',
                duration: 3500,
                icon: React.createElement(CheckCircle2, { className: "text-green-500", size: 18 }),
            }
        ),

    /** Add to cart — 🛒 green, 2.5 s */
    addedToCart: (productName) =>
        toast.success(productName ? `"${productName}" added to cart` : 'Product added to cart', {
            duration: 2500,
            icon: React.createElement(ShoppingCart, { className: "text-green-500", size: 18 }),
        }),

    /** Add to wishlist — ❤️ 2.5 s */
    addedToWishlist: (productName) =>
        toast.success(productName ? `"${productName}" added to wishlist` : 'Added to wishlist', {
            duration: 2500,
            icon: React.createElement(Heart, { className: "text-red-500", size: 18, fill: "currentColor" }),
        }),

    /** Remove from wishlist — grey, 2 s */
    removedFromWishlist: (productName) =>
        toast(productName ? `"${productName}" removed from wishlist` : 'Removed from wishlist', {
            duration: 2000,
            icon: React.createElement(Trash2, { className: "text-gray-500", size: 18 }),
           
        }),

    /** Profile update — green */
    profileUpdated: () =>
        toast.success('Profile updated successfully', {
            duration: 3000,
            icon: React.createElement(User, { className: "text-blue-500", size: 18 }),
        }),

    /** Password change — green */
    passwordUpdated: () =>
        toast.success('Password updated successfully', {
            duration: 3000,
            icon: React.createElement(Lock, { className: "text-yellow-600", size: 18 }),
        }),

    // ── Admin Panel ───────────────────────────────────────────────────────

    /** Create / Add — ✨ green */
    created: (item = 'Item') =>
        toast.success(`${item} added successfully ✨`, {
            duration: 3000,
            icon: React.createElement(Plus, { className: "text-green-600", size: 18 }),        }),

    /** Update / Edit — ✅ green */
    updated: (item = 'Item') =>
        toast.success(`${item} updated successfully ✅`, {
            duration: 3000      }),

    /** Delete — 🔴 red, 3 s */
    deleted: (item = 'Item') =>
        toast.error(`${item} deleted successfully`, {
            duration: 3000,
            icon: React.createElement(Save, { className: "text-blue-600", size: 18 }),
        }),

    /** Status toggle — 🔄 blue/info */
    statusUpdated: () =>
        toast.info('Status updated 🔄', {
            duration: 2500,
            icon: React.createElement(Trash2, { className: "text-red-500", size: 18 }),
        }),

    /** Sort / reorder — 🔀 blue/info */
    orderUpdated: () =>
        toast.info('Sort order updated 🔀', {
            duration: 2500,
            icon: React.createElement(ArrowUpDown, { className: "text-indigo-500", size: 18 }),        }),

    // ── Generic ───────────────────────────────────────────────────────────

    /** Generic success */
    success: (msg) => toast.success(msg, {
        duration: 3000,
        icon: React.createElement(CheckCircle2, { className: "text-green-500", size: 18 }),    }),

    /** Generic info */
    info: (msg) => toast.info(msg, {
        duration: 3000,
        icon: React.createElement(AlertCircle, { className: "text-blue-500", size: 18 }),    }),

    /** Generic error — shows message from API or a fallback */
    error: (err, fallback = 'Something went wrong') => {
        const msg =
            (typeof err === 'string' ? err : null) ||
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.response?.data?.title ||
            err?.message ||
            fallback;
        toast.error(msg, {
            duration: 4500,
            icon: React.createElement(AlertCircle, { className: "text-red-500", size: 18 }),
                 });
    },

    /** Promise-based — shows loading → success → error automatically */
    promise: (promise, { loading, success, error }) =>
        toast.promise(promise, {
            loading: loading ?? 'Processing…',
            success: success ?? 'Done!',
            error: (err) =>
                (typeof err === 'string' ? err : null) ||
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.response?.data?.title ||
                err?.message ||
                (error ?? 'Something went wrong'),
        }),
};