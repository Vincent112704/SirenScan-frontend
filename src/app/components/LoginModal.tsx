import { Mail, Lock, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import {
  signUpWithEmail,
  signInWithGoogle,
  signInWithEmail,
} from "@/services/auth/authService";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDashboard: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onNavigateToDashboard,
}: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would validate credentials
    //handle submit for login
    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          alert("Password does not match");
          return;
        }
        const result = await signUpWithEmail(formData.email, formData.password);

        console.log(result);
        if (result.success) {
          onNavigateToDashboard();
        } else {
          alert(result.message);
        }
      } else {
        // if sign in
        const result = await signInWithEmail(formData.email, formData.password);

        if (result.success) {
          onNavigateToDashboard();
        } else {
          alert(result.message);
        }
      }
    } catch (error) {
      console.log(`There is an error: ${error}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        onNavigateToDashboard();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="w-full max-w-md pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#1a1a1c] rounded-2xl p-8 border border-white/10 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-8">
              <h2 className="text-white text-3xl font-bold mb-2">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-white/60">
                {isSignUp
                  ? "Sign up to start protecting your inbox"
                  : "Sign in to access your dashboard"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-[#232323] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#ff4d2e] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="text-white/80 text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full bg-[#232323] border border-white/10 rounded-lg pl-12 pr-12 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#ff4d2e] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              {isSignUp && (
                <div>
                  <label className="text-white/80 text-sm font-medium mb-2 block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full bg-[#232323] border border-white/10 rounded-lg pl-12 pr-12 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#ff4d2e] transition-colors"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              {!isSignUp && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-white/60 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-white/10 bg-[#232323] text-[#ff4d2e] focus:ring-[#ff4d2e] focus:ring-offset-0"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-[#ff4d2e] hover:text-[#ff4d2e]/80 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="
                  w-full
                  py-3
                  bg-linear-to-r from-[#ff4d2e] to-[#ff3d1e]
                  text-white
                  rounded-lg
                  font-medium
                  transition-all
                  hover:from-[#ff5d3e] hover:to-[#ff2d0e]
                "
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-[#1a1a1c] px-4 text-white/40">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="col-span-2 mx-auto flex items-center justify-center gap-2 bg-[#232323] hover:bg-[#2a2a2a] border border-white/10 text-white py-3 px-6 rounded-lg transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </button>
              </div>

              {/* Toggle Sign Up / Sign In */}
              <div className="text-center mt-6">
                <p className="text-white/60 text-sm">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-[#ff4d2e] hover:text-[#ff4d2e]/80 font-medium transition-colors"
                  >
                    {isSignUp ? "Sign in" : "Sign up"}
                  </button>
                </p>
              </div>
            </form>

            <p className="text-white/40 text-xs text-center mt-6">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
