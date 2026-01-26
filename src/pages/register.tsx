import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useAuth";
import { Input } from "@/components/ui/input";
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Register() {
  const navigate = useNavigate();
  const register = useRegister();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    // Reset errors
    setErrors({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    const newErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!isValidEmail(email)) newErrors.email = "Invalid Email";
    if (!phone) newErrors.phone = "Phone Number is required";
    else if (!/^\d{10,}$/.test(phone))
      newErrors.phone = "Phone Number at least 10 digit";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password at least 6 character";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    else if (confirmPassword !== password)
      newErrors.confirmPassword = "Password does not match";

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    setLoading(true);

    try {
      // ✅ FIXED: Now using the input values directly instead of generating unique ones
      await register.mutateAsync({
        name,
        email: email,
        phone: phone,
        password,
      });

      alert("Registered successfully!");
      navigate("/login");
    } catch (err: any) {
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="./assets/image/image-1.svg"
          alt="Register Illustration"
          className="w-screen h-screen object-cover"
        />
      </div>

      {/* Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-8 h-screen">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          className="w-full max-w-sm space-y-4"
        >
          {/* Logo */}
          <div className="flex gap-4 items-center">
            <img
              src="./assets/logo/foody-red.svg"
              alt="Logo Foody"
              className="w-10"
            />
            <h1 className="font-extrabold text-3xl">Foody</h1>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-3xl font-extrabold">Welcome Back</h1>
            <p>Good to see you again! Let’s eat</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="signup">
            <TabsList className="flex gap-2 w-full mb-4">
              <TabsTrigger
                value="signin"
                onClick={() => navigate("/login")}
                className="flex-1 rounded-full"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex-1 rounded-full">
                Sign Up
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Name */}
          <div>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors({ ...errors, name: "" });
              }}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors({ ...errors, phone: "" });
              }}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <MdOutlineVisibilityOff />
              ) : (
                <MdOutlineRemoveRedEye />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors({ ...errors, confirmPassword: "" });
              }}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <MdOutlineVisibilityOff />
              ) : (
                <MdOutlineRemoveRedEye />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-300 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
