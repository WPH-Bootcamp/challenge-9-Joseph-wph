import { setSearch } from "../features/filters/filterSlice";
import { useRestaurants } from "../hooks/useRestaurant";
import { useAppSelector, useAppDispatch } from "../lib/redux";
import { IoSearch } from "react-icons/io5";

export default function Hero() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.filters.search);
  const { isLoading } = useRestaurants(search);

  return (
    <div className="relative z-10 p-6 space-y-4 flex flex-col justify-center items-center mt-44">
      <h1 className="text-5xl font-extrabold text-white text-center">
        Explore Culinary Experiences
      </h1>
      <p className="text-white/80 text-2xl text-center">
        Search and refine your choice to discover the perfect restaurant.
      </p>

      <div className="relative w-full max-w-150 mt-5 mx-auto">
        {/* Search Icon */}
        <IoSearch
          className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        {/* Input */}
        <input
          placeholder="Search restaurants, food and drink"
          className="
      w-full
      h-12 md:h-14
      bg-white
      rounded-full
      pl-10 md:pl-12
      pr-4
      text-sm md:text-base
      focus:outline-none"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </div>

      {isLoading && <p className="text-white">Loading...</p>}
    </div>
  );
}