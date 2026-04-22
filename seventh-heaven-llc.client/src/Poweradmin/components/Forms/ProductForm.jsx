import React, { useState } from "react";
import TinyEditor from "./TinyEditor";
import SeoMetaSection from "./SeoMetaSection";
import MultiImageUpload from "./MultiImageUpload";



const ProductForm = () => {
    const [description, setDescription] = useState("");
    const [seoTitle, setSeoTitle] = useState("");
    const [metaTags, setMetaTags] = useState("");

    return (
        <div className="min-h-screen">
            <div className=" rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-800">
                    Add Product
                </h2>
                {/* Product Name */}
                <div className="mt-6">
                    <label className="mb-1 block  font-medium text-gray-700">
                        Product Name <span className="text-red-500">*</span>
                    </label>
                    <input className="w-full rounded-lg border border-gray-300 px-3 py-2 " />
                </div>
                {/* Toggles */}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[
                        "Display In New Arrivals?",
                        "Display In Best Sellers?",
                        "Display on Front-End?",
                    ].map((label) => (
                        <div key={label}>
                            <p className="mb-2  font-medium text-gray-700">
                                {label}
                            </p>
                            <div className="flex gap-4 ">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name={label} /> Yes
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name={label} /> No
                                </label>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6">
                    <div>
                        <label className="mb-1 block  font-medium text-gray-700">
                            Select 1st Level Category
                        </label>
                        <select className="w-full rounded-lg border border-gray-300 px-3 py-2 ">
                            <option>Select category</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block  font-medium text-gray-700">
                            Select 2nd Level Category
                        </label>
                        <select className="w-full rounded-lg border border-gray-300 px-3 py-2 ">
                            <option>Select sub category</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block  font-medium text-gray-700">
                            Select 3rd Level Category
                        </label>
                        <select className="w-full rounded-lg border border-gray-300 px-3 py-2 ">
                            <option>Select sub category</option>
                        </select>
                    </div>
                </div>

               

               

                {/* Image Upload */}
               
                <MultiImageUpload
                    label="Product Images"
                    required
                    onChange={(files) => {
                        console.log("Selected files:", files);
                    }}
                />

                {/* Capacity & Weight */}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label className="mb-1 block  font-medium text-gray-700">
                            Capacity
                        </label>
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 " />
                    </div>

                    <div>
                        <label className="mb-1 block  font-medium text-gray-700">
                            Weight
                        </label>
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 " />
                    </div>
                    <div>
                        <label className="mb-1 block  font-medium text-gray-700">
                            Dimension
                        </label>
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 " />
                    </div>
                </div>


                {/* ✅ Modular CKEditor */}
                <div className="mt-6">
                    <label className="mb-1 block  font-medium text-gray-700">
                        Product Description <span className="text-red-500">*</span>
                    </label>
                    <div className="rounded-lg border border-gray-300">
                        <TinyEditor
                            value={description}
                            onChange={setDescription}
                        />
                    </div>
                </div>

               
                {/* SEO */}
                {/* SEO */}
                <SeoMetaSection
                    seoTitle={seoTitle}
                    setSeoTitle={setSeoTitle}
                    metaTags={metaTags}
                    setMetaTags={setMetaTags}
                />


                {/* Submit */}
                <div className="mt-8 flex justify-end">
                    <button className="rounded-lg bg-indigo-600 px-6 py-2  text-white hover:bg-indigo-700">
                        Save Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
