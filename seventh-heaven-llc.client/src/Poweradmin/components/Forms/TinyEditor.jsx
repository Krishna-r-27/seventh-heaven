import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./TinyEditor.css";
import { useTheme } from "../../context/ThemeContext";

/**
 * Rich text editor: vanilla Quill with useRef (React 18+ safe, no findDOMNode).
 * Same API: value (HTML string), onChange(html string). Backend unchanged.
 * Falls back to a plain textarea if Quill fails (e.g. CSP blocking styles).
 */
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
];

const forbidImagesInQuill = (quill) => {
    if (!quill) return;

    // Remove any accidental/pasted image embeds
    quill.clipboard.addMatcher("IMG", () => ({ ops: [] }));
    quill.clipboard.addMatcher("PICTURE", () => ({ ops: [] }));

    // Block drag-drop images/files into the editor
    quill.root.addEventListener("drop", (e) => {
        const dt = e.dataTransfer;
        if (!dt) return;
        if (dt.files && dt.files.length > 0) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // Block paste of image files from clipboard
    quill.root.addEventListener("paste", (e) => {
        const cd = e.clipboardData;
        if (!cd) return;
        const items = cd.items ? Array.from(cd.items) : [];
        const hasImageFile = items.some((it) => it.kind === "file" && (it.type || "").startsWith("image/"));
        if (hasImageFile) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
};

// Strip tags for fallback textarea display
const htmlToPlain = (html) => {
    if (!html) return "";
    const div = typeof document !== "undefined" ? document.createElement("div") : null;
    if (!div) return html;
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
};

const TinyEditor = ({ value, onChange }) => {
    const containerRef = useRef(null);
    const toolbarRef = useRef(null);
    const quillRef = useRef(null);
    const isInternalChangeRef = useRef(false);
    const [quillFailed, setQuillFailed] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const valueRef = useRef(value);
    valueRef.current = value;
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    useEffect(() => {
        if (quillFailed) return;
        const el = containerRef.current;
        const toolbarEl = toolbarRef.current;
        if (!el || !toolbarEl || quillRef.current) return;

        try {
            el.innerHTML = "";
            toolbarEl.innerHTML = "";
            const quill = new Quill(el, {
                theme: "snow",
                modules: { toolbar: TOOLBAR_OPTIONS },
            });
            // Move toolbar out so Strict Mode remount only ever sees one toolbar + one editor root
            const toolbarNode = el.querySelector(".ql-toolbar");
            if (toolbarNode) toolbarEl.appendChild(toolbarNode);
            quillRef.current = quill;
            forbidImagesInQuill(quill);

            const initialHtml = valueRef.current ?? "";
            if (initialHtml) {
                isInternalChangeRef.current = true;
                quill.root.innerHTML = initialHtml;
                isInternalChangeRef.current = false;
            }

            const handler = () => {
                if (isInternalChangeRef.current) return;
                onChangeRef.current?.(quill.root.innerHTML);
            };
            quill.on("text-change", handler);

            return () => {
                quill.off("text-change", handler);
                try {
                    quill.destroy?.();
                } catch (_) {}
                quillRef.current = null;
                el.innerHTML = "";
                toolbarEl.innerHTML = "";
            };
        } catch (err) {
            console.warn("Quill init failed, using textarea fallback:", err);
            setQuillFailed(true);
        }
    }, [quillFailed]); // eslint-disable-line react-hooks/exhaustive-deps -- init once

    useEffect(() => {
        if (quillFailed) return;
        const quill = quillRef.current;
        if (!quill) return;
        const next = value ?? "";
        if (quill.root.innerHTML === next) return;
        isInternalChangeRef.current = true;
        quill.root.innerHTML = next;
        isInternalChangeRef.current = false;
    }, [value, quillFailed]);

    if (quillFailed) {
        return (
            <div className={isDark ? "rich-editor-dark" : ""}>
                <textarea
                    className="rich-text-editor-fallback min-h-[220px] w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                    value={htmlToPlain(value ?? "")}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder="Rich text editor unavailable — enter plain text"
                />
            </div>
        );
    }

    return (
        <div className={`rich-text-editor ${isDark ? "rich-editor-dark" : ""}`}>
            <div ref={toolbarRef} className="ql-toolbar-wrapper" aria-hidden="true" />
            <div ref={containerRef} className="ql-editor-root" data-testid="rich-editor-container" />
        </div>
    );
};

export default TinyEditor;
