import React from "react";
import { useForm } from "react-hook-form";
import { login as apiLogin } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [serverError, setServerError] = React.useState("");

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const res = await apiLogin(data);
      localStorage.setItem("token", res.token);
      navigate("/profile");
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      setServerError(msg);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start pt-24 pb-16"
      style={{
        background: "linear-gradient(180deg, #F6EEF7 0%, #FEFCFA 100%)",
      }}>

      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-10 bg-white/50 backdrop-blur-sm rounded-3xl px-10 py-12 shadow-sm">

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">Welcome Back to Cerope</h1>
          <p className="text-gray-500 mb-8">Your personalized fashion journey awaits.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">

            <div className="mb-5">
              <input
                {...register("email", { required: "Invalid Email ID !" })}
                placeholder="Email"
                className="w-full px-5 py-4 rounded-xl text-sm border border-gray-300 bg-white/60 shadow-inner outline-none focus:ring-2 focus:ring-black/40"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-3">
              <input
                {...register("password", { required: "Password required" })}
                placeholder="Password"
                type="password"
                className="w-full px-5 py-4 rounded-xl text-sm border border-gray-300 bg-white/60 shadow-inner outline-none focus:ring-2 focus:ring-black/40"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {serverError && (
              <p className="text-red-500 text-sm mb-3">{serverError}</p>
            )}

            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="w-4 h-4" />
                Remember me
              </label>

              <Link className="text-sm text-blue-600" to="/forgot">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full text-white text-lg font-medium bg-black shadow-md hover:opacity-90 transition"
            >
              Sign In
            </button>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="flex justify-center mb-6">
              <button
                type="button"
                className="w-56 py-2 border border-gray-300 bg-white rounded-xl flex items-center justify-center gap-2 text-sm shadow-sm"
              >
                <span className="text-lg font-bold">G</span> Google
              </button>
            </div>

            <p className="text-center text-sm text-gray-700">
              Don't have an account?{" "}
              <Link className="text-blue-600" to="/signup">
                Sign up
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:block md:w-1/2">
          <img
            src="/avatars/login2.png"
            className="w-[400px] h-[400px] rounded-3xl shadow-xl object-cover"
            alt="login img"
          />
        </div>
      </div>
    </div>
  );
}
