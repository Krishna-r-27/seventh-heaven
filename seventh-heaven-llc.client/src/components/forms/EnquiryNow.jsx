import { useEffect, useState } from "react";
import axios from "axios";
import { FiChevronDown } from "react-icons/fi";
import { showToast } from "@/lib/toast";
import { useNavigate } from "react-router-dom";

const propertyTypeOptions = [
    "Apartment",
    "Villa",
    "Studio",
    "1 BHK",
    "2 BHK",
    "Commercial",
    "Penthouse",
    "Town Houses",
];

const initialForm = {
    ID:"",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    propertyType: "",
    noOfPersons: "",
    visitDate: "",
    captcha: "",
};

function generateMathCaptcha() {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const op = Math.random() > 0.5 ? "+" : "-";

    if (op === "+") return { question: `${a} + ${b} = ?`, answer: a + b };

    const bigger = Math.max(a, b);
    const smaller = Math.min(a, b);
    return { question: `${bigger} - ${smaller} = ?`, answer: bigger - smaller };
}

function EnquiryNow({ defaultPropertyType = "", propertyId = null }) {
    const navigate = useNavigate();
    const apiBase = import.meta.env.VITE_API_BASE || "/api";
    const [form, setForm] = useState(() => ({
        ...initialForm,
        propertyType: defaultPropertyType || "",
        propertyId: propertyId
    }));
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [captcha, setCaptcha] = useState(() => generateMathCaptcha());
    const propertyOptions = defaultPropertyType && !propertyTypeOptions.includes(defaultPropertyType)
        ? [defaultPropertyType, ...propertyTypeOptions]
        : propertyTypeOptions;

    useEffect(() => {
        if (!defaultPropertyType) return;
        setForm((prev) => ({ ...prev, propertyType: defaultPropertyType }));
    }, [defaultPropertyType]);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setField(name, value) {
        let next = value;
        if (name === "firstName" || name === "lastName") {
            next = value.replace(/[^A-Za-z ]+/g, "");
        }
        if (name === "phone") {
            next = value.replace(/\D+/g, "").slice(0, 10);
        }
        if (name === "noOfPersons") {
            next = value.replace(/\D+/g, "");
        }
        if (name === "captcha") {
            next = value.replace(/\D+/g, "");
        }
        setForm((prev) => ({ ...prev, [name]: next }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    function validate() {
        const nextErrors = {};
        if (!form.firstName.trim()) nextErrors.firstName = "First name is mandatory.";
        else if (!/^[A-Za-z ]+$/.test(form.firstName.trim())) nextErrors.firstName = "First name allows only alphabets and spaces.";

        if (!form.lastName.trim()) nextErrors.lastName = "Last name is mandatory.";
        else if (!/^[A-Za-z ]+$/.test(form.lastName.trim())) nextErrors.lastName = "Last name allows only alphabets and spaces.";

        if (!form.phone.trim()) nextErrors.phone = "Phone number is mandatory.";
        else if (!/^\d{10}$/.test(form.phone.trim())) nextErrors.phone = "Phone number must be exactly 10 digits.";

        if (!form.email.trim()) nextErrors.email = "Email is mandatory.";
        else if (!emailRegex.test(form.email.trim())) nextErrors.email = "Please enter a valid email address.";

        if (!form.propertyType.trim()) nextErrors.propertyType = "Property type is mandatory.";
        if (!form.noOfPersons.trim()) nextErrors.noOfPersons = "No. of persons is mandatory.";
        if (!form.visitDate.trim()) nextErrors.visitDate = "Visit date is mandatory.";
        if (!form.captcha.trim()) nextErrors.captcha = "Captcha is mandatory.";
        else if (Number(form.captcha) !== captcha.answer) nextErrors.captcha = "Captcha answer is incorrect.";

        return nextErrors;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const nextErrors = validate();
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            showToast.error(Object.values(nextErrors)[0]);
            return;
        }

        setSubmitting(true);
        try {
            await axios.post(`${apiBase}/propertyinquiries`, {
                ID: propertyId,
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                phone: form.phone.trim(),
                email: form.email.trim(),
                propertyType: form.propertyType.trim(),
                noOfPersons: Number(form.noOfPersons),
                visitDate: form.visitDate,
            });

            showToast.success("Enquiry submitted successfully.");
            setForm({
                ...initialForm,
                propertyType: defaultPropertyType || "",
            });
            setErrors({});
            setCaptcha(generateMathCaptcha());
            navigate("/thank-you");
        } catch (error) {
            showToast.error(error?.response?.data?.message || "Failed to submit enquiry.");
        } finally {
            setSubmitting(false);
        }
    }

  return (
      <div className="border border-gold rounded-xl p-4 md:p-8 bg-white">

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6 text-theme">
              Enquiry <span className="text-gold">Now</span>
          </h2>

          <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>

              <input
                  type="text"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  className="border border-theme placeholder:text-theme rounded-md px-4 py-3 w-full focus:outline-none focus:border-[#005AA4]"
              />
              {errors.firstName && <p className="text-red-600 text-sm -mt-2">{errors.firstName}</p>}

              <input
                  type="text"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  className="border border-theme placeholder:text-theme rounded-md px-4 py-3 w-full focus:outline-none focus:border-[#005AA4]"
              />
              {errors.lastName && <p className="text-red-600 text-sm -mt-2">{errors.lastName}</p>}

              <input
                  type="text"
                  placeholder="Phone No."
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  inputMode="numeric"
                  className="border border-theme placeholder:text-theme rounded-md px-4 py-3 w-full focus:outline-none focus:border-[#005AA4]"
              />
              {errors.phone && <p className="text-red-600 text-sm -mt-2">{errors.phone}</p>}

              <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="border border-theme placeholder:text-theme rounded-md px-4 py-3 w-full focus:outline-none focus:border-[#005AA4]"
              />
              {errors.email && <p className="text-red-600 text-sm -mt-2">{errors.email}</p>}

              {/* Property Type */}
              <div className="relative">
                  <select
                      value={form.propertyType}
                      onChange={(e) => setField("propertyType", e.target.value)}
                      className="w-full appearance-none border border-theme rounded-md px-4 py-3 pr-10 text-theme focus:outline-none focus:border-[#005AA4]"
                  >
                      <option value="">Property Type</option>
                      {propertyOptions.map((type) => (
                          <option key={type} value={type}>{type}</option>
                      ))}
                  </select>

                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.propertyType && <p className="text-red-600 text-sm -mt-2">{errors.propertyType}</p>}

              <input
                  type="text"
                  inputMode="numeric"
                  placeholder="No. of Persons"
                  value={form.noOfPersons}
                  onChange={(e) => setField("noOfPersons", e.target.value)}
                  className="border border-theme placeholder:text-theme rounded-md px-4 py-3 w-full focus:outline-none focus:border-[#005AA4]"
              />
              {errors.noOfPersons && <p className="text-red-600 text-sm -mt-2">{errors.noOfPersons}</p>}

              <input
                  type="date"
                  value={form.visitDate}
                  onChange={(e) => setField("visitDate", e.target.value)}
                  className="border border-theme rounded-md px-4 py-3 w-full focus:outline-none focus:border-[#005AA4]"
              />
              {errors.visitDate && <p className="text-red-600 text-sm -mt-2">{errors.visitDate}</p>}

              {/* Captcha */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-center">
                  <input
                      type="text"
                      placeholder="Enter the captcha"
                      value={form.captcha}
                      onChange={(e) => setField("captcha", e.target.value)}
                      className="border border-theme placeholder:text-theme rounded-md px-4 py-3 md:col-span-2 focus:outline-none focus:border-[#005AA4]"
                  />
                  <div className="border border-theme rounded-md px-4 py-3 text-center bg-gray-100 text-theme">
                      {captcha.question}
                  </div>
              </div>
              {errors.captcha && <p className="text-red-600 text-sm -mt-2">{errors.captcha}</p>}

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

export default EnquiryNow;