import BannerSection from "../components/BannerSection/BannerSection";
import { Link } from "react-router-dom";
import callIcon from "@img/call-white.svg";
import emailIcon from "@img/email-white.svg";
function SiteMap() {
  return (
      <>
          <BannerSection
              title="Sitemap"
              pageName="Sitemap" />
          <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16">
              <div className="container mx-auto">

                  
                  {/* ================= HOME ================= */}
                  <h2 className="text-2xl font-bold text-gold mb-3">
                      <Link to="/" className="hover:underline">
                          Home
                      </Link>
                  </h2>

                  <p className="text-theme leading-relaxed mb-3">
                      SEVENTH-HEAVEN Holiday Homes is a Dubai-based holiday home management
                      company offering premium holiday homes and serviced apartments.
                      We focus on delivering comfort, convenience, and a luxurious stay
                      experience for travelers visiting Dubai. Whether for short stays or
                      extended visits, our properties are designed to provide a perfect
                      blend of style, comfort, and location.
                  </p>


                  {/* ================= ABOUT US ================= */}
                  <h2 className="text-2xl font-bold text-gold mb-3">
                      <Link to="/about-us" className="hover:underline">
                          About Us
                      </Link>
                  </h2>

                  <p className="text-theme leading-relaxed mb-3">
                      SEVENTH-HEAVEN Holiday Homes was established in May 2022 by three
                      professionals with over a decade of experience in the real estate industry.
                      Based in Dubai, we specialize in managing high-quality holiday homes and
                      serviced apartments that offer a premium living experience.
                      Our goal is to provide guests with exceptional comfort, seamless service,
                      and a memorable stay in one of the world's most vibrant cities.
                  </p>


                  {/* ================= PRODUCTS ================= */}
                  <h2 className="text-2xl font-bold text-gold mb-3">
                      <Link to="/book-now" className="hover:underline">
                          Our Properties
                      </Link>
                  </h2>

                  <p className="text-theme leading-relaxed mb-3">
                      Explore our collection of carefully curated holiday homes and serviced
                      apartments located in prime areas of Dubai such as Downtown, Dubai Marina,
                      and Palm Jumeirah. Each property is fully furnished and equipped with
                      modern amenities to ensure a comfortable and luxurious stay for our guests.
                  </p>


                  {/* ================= MANUFACTURING FACILITIES ================= */}
                  <h2 className="text-2xl font-bold text-gold mb-3">
                      <Link to="/contact-us" className="hover:underline">
                          Contact Us
                      </Link>
                  </h2>

                  <p className="text-theme leading-relaxed mb-3 lg:mb-5">
                      Get in touch with SEVENTH-HEAVEN Holiday Homes for bookings, inquiries,
                      or property management services. Our team is always ready to assist you
                      in finding the perfect holiday home in Dubai or helping you list your
                      property with us.
                  </p>

                  <ul className="space-y-6">

                      {/* Email */}
                      <li className="flex items-start gap-4">

                          <span className="bg-blue p-2 rounded-sm flex-shrink-0">
                              <img
                                  src={emailIcon}
                                  alt="Email"
                                  className="w-4 h-4"
                              />
                          </span>

                          <div className="flex flex-col">
                              <h3 className="text-gold font-semibold text-lg mb-1">
                                  SEVENTH-HEAVEN Holiday Homes L.L.C
                              </h3>
                              <h4 className="text-blue font-semibold text-lg mb-1">
                                  Email Us
                              </h4>

                              <a
                                  href="mailto:info@seventh-heaven.ae"
                                  className="text-theme text-md hover:text-[#C5A553] transition"
                              >
                                  info@seventh-heaven.ae
                              </a>
                          </div>
                      </li>


                      {/* Call */}
                      <li className="flex items-start gap-4">

                          <span className="bg-blue p-2 rounded-sm flex-shrink-0">
                              <img
                                  src={callIcon}
                                  alt="Call"
                                  className="w-4 h-4"
                              />
                          </span>

                          <div>
                              <h4 className="text-blue font-semibold text-lg mb-1">
                                  Call Us
                              </h4>

                              <a
                                  href="tel:+971585351003"
                                  className="block text-theme text-md hover:text-[#C5A553] transition"
                              >
                                  +971 58 535 1003
                              </a>

                              <a
                                  href="tel:+971565110920"
                                  className="block text-theme text-md hover:text-[#C5A553] transition"
                              >
                                  +971 56 511 0920
                              </a>
                          </div>
                      </li>

                  </ul>

              </div>
          </section>
      </>
  );
}

export default SiteMap;