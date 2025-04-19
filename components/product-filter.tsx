"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function ProductFilter() {
  const [filters, setFilters] = useState({
    gender: [],
    size: [],
    color: [],
    price: [],
  })

  const [expandedSections, setExpandedSections] = useState({
    gender: true,
    size: true,
    color: true,
    price: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section as keyof typeof expandedSections],
    })
  }

  const handleFilterChange = (category: string, value: string) => {
    setFilters((prevFilters) => {
      const currentFilters = [...(prevFilters[category as keyof typeof prevFilters] as string[])]

      if (currentFilters.includes(value)) {
        return {
          ...prevFilters,
          [category]: currentFilters.filter((item) => item !== value),
        }
      } else {
        return {
          ...prevFilters,
          [category]: [...currentFilters, value],
        }
      }
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 font-montserrat">FILTERS</h2>

      {/* Gender Filter */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          className="flex items-center justify-between w-full text-left font-semibold mb-4"
          onClick={() => toggleSection("gender")}
        >
          <span>Gender</span>
          {expandedSections.gender ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>

        {expandedSections.gender && (
          <div className="space-y-2">
            {["Men", "Women", "Unisex"].map((gender) => (
              <div key={gender} className="flex items-center">
                <input
                  type="checkbox"
                  id={`gender-${gender.toLowerCase()}`}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  checked={filters.gender.includes(gender.toLowerCase())}
                  onChange={() => handleFilterChange("gender", gender.toLowerCase())}
                />
                <label htmlFor={`gender-${gender.toLowerCase()}`} className="ml-2 text-gray-700">
                  {gender}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          className="flex items-center justify-between w-full text-left font-semibold mb-4"
          onClick={() => toggleSection("size")}
        >
          <span>Size</span>
          {expandedSections.size ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>

        {expandedSections.size && (
          <div className="space-y-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size} className="flex items-center">
                <input
                  type="checkbox"
                  id={`size-${size.toLowerCase()}`}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  checked={filters.size.includes(size.toLowerCase())}
                  onChange={() => handleFilterChange("size", size.toLowerCase())}
                />
                <label htmlFor={`size-${size.toLowerCase()}`} className="ml-2 text-gray-700">
                  {size}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          className="flex items-center justify-between w-full text-left font-semibold mb-4"
          onClick={() => toggleSection("color")}
        >
          <span>Color</span>
          {expandedSections.color ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>

        {expandedSections.color && (
          <div className="space-y-2">
            {["Black", "White", "Red", "Blue", "Green", "Gray"].map((color) => (
              <div key={color} className="flex items-center">
                <input
                  type="checkbox"
                  id={`color-${color.toLowerCase()}`}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  checked={filters.color.includes(color.toLowerCase())}
                  onChange={() => handleFilterChange("color", color.toLowerCase())}
                />
                <label htmlFor={`color-${color.toLowerCase()}`} className="ml-2 text-gray-700 flex items-center">
                  <span
                    className={`inline-block w-4 h-4 mr-2 rounded-full bg-${color.toLowerCase() === "white" ? "gray-100 border border-gray-300" : color.toLowerCase()}`}
                  ></span>
                  {color}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left font-semibold mb-4"
          onClick={() => toggleSection("price")}
        >
          <span>Price</span>
          {expandedSections.price ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>

        {expandedSections.price && (
          <div className="space-y-2">
            {[
              { label: "Under $25", value: "under-25" },
              { label: "$25 - $50", value: "25-50" },
              { label: "$50 - $100", value: "50-100" },
              { label: "Over $100", value: "over-100" },
            ].map((priceRange) => (
              <div key={priceRange.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`price-${priceRange.value}`}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  checked={filters.price.includes(priceRange.value)}
                  onChange={() => handleFilterChange("price", priceRange.value)}
                />
                <label htmlFor={`price-${priceRange.value}`} className="ml-2 text-gray-700">
                  {priceRange.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
        APPLY FILTERS
      </button>
      <button className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 px-4 mt-2">CLEAR ALL</button>
    </div>
  )
}
