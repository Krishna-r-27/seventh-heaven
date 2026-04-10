import { Link } from "react-router-dom";
import bannerImg from "@img/inner-banner.png";

const BannerSection = ({ title, pageName }) => {
  return (
      <div
          className="relative w-full bg-cover bg-center py-10 sm:py-12 md:py-14 lg:py-16 text-center"
          style={{
              backgroundImage: `url(${bannerImg})`
          }}
      >
          {/* 🔥 Overlay */}
          <div className="absolute inset-0 bg-[#005AA482]"></div>

          <div className="container mx-auto px-4 relative z-10">

              <h1 className="
                  text-xl sm:text-3xl md:text-4xl
                  font-bold mb-2 lg:mb-1
                  text-white
                ">
                  {title}
              </h1>

              <div className="
                  text-xs sm:text-sm md:text-base
                  text-white
                  flex items-center justify-center
                  gap-2
                ">
                  <Link to="/" className="hover:text-[#F89B32] transition">
                      Home
                  </Link>
                  <span>/</span>
                  <span className="font-medium">{pageName}</span>
              </div>

          </div>
      </div>
  );
}

export default BannerSection;