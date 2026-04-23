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
  propertyType: "",
  rooms: "",
  bathrooms: "",    
  maxGuests: "",
  amenities: "",
  address: "",
  details: "",
  captcha: "",
  images: [],
  imagePreviews: [],
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

  if (op === "+") {
    return { question: `${a} + ${b} = ?`, answer: a + b };
  }

  const bigger = Math.max(a, b);
  const smaller = Math.min(a, b);
  return { question: `${bigger} - ${smaller} = ?`, answer: bigger - smaller };
}

function ListProperty() {
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

    if (name === "rooms" || name === "bathrooms" || name === "maxGuests" || name === "captcha") {
      nextValue = value.replace(/\D+/g, "");
    }

    setForm((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.firstName.trim()) nextErrors.firstName = "First name is mandatory.";
    if (!form.lastName.trim()) nextErrors.lastName = "Last name is mandatory.";
    if (!form.phone.trim()) nextErrors.phone = "Phone number is mandatory.";
    if (form.phone.trim() && !/^\+?[0-9 ]+$/.test(form.phone.trim())) {
      nextErrors.phone = "Phone number can contain only numbers, + and spaces.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is mandatory.";
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address (example: name@example.com).";
    }

    if (!form.rooms.trim()) nextErrors.rooms = "Rooms is mandatory.";
    if (!form.bathrooms.trim()) nextErrors.bathrooms = "Bathrooms is mandatory.";
    if (!form.maxGuests.trim()) nextErrors.maxGuests = "Guests is mandatory.";
    if (!form.captcha.trim()) nextErrors.captcha = "Captcha is mandatory.";

    return nextErrors;
  }

  function isCaptchaValid() {
    return Number(form.captcha) === captcha.answer;
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
      await axios.post(`${apiBase}/propertylistings`, {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email,
        city: form.city,
        propertyType: form.propertyType,
        rooms: form.rooms,
        bathrooms: form.bathrooms,
        maxGuests: form.maxGuests,
        amenities: form.amenities,
        address: form.address,
        details: form.details,
        images: (form.images || []).map((file) => ({
          fileName: file?.name || "uploaded-image",
          contentType: file?.type || "application/octet-stream",
          base64Data: form.imagePreviews?.find((x) => x?.fileName === file?.name)?.base64Data || "",
        })),
      });
      showToast.success("Your property listing has been submitted.");
      setForm(initialForm);
      setCaptcha(generateMathCaptcha());
      navigate("/thank-you");
    } catch (error) {
      showToast.error(error, "Failed to submit your listing request.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
      <div className="border border-gold rounded-xl p-4 md:p-8 bg-white">

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:mb-6 text-theme">
              List Your <span className="text-gold">Property</span>
          </h2>

          <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <input
                      type="text"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={(e) => onFieldChange("firstName", e.target.value)}
                      required
                      className="border border-theme placeholder:text-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                  />
                  {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                  <input
                      type="text"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={(e) => onFieldChange("lastName", e.target.value)}
                      required
                      className="border border-theme placeholder:text-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                  />
                  {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <input
                      type="text"
                      placeholder="Phone no."
                      value={form.phone}
                      onChange={(e) => onFieldChange("phone", e.target.value)}
                      inputMode="tel"
                      required
                      className="border border-theme placeholder:text-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                  <input
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) => onFieldChange("email", e.target.value)}
                      required
                      className="border border-theme placeholder:text-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                  <div className="relative">
                      <select
                          value={form.city}
                          onChange={(e) => onFieldChange("city", e.target.value)}
                          className="w-full appearance-none border border-theme rounded-md px-4 py-3 pr-10 text-theme focus:outline-none focus:border-[#005AA4]"
                      >
                          <option value="">--Select City--</option>
                          {dubaiCityOptions.map((city) => (
                              <option key={city} value={city}>
                                  {city}
                              </option>
                          ))}
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                      <select
                          value={form.propertyType}
                          onChange={(e) => onFieldChange("propertyType", e.target.value)}
                          className="w-full appearance-none border border-theme rounded-md px-4 py-3 pr-10 text-theme focus:outline-none focus:border-[#005AA4]"
                      >
                          <option value="">--Property Type--</option>
                          <option>Apartment</option>
                          <option>Villa</option>
                          <option>Studio</option>
                          <option>1 BHK</option>
                          <option>2 BHK</option>
                          <option>Commercial</option>
                          <option>Penthouse</option>
                          <option>Town Houses</option>
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                  <div className="relative">
                      <input
                          type="number"
                          min={0}
                          placeholder="Rooms"
                          value={form.rooms}
                          onChange={(e) => onFieldChange("rooms", e.target.value)}
                          inputMode="numeric"
                          required
                          className="w-full border border-theme placeholder:text-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                      />
                      {errors.rooms && <p className="text-red-600 text-sm mt-1">{errors.rooms}</p>}
                      {/*<FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />*/}
                  </div>

                  <div className="relative">
                      <input
                          type="number"
                          min={0}
                          placeholder="Bathrooms"
                          className="w-full border border-theme placeholder:text-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                          value={form.bathrooms}
                          onChange={(e) => onFieldChange("bathrooms", e.target.value)}
                          inputMode="numeric"
                          required
                      />
                      {errors.bathrooms && <p className="text-red-600 text-sm mt-1">{errors.bathrooms}</p>}
                      {/*<FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />*/}
                  </div>

                  <div className="relative">
                      <input
                          type="number"
                          min={0}
                          placeholder="Max No. of Guests"
                          value={form.maxGuests}
                          onChange={(e) => onFieldChange("maxGuests", e.target.value)}
                          inputMode="numeric"
                          required
                          className="w-full border border-theme placeholder:text-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                      />
                      {errors.maxGuests && <p className="text-red-600 text-sm mt-1">{errors.maxGuests}</p>}
                  </div>   

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                                 

              </div>

              <div className="relative">
                  <textarea
                      rows="3"
                      placeholder="Amenities"
                      value={form.amenities}
                      onChange={(e) => onFieldChange("amenities", e.target.value)}
                      className="w-full border border-theme placeholder:text-theme rounded-md px-4 py-3 focus:outline-none focus:border-[#005AA4]"
                  />
              </div>

              <input
                  type="text"
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) => onFieldChange("address", e.target.value)}
                  className="border border-theme placeholder:text-theme rounded-md px-4 py-3 w-full focus:outline-none focus:border-[#005AA4]"
              />

              <textarea
                  placeholder="Details"
                  rows="4"
                  value={form.details}
                  onChange={(e) => onFieldChange("details", e.target.value)}
                  className="border border-theme placeholder:text-theme rounded-md px-4 py-3 mb-3 w-full focus:outline-none focus:border-[#005AA4]"
              ></textarea>

              <div>
                  <p className="text-md mb-3 text-theme">Add Images</p>

                  <div className="flex gap-3 items-center">
                      <label
                          htmlFor="image-upload"
                          className="w-[66px] h-[63px] flex items-center justify-center bg-[#F1F1F1] rounded-md text-2xl cursor-pointer border border-dashed border-theme"
                      >
                          <span className="text-theme">+</span>
                          <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) => {
                                  // Read all selected image files
                                  if (e.target.files) {
                                      const files = Array.from(e.target.files);
                                      // Optionally, validate types/size here

                                      // If you'd like both previews and actual files for submit:
                                      // Generate base64 previews for display
                                      Promise.all(
                                          files.map(file => {
                                              return new Promise(resolve => {
                                                  const reader = new FileReader();
                                                  reader.onload = () => resolve({ file, preview: reader.result });
                                                  reader.readAsDataURL(file);
                                              });
                                          })
                                      ).then(imagesWithPreview => {
                                          // You may choose to store an array of {file, preview} or keep separate arrays,
                                          // Here, we just store the file for submission and preview for UI
                                          onFieldChange(
                                            "images",
                                            imagesWithPreview.map(imgObj => imgObj.file)
                                          );
                                          onFieldChange(
                                            "imagePreviews",
                                            imagesWithPreview.map(imgObj => ({
                                              fileName: imgObj.file?.name || "",
                                              base64Data: typeof imgObj.preview === "string" ? imgObj.preview : "",
                                            }))
                                          );
                                      });
                                  }
                              }}
                          />
                      </label>
                      {/* Previews: use form.imagePreviews if present, otherwise fallback */}
                      {form.imagePreviews && form.imagePreviews.length > 0
                          ? form.imagePreviews.map((img, idx) => (
                              <div key={idx} className="w-[66px] h-[63px] rounded-md overflow-hidden relative">
                                  <img
                                      src={img.base64Data}
                                      alt={`preview-${idx}`}
                                      className="w-full h-full object-cover"
                                  />
                              </div>
                          ))
                          : form.images && form.images.length > 0 &&
                            form.images.map((img, idx) => {
                                const src = typeof img === "string"
                                    ? img
                                    : URL.createObjectURL(img);
                                return (
                                    <div key={idx} className="w-[66px] h-[63px] rounded-md overflow-hidden relative">
                                        <img
                                            src={src}
                                            alt={`preview-${idx}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                );
                            })
                      }
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
                  <input
                      type="text"
                      placeholder="Enter the captcha"
                      value={form.captcha}
                      onChange={(e) => onFieldChange("captcha", e.target.value)}
                      inputMode="numeric"
                      required
                      className="border border-theme placeholder:text-theme rounded-md px-4 py-3 md:col-span-2 focus:outline-none focus:border-[#005AA4]"
                  />
                  {errors.captcha && <p className="text-red-600 text-sm mt-1 md:col-span-2">{errors.captcha}</p>}
                  <div className="border border-theme rounded-md px-4 py-3 text-center bg-gray-100 text-theme">
                      {captcha.question}
                  </div>
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

export default ListProperty;