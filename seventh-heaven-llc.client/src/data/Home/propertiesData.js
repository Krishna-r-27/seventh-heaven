import bhk1Png from "../../assets/img/bhk1.png";
import bhk1Webp from "../../assets/img/bhk1.webp";
import studioPng from "../../assets/img/studio.png";
import studioWebp from "../../assets/img/studio.webp";



const defaultPropertiesData = [
    {
        title: "Apartment",
        description: "Modern open-plan studio apartments designed for smart, efficient, and comfortable urban living spaces with interiors.",
        count: "56 Properties",
        icon: {
            png: studioPng,
            webp: studioWebp,
        },
    },
    {
        title: "Villa",
        description: "Cozy and stylish one-bedroom apartments perfect for singles or couples seeking privacy and comfort in modern city environments.",
        count: "24 Properties",
        icon: {
            png: bhk1Png,
            webp: bhk1Webp,
        },
    },
    {
        title: "Town House",
        description: "Spacious two-bedroom homes ideal for families or groups looking for extra room and flexible living arrangements.",
        count: "14 Properties",
        icon: {
            png: bhk1Png,
            webp: bhk1Webp,
        },
    },
    {
        title: "Penthouse",
        description: "Large and comfortable three-bedroom residences perfect for growing families or shared living with enhanced lifestyle features.",
        count: "9 Properties",
        icon: {
            png: bhk1Png,
            webp: bhk1Webp,
        },
    },
];

//const resolvePropertyIcon = (propertyType = "") => {
//    const normalized = propertyType.toLowerCase();

//    if (normalized.includes("studio")) {
//        return {
//            png: studioPng,
//            webp: studioWebp,
//        };
//    }

//    return {
//        png: bhk1Png,
//        webp: bhk1Webp,
//    };
//};

//const normalizeBedroomValue = (value = "") =>
//    value
//        .toString()
//        .trim()
//        .toLowerCase()
//        .replace(/\s+/g, "");

//const bedroomMatchesTitle = (bedrooms, title) => {
//    const normalizedBedrooms = normalizeBedroomValue(bedrooms);
//    const normalizedTitle = normalizeBedroomValue(title);

//    if (!normalizedBedrooms) return false;

//    if (normalizedTitle === "4br+") {
//        return /^([4-9]|\d{2,})br\+?$/.test(normalizedBedrooms);
//    }

//    return normalizedBedrooms === normalizedTitle;
//};

//export const buildHomePropertiesData = (properties = []) => {
//    const getField = (property, camelKey, pascalKey) => property?.[camelKey] ?? property?.[pascalKey];

//    const visibleProperties = properties.filter(
//        (property) => getField(property, "isVisible", "IsVisible") !== false
//            && getField(property, "showOnHomepage", "ShowOnHomepage") !== false,
//    );

//    if (visibleProperties.length === 0) {
//        return defaultPropertiesData;
//    }

//    return defaultPropertiesData.map((item) => {
//        const count = visibleProperties.filter((property) =>
//            bedroomMatchesTitle(getField(property, "bedrooms", "Bedrooms"), item.title)
//        ).length;

//        return {
//            ...item,
//            count: `${count} Properties`,
//            icon: resolvePropertyIcon(item.title),
//        };
//    });
//};

//export default buildHomePropertiesData;

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

const normalizeBedroomValue = (value = "") =>
    value
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "");

const bedroomMatchesTitle = (bedrooms, title) => {
    const normalizedBedrooms = normalizeBedroomValue(bedrooms);
    const normalizedTitle = normalizeBedroomValue(title);

    if (!normalizedBedrooms) return false;

    if (normalizedTitle === "4br+") {
        return /^([4-9]|\d{2,})br\+?$/.test(normalizedBedrooms);
    }

    return normalizedBedrooms === normalizedTitle;
};

export const buildHomePropertiesData = (properties = []) => {
    const getField = (property, camelKey, pascalKey) => property?.[camelKey] ?? property?.[pascalKey];

    const registeredProperties = properties.filter(Boolean);

    if (registeredProperties.length === 0) {
        return defaultPropertiesData;
    }

    return defaultPropertiesData
        .map((item) => {
            const count = registeredProperties.filter((property) =>
                bedroomMatchesTitle(
                    getField(property, "propertyType", "PropertyType"),
                    item.title
                )
            ).length;

            return {
                ...item,
                count, // keep it numeric first
                icon: resolvePropertyIcon(item.title),
            };
        })
        .filter((item) => item.count > 0) // ✅ only keep non-zero
        .map((item) => ({
            ...item,
            count: `${item.count} Properties`, // format after filtering
        }));
};

export default defaultPropertiesData;
