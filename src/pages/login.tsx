import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { useAuth } from "../context/authContext";
import { setToken } from "../lib/auth";
import { Input } from "@/components/ui/input";
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function Login() {
  const { setUser } = useAuth();
  const login = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password: string) => password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid Email");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (!isValidPassword(password)) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (hasError) return;

    try {
      const data = await login.mutateAsync({ email, password });

      // simpan token
      setToken(data.data.token);

      // simpan user ke context + localStorage
      setUser(data.data.user);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      // redirect ke home
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="./assets/image/image-1.svg"
          alt="Login Illustration"
          className="w-screen h-screen object-cover"
        />
      </div>

      {/* Right */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-8 h-screen">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <div className="flex gap-4 items-center">
            <img
              src="./assets/logo/foody-red.svg"
              alt="Logo"
              className="w-10"
            />
            <h1 className="font-extrabold text-3xl">Foody</h1>
          </div>

          <div>
            <h1 className="text-3xl font-extrabold">Welcome Back</h1>
            <p>Good to see you again! Let’s eat</p>
          </div>

          <Tabs defaultValue="signin">
            <TabsList className="flex gap-2 w-full mb-4">
              <TabsTrigger value="signin" className="flex-1 rounded-full">
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="flex-1 rounded-full"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <MdOutlineVisibilityOff size={20} />
              ) : (
                <MdOutlineRemoveRedEye size={20} />
              )}
            </button>
          </div>
          {passwordError && <p className="text-red-500">{passwordError}</p>}

          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox />
              <FieldLabel>Remember Me</FieldLabel>
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            className="rounded-full bg-red-600 text-white w-full h-12"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
