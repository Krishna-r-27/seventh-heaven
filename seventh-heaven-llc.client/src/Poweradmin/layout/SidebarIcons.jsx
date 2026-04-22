// SidebarIcons.jsx

export const Badge = () => (
    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600">
        NEW
    </span>
);

export const ChevronIcon = () => (
    <svg
        className="w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
        />
    </svg>
);

const Icon = ({ d }) => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={d}
        />
    </svg>
);

/* ✅ EXPORT EVERY ICON */
export const GridIcon = () => (
    <Icon d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
);

export const BoxIcon = () => (
    <Icon d="M20 7l-8-4-8 4v10l8 4 8-4z" />
);

export const TruckIcon = () => (
    <Icon d="M3 7h13v6h5l-2-4h-3V7" />
);

export const BotIcon = () => (
    <Icon d="M12 3v3M5 10h14v9H5z" />
);

export const CartIcon = () => (
    <Icon d="M3 3h2l3 9h10l2-6H7" />
);

export const CalendarIcon = () => (
    <Icon d="M8 3v2M16 3v2M4 7h16v13H4z" />
);

export const UserIcon = () => (
    <Icon d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0" />
);

export const TaskIcon = () => (
    <Icon d="M9 11l3 3L22 4" />
);
