import React from "react";
import data from "../../data/AboutUs/ctaData";
import Button from "@/Components/Button";
import bgImg from "../../assets/img/cta-bg.png";

const CTASection = () => {
    return (
        <section className="w-full pb-8 sm:pb-12 md:pb-14 lg:pb-16">

            <div className="container mx-auto px-3 md:px-4 flex justify-center">

                {/* CARD */}
                <div className="w-full max-w-6xl rounded-xl md:rounded-2xl px-4 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 relative overflow-hidden bg-[#0F5B9D] bg-no-repeat bg-cover bg-left-bottom"
                    style={{ backgroundImage: `url(${bgImg})` }} >
                    {/* HEADING FOR MOBILE */}
                    <h2 className="block lg:hidden text-white text-xl sm:text-2xl font-semibold leading-snug sm:text-center text-left">
                        {data.title}
                    </h2>
                    <div className="flex flex-row w-full items-center gap-4 lg:justify-between">
                        {/* LEFT CONTENT */}
                        <div className="flex-1 lg:w-auto max-w-xl text-left lg:text-left lg:ms-8">

                            <h2 className="hidden lg:block text-white text-2xl md:text-3xl font-semibold leading-snug mb-4">
                                {data.title}
                            </h2>

                            <p className="text-white text-md mb-6">
                                {data.subtitle}
                            </p>

                            <Button variant="outline" className="bg-white" to="/book-now">
                                Book Now
                            </Button>

                        </div>

                        {/* RIGHT IMAGE (HIDE ON MOBILE) */}
                        <div className="max-[379px]:hidden flex w-auto max-w-[100px] sm:max-w-[180px] lg:max-w-[240px] justify-end">

                            <picture>
                                <source srcSet={data.image.webp} type="image/webp" />
                                <img
                                    src={data.image.png}
                                    alt="CTA"
                                    className="w-full h-[200px] lg:h-[300px] object-contain"
                                />
                            </picture>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default CTASection;