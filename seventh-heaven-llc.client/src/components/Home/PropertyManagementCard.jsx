function PropertyManagementCard({ item }) {
    return (
        <div className="bg-white rounded-md py-5 px-3 text-center 
            shadow-[0_0_10px_-1px_rgba(0,0,0,0.12)] 
            hover:shadow-md transition mt-2">

            {/* Icon Box */}
            <div className="w-12 h-12 md:w-13 md:h-13 mx-auto flex items-center justify-center 
                rounded-sm bg-[#F0F4FF] mb-4">

                <picture>
                    <source srcSet={item.webp} type="image/webp" />
                    <img
                        src={item.png}
                        alt={item.name}
                        className="h-5 w-5 object-contain"
                    />
                </picture>
            </div>

            {/* Title */}
            <p className="text-md font-medium text-theme">
                {item.name}
            </p>
        </div>
    );
}

export default PropertyManagementCard;