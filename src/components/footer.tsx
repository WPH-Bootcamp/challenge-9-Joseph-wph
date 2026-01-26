import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { TiSocialLinkedin } from "react-icons/ti";
import { IoLogoTiktok } from "react-icons/io5";

const footer = () => {
  return (
    <div className="w-full bg-black text-white p-5">
      <div className="mx-auto max-w-7xl px-4 md:px-10 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* LEFT */}
          <div className="w-full md:w-95 flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex gap-4 items-center">
                <img
                  src="./assets/logo/foody-red.svg"
                  alt="Logo"
                  className="w-10"
                />
                <h1 className="font-extrabold text-3xl">Foody</h1>
              </div>
              <p className="text-base leading-7">
                Enjoy homemade flavors & chef’s signature dishes, freshly
                prepared every day. Order online or visit our nearest branch.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <p className="font-bold text-base">Follow on Social Media</p>
              <div className="flex gap-5 ml-1">
                <FaFacebookF />
                <FaInstagram />
                <TiSocialLinkedin />
                <IoLogoTiktok />
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-row md:flex-row gap-16">
            {/* MIDDLE */}
            <div className="w-full md:w-50 flex flex-col items-start gap-5">
              <button className="hover:font-bold">Explore</button>
              <button className="hover:font-bold">All Food</button>
              <button className="hover:font-bold">Nearby</button>
              <button className="hover:font-bold">Discount</button>
              <button className="hover:font-bold">Best Seller</button>
              <button className="hover:font-bold">Delivery</button>
              <button className="hover:font-bold">Lunch</button>
            </div>

            {/* RIGHT */}
            <div className="w-full md:w-50 flex flex-col items-start gap-5">
              <button className="hover:font-bold">Help</button>
              <button className="hover:font-bold">How to Order</button>
              <button className="hover:font-bold">Payment Methods</button>
              <button className="hover:font-bold">Track My Order</button>
              <button className="hover:font-bold">FAQ</button>
              <button className="hover:font-bold">Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default footer;