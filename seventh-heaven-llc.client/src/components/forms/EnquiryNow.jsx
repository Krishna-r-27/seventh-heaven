import { useState } from "react";
import Button from "@/components/Button";
import { FiChevronDown } from "react-icons/fi";
function EnquiryNow() {
    const [propertyType, setPropertyType] = useState("");
  return (
      <div className="border border-gold rounded-xl p-4 md:p-8 bg-white">

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6 text-theme">
              Enquiry <span className="text-gold">Now</span>
          </h2>

          <form className="space-y-4 lg:space-y-6">

              <input
                  type="text"
                  placeholder="First Name"
                  className="border border-theme placeholder:text-theme rounded-md px-4 py-3 w-full focus:outline-none focus:border-[#005AA4]"
              />

              <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-theme placeholder:text-theme rounded-md px-4 py-3 w-full focus:outline-none focus:border-[#005AA4]"
              />

              <input
                  type="text"
                  placeholder="Phone No."
                  className="border border-theme placeholder:text-theme rounded-md px-4 py-3 w-full focus:outline-none focus:border-[#005AA4]"
              />

              <input
                  type="email"
                  placeholder="Email"
                  className="border border-theme placeholder:text-theme rounded-md px-4 py-3 w-full focus:outline-none focus:border-[#005AA4]"
              />

              {/* Property Type */}
              <div className="relative">
                  <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full appearance-none border border-theme rounded-md px-4 py-3 pr-10 text-theme focus:outline-none focus:border-[#005AA4]"
                  >
                      <option value="">Property Type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Studio">Studio</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Town Houses">Town Houses</option>
                  </select>

                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {propertyType === "Studio" && (
                  <div className="relative mt-4">
                      <select className="w-full appearance-none border border-theme rounded-md px-4 py-3 pr-10 text-theme focus:outline-none focus:border-[#005AA4]">
                          <option>Studio</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>3+</option>
                      </select>

                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
              )}

              {/* Persons */}
              <div className="relative">
                  <select className="w-full appearance-none border border-theme rounded-md px-4 py-3 pr-10 text-theme focus:outline-none focus:border-[#005AA4]">
                      <option>No. of Persons</option>
                      <option>1</option>
                      <option>2</option>
                      <option>4</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Date */}
              <div className="relative">
                  <select className="w-full appearance-none border border-theme rounded-md px-4 py-3 pr-10 text-theme focus:outline-none focus:border-[#005AA4]">
                      <option>Select Date</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Captcha */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-center">
                  <input
                      type="text"
                      placeholder="Enter the captcha"
                      className="border border-theme placeholder:text-theme rounded-md px-4 py-3 md:col-span-2 focus:outline-none focus:border-[#005AA4]"
                  />
                  <div className="border border-theme rounded-md px-4 py-3 text-center bg-gray-100 text-theme">
                      5 - 2 = ?
                  </div>
              </div>

              <Button variant="primary" size="sm" to="#" className="mt-2">
                  Submit Now
              </Button>

          </form>

      </div>
  );
}

export default EnquiryNow;