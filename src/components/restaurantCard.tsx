import type { Restaurant } from "@/types/restaurant";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

export default function RestaurantCard({
  restaurant,
  onClick,
}: RestaurantCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-4 border rounded-lg shadow-md p-4 hover:shadow-lg transition"
    >
      {/* LOGO DI KIRI */}
      <img
        src={restaurant.imageUrl || "/assets/default-logo.png"}
        alt={restaurant.name}
        className="w-20 h-20 object-cover rounded-lg"
      />

      {/* KETERANGAN DI KANAN */}
      <div className="flex flex-col justify-between">
        <h2 className="text-lg font-bold">{restaurant.name}</h2>
        <p className="text-sm text-gray-600">{restaurant.category}</p>
        <p className="text-sm font-medium text-yellow-500">
          ⭐ {restaurant.rating}
        </p>
        <p className="text-sm text-gray-500">{restaurant.address}</p>
      </div>
    </div>
  );
}
