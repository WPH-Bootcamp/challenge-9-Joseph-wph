import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import RestaurantCard from "@/components/restaurantCard";
import { useRestaurants } from "@/hooks/useRestaurant";
import type { Restaurant } from "@/types/restaurant";

const categories = [
  { label: "All Restaurant", icon: "/assets/category/all-restaurant.svg" },
  { label: "Nearby", icon: "/assets/category/nearby.svg" },
  { label: "Discount", icon: "/assets/category/discount.svg" },
  { label: "Best Seller", icon: "/assets/category/best-seller.svg" },
  { label: "Delivery", icon: "/assets/category/delivery.svg" },
  { label: "Lunch", icon: "/assets/category/lunch.svg" },
];

export default function Main() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState("All Restaurant");

  const navigate = useNavigate();

  const {
    data: restaurants,
    isLoading,
    isError,
  } = useRestaurants(selectedCategory);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load restaurants</div>;
  }

  return (
    <div>
      {/* ================= CATEGORY ================= */}
      <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 md:px-10 py-6">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-5">
            {categories.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2"
              >
                <Card
                  className={`w-40 h-24 cursor-pointer transition-all shadow-md rounded-lg
                    ${selectedCategory === item.label ? "border-2 border-red-600" : "hover:bg-gray-100 hover:shadow-lg"}
                  `}
                  onClick={() => setSelectedCategory(item.label)}
                >
                  <CardContent className="flex justify-center items-center h-full p-4">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-12 h-12"
                    />
                  </CardContent>
                </Card>
                <h1 className="text-sm md:text-base font-bold text-center">
                  {item.label}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= RECOMMENDED ================= */}
      <div className="mx-auto max-w-7xl px-4 md:px-10 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-extrabold">Recommended</h1>
          <button
            className="text-base font-semibold text-red-600 hover:text-black transition"
            onClick={() => setVisibleCount(restaurants?.length || 0)}
          >
            See All
          </button>
        </div>

        {/* GRID CARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Array.isArray(restaurants) &&
            restaurants.slice(0, visibleCount).map((resto: Restaurant) => (
              <RestaurantCard
                key={resto.id}
                restaurant={resto}
                onClick={() => navigate(`/restaurant/${resto.id}`)}
              />
            ))}
        </div>

        {/* SHOW MORE BUTTON */}
        {Array.isArray(restaurants) && visibleCount < restaurants.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-3 rounded-full border border-black bg-transparent font-semibold hover:text-red-600 transition"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
