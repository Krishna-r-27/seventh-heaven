const ImageIcon = ({ src, alt = "", className = "" }) => (
    <img
        src={src}
        alt={alt}
        className={`w-5 h-5 object-contain ${className}`}
    />
);

export default ImageIcon;
