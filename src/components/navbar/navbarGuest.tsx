import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NavbarGuest = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-around items-center px-10 py-6 text-white">
      {/* Logo */}
      <div className="flex gap-4 items-center">
        <img
          src="./assets/logo/foody-white.svg"
          alt="Logo Foody"
          className="w-10"
        />
        <h1 className="font-extrabold text-3xl">Foody</h1>
      </div>

      <div className="flex gap-4">
        <Button
          className="font-bold border border-white bg-transparent
      w-32 h-10 text-sm 
      sm:w-40 sm:h-12 sm:text-base
      rounded-full 
      hover:bg-white hover:text-black"
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
        <Button
          className="font-bold border border-white bg-transparent
      w-32 h-10 text-sm 
      sm:w-40 sm:h-12 sm:text-base
      rounded-full 
      hover:bg-white hover:text-black"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default NavbarGuest;