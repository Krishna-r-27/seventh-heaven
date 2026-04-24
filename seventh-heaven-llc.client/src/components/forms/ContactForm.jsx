import { useState } from "react";
import axios from "axios";
import { FiChevronDown } from "react-icons/fi";
import { showToast } from "@/lib/toast";
import { useNavigate } from "react-router-dom";

const initialForm = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    message: "",
    captcha: "",
};

const dubaiCityOptions = [
    "Bur Dubai",
    "Deira",
    "Jumeirah",
    "Downtown Dubai",
    "Dubai Marina",
    "Business Bay",
    "Palm Jumeirah",
    "Jumeirah Lake Towers",
    "Jumeirah Village Circle (JVC)",
    "Al Barsha",
    "Mirdif",
    "Al Nahda (Dubai)",
    "Dubai Silicon Oasis",
    "International City",
    "Dubai Sports City",
    "Arabian Ranches",
    "Discovery Gardens",
    "The Greens",
    "Dubai Investment Park",
    "Dubai Creek Harbour",
];

function generateMathCaptcha() {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const op = Math.random() > 0.5 ? "+" : "-";

    if (op === "+") return { question: `${a} + ${b} = ?`, answer: a + b };

    const bigger = Math.max(a, b);
    const smaller = Math.min(a, b);
    return { question: `${bigger} - ${smaller} = ?`, answer: bigger - smaller };
}

function ContactForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [captcha, setCaptcha] = useState(() => generateMathCaptcha());
    const apiBase = import.meta.env.VITE_API_BASE || "/api";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function onFieldChange(name, value) {
        let nextValue = value;

        if (name === "firstName" || name === "lastName") {
            nextValue = value.replace(/[^A-Za-z ]+/g, "");
        }

        if (name === "phone") {
            nextValue = value.replace(/[^\d+ ]+/g, "");
            nextValue = nextValue.replace(/\+/g, (match, offset) => (offset === 0 ? match : ""));
        }

        if (name === "captcha") {
            nextValue = value.replace(/\D+/g, "");
        }

        setForm((prev) => ({ ...prev, [name]: nextValue }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    function isCaptchaValid() {
        return Number(form.captcha) === captcha.answer;
    }

    function validateForm() {
        const nextErrors = {};

        if (!form.firstName.trim()) nextErrors.firstName = "First name is mandatory.";
        if (!form.lastName.trim()) nextErrors.lastName = "Last name is mandatory.";

        if (!form.phone.trim()) {
            nextErrors.phone = "Phone number is mandatory.";
        } else if (!/^\+?[0-9 ]+$/.test(form.phone.trim())) {
            nextErrors.phone = "Phone number can contain only numbers, + and spaces.";
        }

        if (!form.email.trim()) {
            nextErrors.email = "Email is mandatory.";
        } else if (!emailRegex.test(form.email.trim())) {
            nextErrors.email = "Please enter a valid email address (example: name@example.com).";
        }

        if (!form.city.trim()) nextErrors.city = "City is mandatory.";
        if (!form.message.trim()) nextErrors.message = "Message is mandatory.";
        if (!form.captcha.trim()) nextErrors.captcha = "Captcha is mandatory.";

        return nextErrors;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            showToast.error(Object.values(validationErrors)[0]);
            return;
        }

        if (!isCaptchaValid()) {
            setErrors((prev) => ({ ...prev, captcha: "Captcha answer is incorrect." }));
            showToast.error("Captcha answer is incorrect.");
            setCaptcha(generateMathCaptcha());
            onFieldChange("captcha", "");
            return;
        }

        setSubmitting(true);
        try {
            await axios.post(`${apiBase}/contactinquiries`, {
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                phone: form.phone.trim(),
                email: form.email.trim(),
                city: form.city.trim(),
                message: form.message.trim(),
            });

            showToast.success("Your message has been submitted successfully.");
            setForm(initialForm);
            setErrors({});
            setCaptcha(generateMathCaptcha());
            navigate("/thank-you");
        } catch (error) {
            showToast.error(error, "Failed to submit your message.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="border border-gold rounded-xl p-4 md:p-8 bg-white">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-theme">
                Send us a <span className="text-gold">Message</span>
            </h2>

            <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={(e) => onFieldChange("firstName", e.target.value)}
                            required
                            className="border border-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4] w-full"
                        />
                        {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={(e) => onFieldChange("lastName", e.target.value)}
                            required
                            className="border border-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4] w-full"
                        />
                        {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                        <input
                            type="text"
                            placeholder="Phone no."
                            value={form.phone}
                            onChange={(e) => onFieldChange("phone", e.target.value)}
                            inputMode="tel"
                            required
                            className="border rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4] w-full"
                        />
                        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => onFieldChange("email", e.target.value)}
                            required
                            className="border rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4] w-full"
                        />
                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                    </div>
                </div>

                <div className="relative">
                    <select
                        value={form.city}
                        onChange={(e) => onFieldChange("city", e.target.value)}
                        required
                        className="w-full appearance-none border rounded-md px-4 py-3 pr-10 focus:outline-none focus:border-[#005AA4]"
                    >
                        <option value="">--Select City--</option>
                        {dubaiCityOptions.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                    <textarea
                        placeholder="Message"
                        rows="4"
                        value={form.message}
                        onChange={(e) => onFieldChange("message", e.target.value)}
                        required
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-[#005AA4]"
                    />
                    {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
                    <div className="md:col-span-2">
                        <input
                            type="text"
                            placeholder="Enter the captcha"
                            value={form.captcha}
                            onChange={(e) => onFieldChange("captcha", e.target.value)}
                            inputMode="numeric"
                            required
                            className="border rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4] w-full"
                        />
                        {errors.captcha && <p className="text-red-600 text-sm mt-1">{errors.captcha}</p>}
                    </div>
                    <div className="border rounded-md px-4 py-3 text-center bg-gray-100">{captcha.question}</div>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 rounded-full bg-primary px-5 py-2.5 text-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {submitting ? "Submitting..." : "Submit Now"}
                </button>
            </form>
        </div>
    );
}

export default ContactForm;