import bhk1Png from "../../assets/img/bhk1.png";
import bhk1Webp from "../../assets/img/bhk1.webp";
import studioPng from "../../assets/img/studio.png";
import studioWebp from "../../assets/img/studio.webp";



const defaultPropertiesData = [
    {
        title: "Studio",
        description: "Modern open-plan studio apartments designed for smart, efficient, and comfortable urban living spaces with interiors.",
        count: "56 Properties",
        icon: {
            png: studioPng,
            webp: studioWebp,
        },
    },
    {
        title: "1BR",
        description: "Cozy and stylish one-bedroom apartments perfect for singles or couples seeking privacy and comfort in modern city environments.",
        count: "24 Properties",
        icon: {
            png: bhk1Png,
            webp: bhk1Webp,
        },
    },
    {
        title: "2BR",
        description: "Spacious two-bedroom homes ideal for families or groups looking for extra room and flexible living arrangements.",
        count: "14 Properties",
        icon: {
            png: bhk1Png,
            webp: bhk1Webp,
        },
    },
    {
        title: "3BR",
        description: "Large and comfortable three-bedroom residences perfect for growing families or shared living with enhanced lifestyle features.",
        count: "9 Properties",
        icon: {
            png: bhk1Png,
            webp: bhk1Webp,
        },
    },
    {
        title: "4BR+",
        description: "Premium multi-bedroom properties offering expansive space, luxury, and top-tier amenities with elegant modern architecture.",
        count: "27 Properties",
        icon: {
            png: bhk1Png,
            webp: bhk1Webp,
        },
    },
];

const resolvePropertyIcon = (propertyType = "") => {
    const normalized = propertyType.toLowerCase();

    if (normalized.includes("studio")) {
        return {
            png: studioPng,
            webp: studioWebp,
        };
    }

    return {
        png: bhk1Png,
        webp: bhk1Webp,
    };
};

export const buildHomePropertiesData = (properties = []) => {
    const getField = (property, camelKey, pascalKey) => property?.[camelKey] ?? property?.[pascalKey];

    const visibleProperties = properties.filter(
        (property) => getField(property, "isVisible", "IsVisible") !== false
            && getField(property, "showOnHomepage", "ShowOnHomepage") !== false,
    );

    if (visibleProperties.length === 0) {
        return defaultPropertiesData;
    }

    const groupedByType = visibleProperties.reduce((acc, property) => {
        const type = (
            getField(property, "propertyType", "PropertyType")
            || getField(property, "title", "Title")
            || "Property"
        ).trim();
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(property);
        return acc;
    }, {});

    return Object.entries(groupedByType).map(([type, list]) => {
        const firstProperty = list[0];
        return {
            title: type,
            description: (
                getField(firstProperty, "description", "Description")?.trim()
                || "Comfortable and well-located rental options."
            ),
            count: `${list.length} Properties`,
            icon: resolvePropertyIcon(type),
        };
    });
};

export default defaultPropertiesData;