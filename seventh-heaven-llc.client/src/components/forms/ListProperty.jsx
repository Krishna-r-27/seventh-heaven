import Button from "@/components/Button";
import formImg from "@img/form-villa.png"; 
import { FiChevronDown } from "react-icons/fi";
function ListProperty() {
  return (
      <div className="border border-gold rounded-xl p-4 md:p-8 bg-white">

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6 text-theme">
              List Your <span className="text-gold">Property</span>
          </h2>

          <form className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <input
                      type="text"
                      placeholder="First Name"
                      className="border border-theme placeholder:text-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                  />
                  <input
                      type="text"
                      placeholder="Last Name"
                      className="border border-theme placeholder:text-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                  />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <input
                      type="text"
                      placeholder="Phone no."
                      className="border border-theme placeholder:text-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                  />
                  <input
                      type="email"
                      placeholder="Email"
                      className="border border-theme placeholder:text-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                  />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                  <div className="relative">
                      <select className="w-full appearance-none border border-theme rounded-md px-4 py-3 pr-10 text-theme focus:outline-none focus:border-[#005AA4]">
                          <option>City</option>
                          <option>Dubai</option>
                          <option>Abu Dhabi</option>
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                      <select className="w-full appearance-none border border-theme rounded-md px-4 py-3 pr-10 text-theme focus:outline-none focus:border-[#005AA4]">
                          <option>Property Type</option>
                          <option>Apartment</option>
                          <option>Villa</option>
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                  <div className="relative">
                      <select className="w-full appearance-none border border-theme rounded-md px-4 py-3 pr-10 text-theme focus:outline-none focus:border-[#005AA4]">
                          <option>Rooms</option>
                          <option>1 BHK</option>
                          <option>2 BHK</option>
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                      <select className="w-full appearance-none border border-theme rounded-md px-4 py-3 pr-10 text-theme focus:outline-none focus:border-[#005AA4]">
                          <option>Bathrooms</option>
                          <option>1</option>
                          <option>2</option>
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                  <div className="relative">
                      <select className="w-full appearance-none border border-theme rounded-md px-4 py-3 pr-10 text-theme focus:outline-none focus:border-[#005AA4]">
                          <option>Max No. of Guests</option>
                          <option>2 Guests</option>
                          <option>4 Guests</option>
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                      <select className="w-full appearance-none border border-theme rounded-md px-4 py-3 pr-10 text-theme focus:outline-none focus:border-[#005AA4]">
                          <option>Amenities</option>
                          <option>Swimming Pool</option>
                          <option>Free WiFi</option>
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

              </div>

              <input
                  type="text"
                  placeholder="Address"
                  className="border border-theme placeholder:text-theme rounded-md px-4 py-3 w-full focus:outline-none focus:border-[#005AA4]"
              />

              <textarea
                  placeholder="Details"
                  rows="4"
                  className="border border-theme placeholder:text-theme rounded-md px-4 py-3 mb-3 w-full focus:outline-none focus:border-[#005AA4]"
              ></textarea>

              <div>
                  <p className="text-md mb-3 text-theme">Add Images</p>

                  <div className="flex gap-3">
                      <div className="w-[66px] h-[63px] rounded-md overflow-hidden">
                          <img
                              src={formImg}
                              alt="preview"
                              className="w-full h-full object-cover"
                          />
                      </div>

                      {[1, 2, 3, 4].map((i) => (
                          <div
                              key={i}
                              className="w-[66px] h-[63px] flex items-center justify-center bg-[#F1F1F1] rounded-md text-2xl cursor-pointer"
                          >
                              +
                          </div>
                      ))}
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
                  <input
                      type="text"
                      placeholder="Enter the captcha"
                      className="border border-theme placeholder:text-theme rounded-md px-4 py-3 md:col-span-2 focus:outline-none focus:border-[#005AA4]"
                  />
                  <div className="border border-theme rounded-md px-4 py-3 text-center bg-gray-100 text-theme">
                      5 - four = ?
                  </div>
              </div>

              <Button variant="primary" size="sm" to="#" className="mt-2">
                  Submit Now
              </Button>
          </form>

          </div>
  );
}

export default ListProperty;