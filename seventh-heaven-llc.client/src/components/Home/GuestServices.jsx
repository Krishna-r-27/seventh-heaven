import GuestServicesCard from "./GuestServicesCard";
import { leftServices, rightServices } from "../../data/Home/guestServices";
import propertyPng from "@img/modern-villa-dubai-3d-render-luxurious-architecture.png";
import propertyWebp from "@img/modern-villa-dubai-3d-render-luxurious-architecture.webp";
import checkedWhiteIconPng from "@img/checked-white-icon.png";
import checkedWhiteIconWebp from "@img/checked-white-icon.webp";
function GuestServices() {
  return (
      <section className="w-full pb-8 sm:pb-12 md:pb-14 lg:pb-16">
          <div className="container mx-auto px-4">
              <div className="text-center">
                  <div className="inline-block">
                      <h2 className="text-2xl md:text-3xl font-semibold text-theme text-left lg:text-center">
                          Guest <span className="text-gold">Services</span>
                      </h2>

                      <div className="text-center mt-2">
                            <div className="w-[62%] h-[1px] bg-gold mx-auto"></div>
                            <div className="w-[35%] h-[1px] bg-gold mt-1 mx-auto"></div>
                        </div>
                  </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mt-4 lg:mt-5">

                  {/* LEFT */}
                  <div className="order-2 lg:order-2 space-y-4">
                      {leftServices.map((item, i) => (
                          <GuestServicesCard key={i} {...item} />
                      ))}
                  </div>

                  {/* IMAGE */}
                  <div className="order-1 lg:order-1 flex justify-center">

                      <div className="relative w-full max-w-md rounded-2xl overflow-hidden">

                          {/* Image */}
                          <picture>
                              <source srcSet={propertyWebp} type="image/webp" />
                              <img
                                  src={propertyPng}
                                  alt="property"
                                  className="w-full h-full object-cover"
                              />
                          </picture>

                          {/* Dark Overlay */}
                          <div className="absolute inset-0 bg-black/60 z-10"></div>

                          <div className="absolute top-5 left-5 z-20 bg-gold p-3 rounded-sm shadow-md">
                              <picture>
                                  <source srcSet={checkedWhiteIconWebp} type="image/webp" />
                                  <img
                                      src={checkedWhiteIconPng}
                                      alt="check"
                                      className="w-5 h-5 object-contain"
                                  />
                              </picture>
                          </div>

                          <div className="absolute bottom-5 left-5 right-5 z-20 text-white">
                              <h3 className="text-xl md:text-2xl font-medium leading-snug">
                                  Delivering 5-Star Experiences Every Stay
                              </h3>
                              <p className="text-md mt-2 text-white/90">
                                  From the first hello to the final goodbye, we ensure every guest leaves with unforgettable memories.
                              </p>
                          </div>
                      </div>
                  </div>

                  {/* RIGHT */}
                  <div className="order-3 space-y-4">
                      {rightServices.map((item, i) => (
                          <GuestServicesCard key={i} {...item} />
                      ))}
                  </div>

              </div>
          </div>
      </section>
  );
}

export default GuestServices;