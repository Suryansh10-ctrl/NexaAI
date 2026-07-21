import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleChange = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await handleRegister(
        registerData.name,
        registerData.email,
        registerData.password
      );

      navigate("/login");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#1B1817] flex items-center justify-center px-5">
      <div className="w-full max-w-md rounded-2xl border border-[#2F2A29] bg-[#1B1817] px-8 py-10">

        {/* Heading */}

        <div className="text-center mb-8">
          <p className="text-sm text-[#00ACEA] font-medium">
            Join Us Today
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-[#ECE9E4]">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-[#8D8782]">
            Register to unlock all features.
          </p>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}

          <div>
            <label className="block text-sm text-[#B8B2AC] mb-2">
              Username
            </label>

            <input
              type="text"
              name="name"
              placeholder="Choose a username"
              value={registerData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#3A3533] bg-[#201D1C] px-4 py-3 text-sm text-[#ECE9E4] placeholder:text-[#75706C] outline-none transition focus:border-[#00ACEA]"
            />
          </div>

          {/* Email */}

          <div>
            <label className="block text-sm text-[#B8B2AC] mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={registerData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#3A3533] bg-[#201D1C] px-4 py-3 text-sm text-[#ECE9E4] placeholder:text-[#75706C] outline-none transition focus:border-[#00ACEA]"
            />
          </div>

          {/* Password */}

          <div>
            <label className="block text-sm text-[#B8B2AC] mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={registerData.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#3A3533] bg-[#201D1C] px-4 py-3 pr-12 text-sm text-[#ECE9E4] placeholder:text-[#75706C] outline-none transition focus:border-[#00ACEA]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D8782] hover:text-white transition"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>
          </div>

          {/* Register Button */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#00ACEA] py-3 text-sm font-medium text-white transition hover:bg-[#0095CC] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>

        </form>

        {/* Footer */}

        <p className="mt-8 text-center text-sm text-[#8D8782]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#00ACEA] hover:text-[#33BDF0] transition"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;