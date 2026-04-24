import bhk1Png from "../../assets/img/bhk1.png";
import bhk1Webp from "../../assets/img/bhk1.webp";
import studioPng from "../../assets/img/studio.png";
import studioWebp from "../../assets/img/studio.webp";



const defaultPropertiesData = [
    {
        title: "1 BHK",
        description: "Cozy & Stylish One-Bedroom Apartments perfect for couples or solo travelers.",
        count: "56 Properties",
        icon: {
            png: bhk1Png,
            webp: bhk1Webp,
        },
    },
    {
        title: "2 BHK",
        description: "Spacious two-bedroom units ideals for families or groups seeking extra room.",
        count: "24 Properties",
        icon: {
            png: bhk1Png,
            webp: bhk1Webp,
        },
    },
    {
        title: "Studio Apartment",
        description: "Modern open-plan studio - smart efficient, and centrally located.",
        count: "14 Properties",
        icon: {
            png: studioPng,
            webp: studioWebp,
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