import NavbarGuest from "./navbarGuest";
import NavbarUser from "./navbarUser";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { user } = useAuth();

  if (!user) return <NavbarGuest />;

  return <NavbarUser user={user} />;
};

export default Navbar;
