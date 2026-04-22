import { resolveAssetPath } from "../../../../utils/assetPath";

const ImageCell = ({ src }) => {
    const resolved = src && src.startsWith("/uploads/")
        ? resolveAssetPath(src)
        : src;

    return (
        <img
            src={resolved}
            alt=""
            width={240}     // 👈 sweet spot
            height={150}
            className="object-cover rounded-md border"
        />
    );
};

export default ImageCell;
