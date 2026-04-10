import Button from "@/Components/Button";

export default function HomeBanner() {
    return (
        <section className="relative h-[600px] w-full overflow-hidden">

            {/* Background Image */}

            <picture>
                <source srcSet="/assets/img/dubai-banner.webp" type="image/webp" />
                <img
                    src="/assets/img/dubai-banner.png"
                    alt="Dubai Skyline"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </picture>

            {/* Overlay */}

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,90,164,0.75)_0%,rgba(0,90,164,0.55)_40%,rgba(0,90,164,0.2)_70%,transparent_100%)]"></div>

            {/* Content */}

            <div className="relative container mx-auto flex h-full items-center">

                <div className="max-w-[520px] text-white">

                    <h1 className="font-manrope text-heading-sm leading-tight font-bold md:text-heading lg:text-display">
                        Making Vacations
                        <br />
                        Memorable
                    </h1>

                    <p className="text-body-sm mt-4 /90 md:text-body">
                        Your dream house is just one step away let’s discover it together
                        today and start living.
                    </p>

                    <div className="mt-6">
                        <Button variant="outline" to="/list-with-us">
                            List With Us
                        </Button>
                    </div>

                </div>

            </div>

        </section>
    );
}