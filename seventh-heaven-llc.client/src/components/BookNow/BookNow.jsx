import { useState } from "react";
import PropertyCard from "./PropertyCard";
import properties from "@/data/properties";
import prevWebp from "@img/previous-icon.webp";
import prevPng from "@img/previous-icon.png";
import nextWebp from "@img/next-icon.webp";
import nextPng from "@img/next-icon.png";
function BookNow() {

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    const totalPages = Math.ceil(properties.length / itemsPerPage);

    const currentData = properties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

  return (
      <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16">
          <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                  {/* Title */}
                  <div className="inline-block">
                      <h2 className="text-2xl md:text-3xl font-semibold text-theme">
                          Choose Your <span className="text-gold">Property</span>
                      </h2>

                      <div className="mt-2">
                          <div className="w-[62%] h-[1px] bg-gold"></div>
                          <div className="w-[35%] h-[1px] bg-gold mt-1"></div>
                      </div>
                  </div>

                  {/* Dropdowns */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

                      {/* Property Type */}
                      <div className="relative w-full sm:w-auto">
                          <select className="appearance-none border border-theme pl-4 pr-10 py-2 rounded-md w-full bg-white">
                              <option>Property Type</option>
                              <option>Apartment</option>
                              <option>Villa</option>
                              <option>Townhouse</option>
                          </select>

                          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                              <svg className="w-4 h-4 text-theme" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                          </div>
                      </div>

                      {/* Location */}
                      <div className="relative w-full sm:w-auto">
                          <select className="appearance-none border border-theme pl-4 pr-10 py-2 rounded-md w-full bg-white">
                              <option>Location</option>
                              <option>Downtown Dubai</option>
                              <option>Dubai Marina</option>
                              <option>Palm Jumeirah</option>
                          </select>

                          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                              <svg className="w-4 h-4 text-theme" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                          </div>
                      </div>

                  </div>

              </div>

              <div className="
                      grid 
                      grid-cols-1 
                      md:grid-cols-2 
                      lg:grid-cols-3 
                      gap-6 
                      mt-8
                    ">
                  {properties.map((item) => (
                      <PropertyCard key={item.id} property={item} />
                  ))}
              </div>
              <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">

                  <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}
                      className="w-12 h-12 rounded-md border border-gold flex items-center justify-center">
                      <picture>
                          <source srcSet={prevWebp} type="image/webp" />
                          <img src={prevPng} className="w-4 h-4" />
                      </picture>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .slice(0, 4)
                      .map((page) => (
                          <button key={page} onClick={() => setCurrentPage(page)}
                              className={`w-12 h-12 rounded-md border
                                ${currentPage === page ? "bg-gold text-white" : "border-gold"}`}>
                              {page}
                          </button>
                      ))}

                  <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}
                      className="w-12 h-12 rounded-md border border-gold flex items-center justify-center">
                      <picture>
                          <source srcSet={nextWebp} type="image/webp" />
                          <img src={nextPng} className="w-4 h-4" />
                      </picture>
                  </button>

              </div>
          </div>
    </section>
  );
}

export default BookNow;