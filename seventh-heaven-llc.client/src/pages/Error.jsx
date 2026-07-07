import BannerSection from "../components/BannerSection/BannerSection";
import { Link } from "react-router-dom";
import callIcon from "@img/call-white.svg";
import emailIcon from "@img/email-white.svg";
import { Helmet } from "react-helmet-async";
function Error() {
  return (
      <>
          <Helmet>
              <title>404 - Page Not Found | Seventh Heaven Holiday Homes Dubai</title>

              <meta
                  name="description"
                  content="The page you are looking for could not be found. Return to Seventh Heaven Holiday Homes to explore premium holiday homes and serviced apartments in Dubai."
              />

              <meta
                  name="keywords"
                  content="404, page not found, Seventh Heaven Dubai"
              />

              <link
                  rel="canonical"
                  href="https://www.seventh-heaven.ae/error"
              />
          </Helmet>
          <BannerSection
              title="404"
              pageName="404" />
          <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16">
              <div className="container mx-auto">

                  <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">
                      Error 404 page not found
                  </h1>
                  {/* ================= HOME ================= */}
                  <h2 className="text-2xl font-bold text-gold mb-3">
                      <Link to="/" className="hover:underline">
                          Home
                      </Link>
                  </h2>

                  <p className="text-theme leading-relaxed mb-3">
                      Experience premium holiday homes and serviced apartments across Dubai. Enjoy fully furnished accommodations, exceptional comfort, and professional hospitality with Seventh Heaven.
                  </p>


                  {/* ================= ABOUT US ================= */}
                  <h2 className="text-2xl font-bold text-gold mb-3">
                      <Link to="/about-us" className="hover:underline">
                          About Us
                      </Link>
                  </h2>

                  <p className="text-theme leading-relaxed mb-3">
                      Seventh Heaven Holiday Homes is a trusted Dubai-based company offering premium holiday homes, exceptional guest experiences, and reliable property management services.
                  </p>


                  {/* ================= PRODUCTS ================= */}
                  <h2 className="text-2xl font-bold text-gold mb-3">
                      <Link to="/book-now" className="hover:underline">
                          Our Properties
                      </Link>
                  </h2>

                  <p className="text-theme leading-relaxed mb-3">
                      Browse our collection of fully furnished holiday homes and serviced apartments in Dubai. Find the perfect stay for business trips, family vacations, or long-term visits.
                  </p>

                  <div className="ms-6 space-y-4">
                      <div className="mt-4">
                          <h3 className="text-xl font-bold text-gold mb-2">
                              <a
                                  href="https://www.seventh-heaven.ae/property/spacious-2-bedroom-furnished-apartment-opposite-city-centre-deira-14"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                              >
                                  Spacious 2-Bedroom Furnished Apartment
                              </a>
                          </h3>

                          <p className="text-theme leading-relaxed">
                              Stay in a spacious, fully furnished 2-bedroom apartment opposite City Centre Deira,
                              offering comfort, convenience, and easy access to Dubai's attractions.
                          </p>
                      </div>

                      <div>
                          <h3 className="text-xl font-bold text-gold mb-2">
                              <a
                                  href="https://www.seventh-heaven.ae/property/spacious-2br-with-mall-view-13"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                              >
                                  Spacious 2BR with Mall View
                              </a>
                          </h3>

                          <p className="text-theme leading-relaxed">
                              Enjoy a stylish 2-bedroom apartment with beautiful mall views, modern amenities,
                              and a comfortable stay in the heart of Dubai.
                          </p>
                      </div>

                      <div>
                          <h3 className="text-xl font-bold text-gold mb-2">
                              <a
                                  href="https://www.seventh-heaven.ae/property/studio-in-karama-12"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                              >
                                  Studio in Karama
                              </a>
                          </h3>

                          <p className="text-theme leading-relaxed">
                              Stay in a cozy, fully furnished studio in Karama, offering modern amenities,
                              a convenient location, and a comfortable space for both short and extended stays in Dubai.
                          </p>
                      </div>

                      <div>
                          <h3 className="text-xl font-bold text-gold mb-2">
                              <a
                                  href="https://www.seventh-heaven.ae/property/al-deyafa-apartments-11"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                              >
                                  Al Deyafa Apartments
                              </a>
                          </h3>

                          <p className="text-theme leading-relaxed">
                              Discover comfortable serviced apartments at Al Deyafa with premium amenities
                              and a convenient location for leisure and business travelers.
                          </p>
                      </div>

                      <div className="mb-6">
                          <h3 className="text-xl font-bold text-gold mb-2">
                              <a
                                  href="https://www.seventh-heaven.ae/property/beautiful-1-br-apartment-in-al-mankhool-9"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                              >
                                  Beautiful 1-BR Apartment in Al Mankhool
                              </a>
                          </h3>

                          <p className="text-theme leading-relaxed">
                              Enjoy a beautifully furnished 1-bedroom apartment in Al Mankhool,
                              offering a relaxing stay with modern comforts and easy city access.
                          </p>
                      </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gold mb-3">
                      <Link to="/listing" className="hover:underline">
                          List with Us
                      </Link>
                  </h2>

                  <p className="text-theme leading-relaxed mb-3">
                      Partner with Seventh Heaven and maximize your property's rental income through professional holiday home management and marketing services.
                  </p>


                  {/* ================= MANUFACTURING FACILITIES ================= */}
                  <h2 className="text-2xl font-bold text-gold mb-3">
                      <Link to="/contact-us" className="hover:underline">
                          Contact Us
                      </Link>
                  </h2>

                  <p className="text-theme leading-relaxed mb-3 lg:mb-5">
                      Get in touch with Seventh Heaven Holiday Homes for reservations, guest assistance, or property management inquiries. Our team is here to help.
                  </p>

                  <ul className="space-y-6">

                      {/* Email */}
                      <li className="flex items-start gap-4">

                          <span className="bg-gold p-2 rounded-sm flex-shrink-0">
                              <img
                                  src={emailIcon}
                                  alt="Email"
                                  className="w-4 h-4"
                              />
                          </span>

                          <div className="flex flex-col">
                              <h3 className="text-gold font-semibold text-lg mb-1">
                                  Seventh Heaven Holiday Homes L.L.C
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

                          <span className="bg-gold p-2 rounded-sm flex-shrink-0">
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

export default Error;