import Button from "@/components/Button";
function ContactForm() {
    return (
        <div className="border border-gold rounded-xl p-4 md:p-8 bg-white">

            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-theme">
                Send us a <span className="text-gold">Message</span>
            </h2>

            <form className="space-y-4 lg:space-y-6">

                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border border-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                    />
                    <input
                        type="text"
                        placeholder="Phone no."
                        className="border rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                    />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <input
                        type="email"
                        placeholder="Email"
                        className="border rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        className="border rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                    />
                </div>

                {/* Message */}
                <textarea
                    placeholder="Message"
                    rows="4"
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-[#005AA4]"
                ></textarea>

                {/* Captcha */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
                    <input
                        type="text"
                        placeholder="Enter the captcha"
                        className="border rounded-md px-4 py-3 md:col-span-2 focus:outline-none focus:border-[#005AA4]"
                    />
                    <div className="border rounded-md px-4 py-3 text-center bg-gray-100">
                        5 - four = ?
                    </div>
                </div>

                {/* Button */}
                <Button variant="primary" to="#" className="mt-2">
                    Submit Now
                </Button>
            </form>
        </div>
    );
}

export default ContactForm;