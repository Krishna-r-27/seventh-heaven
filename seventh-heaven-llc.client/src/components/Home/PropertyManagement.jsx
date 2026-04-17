import { propertyManagement } from "../../data/Home/propertyManagement";
import PropertyManagementCard from "./PropertyManagementCard";
function PropertyManagement() {
  return (
      <section className="w-full pt-8 sm:pt-12 md:pt-14 lg:pt-16">
          <div className="container mx-auto px-4">
              <div className="lg:text-center mb-5 md:mb-6">
                  <div className="inline-block">
                      <h2 className="text-2xl md:text-3xl font-semibold text-theme text-left lg:text-center">
                          End-to-End <span className="text-gold">Property Management</span>
                      </h2>

                      <div className="lg:text-center mt-2">
                          <div className="w-[62%] h-[1px] bg-gold lg:mx-auto"></div>
                          <div className="w-[35%] h-[1px] bg-gold mt-1 lg:mx-auto"></div>
                      </div>
                  </div>
              </div>
              <div className="grid 
                    grid-cols-2 
                    sm:grid-cols-4 
                    md:grid-cols-5 
                    lg:grid-cols-7 
                    gap-5">

                  {propertyManagement.map((item, index) => (
                      <PropertyManagementCard key={index} item={item} />
                  ))}

              </div>
          </div>
      </section>
  );
}

export default PropertyManagement;