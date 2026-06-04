"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";
import { Dumbbell } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const password = user.password;
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password,
      name: user.name,
      image: user.image,
    });

    if (data) {
      toast.success("Account created successfully!");
      router.push("/");
    }

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({ provider: "google" });
    toast.success("Logged in with Google!");
    router.push("/");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-green-600 p-2 rounded-xl">
              <Dumbbell className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-2xl text-gray-900">SportNest</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Create your account
          </h1>
          <p className="text-gray-500 text-sm">
            Join SportNest and start booking sports facilities today
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="John Doe"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Profile Photo URL
              </label>
              <input
                name="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="Enter your password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Min 6 characters with at least 1 uppercase and 1 lowercase
                letter
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 border-t border-gray-100" />
            <span className="text-xs text-gray-400 font-medium">
              OR CONTINUE WITH
            </span>
            <div className="flex-1 border-t border-gray-100" />
          </div>

          <button
            onClick={handleGoogleSignin}
            className="w-full border border-gray-200 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <FcGoogle />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
