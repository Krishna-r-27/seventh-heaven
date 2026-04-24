import fallbackImage from "@img/deyafa-apartments.png";
import gym from "@img/gym.png";
import pool from "@img/pool.png";
import parking from "@img/parking-meter.png";
import security from "@img/security-lock.png";

const getField = (obj, camelKey, pascalKey) => obj?.[camelKey] ?? obj?.[pascalKey];

const toArray = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
        return value
            .split(/[\n,]/)
            .map((item) => item.trim())
            .filter(Boolean);
    }
    return [];
};

const slugify = (text = "") =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

//const normalizeImageUrl = (url) => {
//    if (!url || typeof url !== "string") return "";
//    if (/^https?:\/\//i.test(url)) return url;
//    return url.startsWith("/") ? url : `/${url}`;
//};
const BACKEND_BASE_URL = "https://localhost:7176";

const normalizeImageUrl = (url) => {
    if (!url) return null;

    return url.startsWith("/uploads/")
        ? `${BACKEND_BASE_URL}${url}`
        : url;
};

const amenityIconFor = (name = "") => {
    const key = name.toLowerCase();
    if (key.includes("gym")) return gym;
    if (key.includes("pool")) return pool;
    if (key.includes("parking")) return parking;
    if (key.includes("security")) return security;
    return security;
};

export const mapPropertyToUi = (property) => {
    const id = getField(property, "id", "Id");
    const title = getField(property, "title", "Title") || "Property";
    const type = getField(property, "propertyType", "PropertyType") || "Apartment";
    const descriptionRaw = getField(property, "description", "Description") || "";
    const description = toArray(descriptionRaw);
    const amenitiesRaw = getField(property, "amenities", "Amenities");
    const houseRulesRaw = getField(property, "houseRules", "HouseRules");
    const cancellationRaw = getField(property, "cancellationPolicy", "CancellationPolicy");
    const location = getField(property, "locationLink", "LocationLink") || "Dubai";
    const imagesRaw = getField(property, "images", "Images");
    

    const images = Array.isArray(imagesRaw)
        ? imagesRaw
            .map((img) => normalizeImageUrl(getField(img, "imageWebpUrl", "ImageWebpUrl") || getField(img, "imageUrl", "ImageUrl")))
            .filter(Boolean)
        : [];

    //const imagePng = images[0] || fallbackImage;

    const images1 = Array.isArray(imagesRaw)
        ? imagesRaw
            .map((img) => ({
                url: normalizeImageUrl(
                    getField(img, "imageWebpUrl", "ImageWebpUrl") ||
                    getField(img, "imageUrl", "ImageUrl")
                ),
                isPrimary: Boolean(getField(img, "isPrimary", "IsPrimary")),
            }))
            .filter((img) => img.url)
        : [];

    //const imagePng = images1.find((img) => img.isPrimary)?.url || images1[0]?.url || null;
    const imagePng = (() => {
        const url =
            images1.find((img) => img.isPrimary)?.url ||
            images1[0]?.url;

        return url?.startsWith("/uploads/")
            ? `${BACKEND_BASE_URL}${url}`
            : url || null;
    })();

    const slug = `${slugify(title)}-${id || "property"}`;

    return {
        id: id || Math.floor(Math.random() * 1000000),
        title,
        slug,
        location,
        nearestLocation: location,
        price: "Price on request",
        type,
        imagePng,
        images: images.length > 0 ? images : [fallbackImage],
        amenities: toArray(amenitiesRaw).map((name) => ({
            name,
            icon: amenityIconFor(name),
        })),
        description: description.length > 0 ? description : ["Property details available on request."],
        houseRules: toArray(houseRulesRaw),
        cancellationPolicy: toArray(cancellationRaw),
        showOnHomepage: getField(property, "showOnHomepage", "ShowOnHomepage"),
        isVisible: getField(property, "isVisible", "IsVisible"),
    };
};

export const fetchProperties = async () => {
    const apiBase = import.meta.env.VITE_API_BASE || "/api";
    const response = await fetch(`${apiBase}/properties`);
    if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
};

export const fetchMappedProperties = async () => {
    const properties = await fetchProperties();
    return properties.map(mapPropertyToUi);
};
