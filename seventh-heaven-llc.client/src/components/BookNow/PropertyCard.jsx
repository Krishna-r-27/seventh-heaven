import heartIcon from "@img/heart-outline.webp";
import bedIcon from "@img/bed-icon.webp";
import locationIcon from "@img/location-outline.webp";
import arrowWebp from "@img/white-arrow-icon.webp";
import arrowPng from "@img/white-arrow-icon.png"; 
import { useNavigate } from "react-router-dom";

function PropertyCard({ property }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/property/${property.slug}`, { state: property })}
            className="group border border-[#C5A553] rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition cursor-pointer"
        >

            <div className="relative overflow-hidden rounded-lg">
                <picture>
                    <source srcSet={property.imageWebp} type="image/webp" />
                    <img
                        src={property.imagePng}
                        alt={property.title}
                        className="w-full h-[220px] object-cover rounded-lg transition-transform duration-700 ease-in-out group-hover:scale-115"
                    />
                </picture>

                <div className="absolute top-3 right-3 bg-theme/60 p-2 rounded">
                    <img src={heartIcon} alt="heart" className="w-5 h-5" />
                </div>

                <div className="absolute bottom-3 right-3 bg-white px-3 py-1 text-md rounded flex items-center gap-2 shadow">
                    <img src={bedIcon} className="w-5 h-5" />
                    <span className="font-semibold">{property.type}</span>
                </div>
            </div>

            <div className="mt-4 px-2">
                <div className="flex items-center justify-between">
                    <div className="flex-1 pr-3">
                        <h3 className="text-primary font-semibold text-lg md:text-xl leading-7">
                            {property.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-gray text-md mt-2">
                            <img src={locationIcon} className="w-5 h-5" />
                            <span className="font-medium text-theme">{property.location}</span>
                        </div>
                    </div>

                    <div className="bg-primary w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full shrink-0">
                        <picture>
                            <source srcSet={arrowWebp} type="image/webp" />
                            <img src={arrowPng} alt="arrow" className="w-3 h-3 md:w-4 md:h-4" />
                        </picture>
                    </div>
                </div>


                <div className="my-2">
                    {(() => {
                        const [amount, ...rest] = property.price.split(" ");
                        return (
                            <p className="text-theme font-semibold text-xl">
                                {amount}{" "}
                                <span className="text-[#6E6E6E] text-base font-medium">
                                    {rest.join(" ")}
                                </span>
                            </p>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}

export default PropertyCard;