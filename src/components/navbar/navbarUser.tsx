
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { FaBagShopping } from "react-icons/fa6";

interface NavbarUserProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onCartClick?: () => void; // ✅ NEW: Optional prop to handle cart click
}

export default function NavbarUser({ user, onCartClick }: NavbarUserProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-around p-4 text-white">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <img src="/assets/logo/foody-red.svg" alt="Logo" className="w-10" />
        <span className="font-bold text-lg mix-blend-difference">Foody</span>
      </div>

      {/* USER SECTION */}
      <div className="flex items-center gap-4">
        {/* Icon Cart */}
        <button 
          onClick={onCartClick ? onCartClick : () => navigate("/cart")} 
          className="relative mix-blend-difference"
        >
          <FaBagShopping />
        </button>

        {/* Image Profile */}
        <img
          src="/assets/profile/foto-1.svg"
          alt="Cart"
          className="w-10 h-10"
        />

        {/* Nama User */}
        <span className="font-bold mix-blend-difference">{user.name}</span>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
