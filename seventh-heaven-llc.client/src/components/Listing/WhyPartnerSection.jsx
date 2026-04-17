import FeatureCard from "./FeatureCard";
import { leftFeatures, rightFeatures } from "../../data/featuredata";
import featurePng from "@img/modern-villa-dubai.png";
import featureWebp from "@img/modern-villa-dubai.webp";

function WhyPartnerSection() {
  return (
      <section className="w-full py-8 sm:py-12 md:py-14 lg:py-16">
          <div className="container mx-auto px-4">
              <div className="text-center">
                  <div className="inline-block">
                      <h2 className="text-2xl md:text-3xl font-semibold text-theme text-left lg:text-center">
                          Why Partner with <span className="text-gold">Seventh Heaven?</span>
                      </h2>

                      <div className="mt-2">
                          <div className="w-[62%] h-[1px] bg-gold"></div>
                          <div className="w-[35%] h-[1px] bg-gold mt-1"></div>
                      </div>
                  </div>
              </div>
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