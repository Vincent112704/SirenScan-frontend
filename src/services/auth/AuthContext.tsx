import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  onAuthStateChanged, 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { AuthResult, SignUpData } from "@/services/auth/authService";

interface AuthContextType {
  user: User | null;         // The Firebase User object (null if logged out)
  loading: boolean;          // True while Firebase is checking for an existing session
  login: (data: SignUpData) => Promise<AuthResult>;
  signUp: (data: SignUpData) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * SESSION TRACKER:
   * Runs once when the app loads. Firebase checks local storage/indexedDB
   * for a valid token and restores the user session automatically.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Session check complete
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  /**
   * Authenticates an existing user
   */
  const login = async ({ email, password }: SignUpData): Promise<AuthResult> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        user: userCredential.user,
        message: "Login successful.",
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.code,
        message: error.message || "Invalid credentials.",
      };
    }
  };

  /**
   * Registers a new user and updates their display name
   */
  const signUp = async ({ email, password, displayName }: SignUpData): Promise<AuthResult> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // If a displayName was provided, update the user profile in Firebase
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }

      return {
        success: true,
        user: userCredential.user,
        message: "Account created successfully.",
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.code,
        message: error.message || "Failed to create account.",
      };
    }
  };

  /**
   * Clears the session and logs the user out
   */
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, logout }}>
      {/* Avoid rendering the app until the initial session check is done 
          to prevent "flickering" (showing Login page for 1s then Dashboard)
      */}
      {!loading ? children : (
        <div className="flex items-center justify-center h-screen bg-[#121212]">
           <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-500"></div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

/**
 * Custom Hook to use the Auth Context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};