import { FaPlus, FaMinus } from "react-icons/fa";

interface MenuCardProps {
  menu: {
    id: string;
    foodName: string;
    price: number;
    image: string;
    type?: string;
  };
  quantity?: number;
  onAdd: (menu: any) => void;
  onDecrease?: (id: string) => void;
}

export default function MenuCard({
  menu,
  quantity = 0,
  onAdd,
  onDecrease,
}: MenuCardProps) {
  // Determine if the item is in the cart based on the quantity prop
  const isAdded = quantity > 0;

  return (
    <div className="flex flex-col bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
      {/* IMAGE */}
      <div className="w-full h-32 md:h-40 mb-4">
        <img
          src={menu.image || "/assets/placeholder-food.jpg"}
          alt={menu.foodName}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* INFO */}
      <div className="flex flex-col gap-2 flex-1">
        <h2 className="text-lg font-bold">{menu.foodName}</h2>
        <p className="text-gray-600 text-sm">{menu.type}</p>

        {/* PRICE + ACTION */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <p className="text-red-600 font-semibold">
            ${menu.price.toLocaleString()}
          </p>

          {!isAdded ? (
            // Show "Add" button if quantity is 0
            <button
              onClick={() => onAdd(menu)}
              className="px-4 py-1.5 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition shadow-sm"
            >
              Add
            </button>
          ) : (
            // Show controls if quantity > 0
            <div className="flex items-center gap-2">
              <button
                onClick={() => onDecrease && onDecrease(menu.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition shadow-sm"
              >
                <FaMinus size={12} />
              </button>

              <span className="font-semibold w-5 text-center">{quantity}</span>

              <button
                onClick={() => onAdd(menu)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow-sm"
              >
                <FaPlus size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

