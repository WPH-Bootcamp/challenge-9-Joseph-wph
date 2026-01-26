import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRestaurantDetail } from "@/hooks/useRestaurantDetail";
import MenuCard from "@/components/menuCard";
import NavbarUser from "@/components/navbar/navbarUser";
import Footer from "@/components/footer";
import { FaPlus, FaMinus, FaShoppingCart, FaArrowLeft } from "react-icons/fa";

type MenuFilter = "All" | "Food" | "Drink";

type CartItem = {
  id: string;
  foodName: string;
  price: number;
  image: string;
  quantity: number;
};

export default function RestaurantDetail() {
  const { id } = useParams();
  const {
    data: restaurant,
    isLoading,
    isError,
  } = useRestaurantDetail(id || "");

  const [menuFilter, setMenuFilter] = useState<MenuFilter>("All");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const user = {
    name: "User",
    email: "user@example.com",
    avatar: undefined,
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Failed to load restaurant</div>;
  if (!restaurant) return <div className="p-6">Restaurant not found</div>;

  const filteredMenus =
    restaurant.menus?.filter((menu) => {
      if (menuFilter === "All") return true;
      const menuType = (menu.type || "").toLowerCase();
      return menuType === menuFilter.toLowerCase();
    }) || [];

  // Logic to handle adding items correctly
  const addToCart = (menu: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === menu.id);

      if (existingItem) {
        // If item exists, map through and increment quantity
        return prevCart.map((item) =>
          item.id === menu.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new, add with quantity 1
        return [
          ...prevCart,
          {
            id: menu.id,
            foodName: menu.foodName,
            price: menu.price,
            image: menu.image,
            quantity: 1,
          },
        ];
      }
    });
  };

  const updateQuantity = (id: string, action: "increase" | "decrease") => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity =
              action === "increase"
                ? item.quantity + 1
                : Math.max(0, item.quantity - 1);

            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <NavbarUser user={user} onCartClick={() => setIsCartOpen(!isCartOpen)} />

      <div className="max-w-7xl mx-auto px-4 md:px-10 mt-6">
        {!isCartOpen && (
          <>
            {/* GALLERY */}
            <div className="flex flex-col md:flex-row h-auto md:h-[500px] gap-4">
              {/* ✅ FIXED: Added optional chaining ?. to prevent crash if images are missing */}
              <div className="w-full md:w-2/3 h-[250px] md:h-full">
                <img
                  src={restaurant.images?.[0] || "/assets/placeholder-food.jpg"}
                  alt="restaurant"
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-4 h-full">
                <div className="flex-1 h-full">
                  <img
                    src={restaurant.images?.[1] || "/assets/placeholder-food.jpg"}
                    alt="restaurant"
                    className="w-full h-full object-cover rounded-lg shadow-sm"
                  />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4 h-full">
                  <div className="h-full">
                    <img
                      src={restaurant.images?.[2] || "/assets/placeholder-food.jpg"}
                      alt="restaurant"
                      className="w-full h-full object-cover rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="h-full">
                    <img
                      src={restaurant.images?.[3] || "/assets/placeholder-food.jpg"}
                      alt="restaurant"
                      className="w-full h-full object-cover rounded-lg shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* INFO RESTAURANT */}
            <div className="mt-10 flex items-center gap-4">
              <img
                src={restaurant.logo || "/assets/placeholder-food.jpg"}
                alt="logo"
                className="w-20 h-20 object-cover rounded-full"
              />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                <p className="text-yellow-500 font-semibold">
                  ⭐ {restaurant.averageRating ?? "No Rating"}
                </p>
                <p className="text-gray-500">{restaurant.place}</p>
              </div>
            </div>

            {/* MENU SECTION */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Menu</h2>

              <div className="flex gap-3 mb-6">
                {["All", "Food", "Drink"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setMenuFilter(type as MenuFilter)}
                    className={`px-4 py-2 rounded-full font-semibold transition
                      ${menuFilter === type ? "bg-red-500 text-white" : "bg-transparent border border-red-500 text-red-500"}
                    `}
                  >
                    {type} Menu
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {filteredMenus.map((menu) => (
                  <MenuCard
                    key={menu.id}
                    menu={menu}
                    quantity={cart.find((item) => item.id === menu.id)?.quantity || 0}
                    onAdd={addToCart}
                    onDecrease={(id) => updateQuantity(id, "decrease")}
                  />
                ))}
              </div>
            </div>

            {/* REVIEWS SECTION */}
            <div className="mt-12 mb-16">
              <h2 className="text-2xl font-bold mb-6">Review</h2>
              {/* ✅ FIXED: Added check for restaurant.reviews existence before mapping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {restaurant.reviews && restaurant.reviews.length > 0 ? (
                  restaurant.reviews.map((review: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                            {review.user?.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">
                              {review.user?.name || "Anonymous"}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {review.createdAt 
                                ? new Date(review.createdAt).toLocaleDateString() 
                                : "Just now"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-yellow-500 text-sm">
                          <span>⭐</span>
                          <span className="ml-1 font-semibold text-gray-700">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {review.comment || "No comment provided."}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-2 text-center py-10">
                    No reviews yet for this restaurant.
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* CART VIEW */}
        {isCartOpen && (
          <div className="mt-4 mb-16 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setIsCartOpen(false)}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition"
              >
                <FaArrowLeft /> Back to Menu
              </button>
              <h2 className="text-3xl font-bold">Your Cart</h2>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg shadow-sm flex flex-col items-center">
                <FaShoppingCart className="text-6xl text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                        <img
                          src={item.image || "/assets/placeholder-food.jpg"}
                          alt={item.foodName}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div>
                          <h3 className="font-bold text-gray-800">{item.foodName}</h3>
                          <p className="text-red-500 font-semibold">
                            ${item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 bg-gray-100 rounded-full px-3 py-2">
                        <button
                          onClick={() => updateQuantity(item.id, "decrease")}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-red-500 hover:bg-red-50"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, "increase")}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-green-500 hover:bg-green-50"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full md:w-1/3">
                  <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24 border border-gray-100">
                    <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                    <div className="flex justify-between mb-2 text-gray-600">
                      <span>Total Items</span>
                      <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between mb-6 text-2xl font-bold text-gray-800 pt-4 border-t">
                      <span>Total</span>
                      <span>${totalPrice.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => alert("Proceeding to checkout...")}
                      className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition shadow-md flex justify-center items-center gap-2"
                    >
                      Checkout Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
