import { useEffect } from "react";
import BannerSection from "../components/BannerSection/BannerSection";
function ThankYou() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    }, []);

    return (
        <>
            <BannerSection
                title="Thank You"
                pageName="Thank You" />
            <section className="flex items-center justify-center px-4 py-10 sm:py-14 md:py-16">

                <div className="
                    bg-white 
                    rounded-2xl 
                    w-full 
                    max-w-2xl 
                    text-center 
                    px-6 sm:px-12 
                    py-12 sm:py-16 
                    border border-gold
                    shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]
                    relative
                ">

                    <div className="absolute inset-0 rounded-2xl border border-gold/30 pointer-events-none"></div>

                    {/* Heading */}
                    <h1 className="text-2xl sm:text-3xl md:text-3xl font-semibold text-[#0B4F8A] leading-tight mb-6">
                        Thank you for getting in touch!
                    </h1>

                    {/* Message */}
                    <div className="space-y-3 text-theme text-sm sm:text-base md:text-lg">
                        <p>
                            We have received your mail and we will revert back to you.
                        </p>

                        <p className="text-theme">
                            Have a great day!
                        </p>
                    </div>

                    <div className="w-16 h-[1px] bg-[#C5A553] mx-auto my-8"></div>

                    {/* Company */}
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#C5A553]">
                        – Seventh Heaven LLC
                    </h2>

                </div>
            </section>
        </>
    );
}

export default ThankYou;
