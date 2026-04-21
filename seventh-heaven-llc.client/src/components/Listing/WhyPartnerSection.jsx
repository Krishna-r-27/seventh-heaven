import FeatureCard from "./FeatureCard";
import { leftFeatures, rightFeatures } from "../../data/featuredata";
import featurePng from "@img/modern-villa-dubai.png";
import featureWebp from "@img/modern-villa-dubai.webp";
import { motion, useAnimation } from "framer-motion";

function WhyPartnerSection() {
    const controls = useAnimation();
  return (
      <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16">
          <div className="container mx-auto px-4">
              <motion.div
                  className="text-center"
                  initial="hidden"
                  animate={controls}
                  onViewportEnter={() => controls.start("visible")}
                  onViewportLeave={() => controls.start("hidden")}
                  viewport={{ amount: 0.4 }}
              >
                  <div className="inline-block">

                      {/* TITLE */}
                      <motion.h2
                          className="text-2xl md:text-3xl font-semibold text-theme text-left lg:text-center"
                          variants={{
                              hidden: { y: 30, opacity: 0 },
                              visible: {
                                  y: 0,
                                  opacity: 1,
                                  transition: { duration: 0.6, ease: "easeOut" }
                              }
                          }}
                      >
                          Why Partner with{" "}
                          <span className="text-gold">Seventh Heaven?</span>
                      </motion.h2>

                      {/* LINES */}
                      <div className="mt-2">

                          {/* LINE 1 */}
                          <motion.div
                              className="w-[62%] h-[1px] bg-gold mx-auto"
                              style={{ originX: 0.5 }}
                              variants={{
                                  hidden: { scaleX: 0, opacity: 0 },
                                  visible: {
                                      scaleX: 1,
                                      opacity: 1,
                                      transition: { delay: 0.6, duration: 0.4 }
                                  }
                              }}
                          />

                          {/* LINE 2 */}
                          <motion.div
                              className="w-[35%] h-[1px] bg-gold mt-1 mx-auto"
                              style={{ originX: 0.5 }}
                              variants={{
                                  hidden: { scaleX: 0, opacity: 0 },
                                  visible: {
                                      scaleX: 1,
                                      opacity: 1,
                                      transition: { delay: 0.8, duration: 0.4 }
                                  }
                              }}
                          />
                      </div>

                  </div>
              </motion.div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mt-4 lg:mt-6">

                  {/* LEFT */}
                  <div className="order-2 lg:order-1 space-y-4">
                      {leftFeatures.map((item, i) => (
                          <FeatureCard key={i} {...item} />
                      ))}
                  </div>

                  {/* IMAGE */}
                  <div className="order-1 lg:order-2 flex justify-center">
                      <picture>
                          <source srcSet={featureWebp} type="image/webp" />
                          <img
                              src={featurePng}
                              alt="property"
                              className="rounded-xl w-full h-full max-w-md"
                          />
                      </picture>
                  </div>

                  {/* RIGHT */}
                  <div className="order-3 space-y-4">
                      {rightFeatures.map((item, i) => (
                          <FeatureCard key={i} {...item} />
                      ))}
                  </div>

              </div>
          </div>
      </section>
  );
}

export default WhyPartnerSection;