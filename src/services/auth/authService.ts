import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential
} from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';


export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  message: string;
}

export interface SignUpData {
  email: string;
  password: string;
  displayName?: string;
}

// Sign up with email and password
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName?: string
): Promise<AuthResult> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update profile with display name if provided
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    // Send email verification
    await sendEmailVerification(user);

    return {
      success: true,
      user: user,
      message: 'Account created successfully! Please check your email for verification.'
    };
  } catch (error: any) {
    return handleAuthError(error);
  }
};

// Sign in with email and password
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<AuthResult> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return {
      success: true,
      user: userCredential.user,
      message: 'Signed in successfully!'
    };
  } catch (error: any) {
    return handleAuthError(error);
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<AuthResult> => {
  try {
    const provider = new GoogleAuthProvider();
    // Optional: Add custom parameters
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    const userCredential: UserCredential = await signInWithPopup(auth, provider);
    return {
      success: true,
      user: userCredential.user,
      message: 'Signed in with Google successfully!'
    };
  } catch (error: any) {
    return handleAuthError(error);
  }
};

// Sign out
export const logOut = async (): Promise<AuthResult> => {
  try {
    await signOut(auth);
    return {
      success: true,
      message: 'Signed out successfully!'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.code,
      message: 'Error signing out. Please try again.'
    };
  }
};

// Send password reset email
export const resetPassword = async (email: string): Promise<AuthResult> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent! Please check your inbox.'
    };
  } catch (error: any) {
    return handleAuthError(error);
  }
};

// Helper function to handle Firebase auth errors
const handleAuthError = (error: any): AuthResult => {
  let message = 'An error occurred. Please try again.';
  
  switch (error.code) {
    case 'auth/email-already-in-use':
      message = 'This email is already registered. Please sign in instead.';
      break;
    case 'auth/invalid-email':
      message = 'Invalid email address.';
      break;
    case 'auth/operation-not-allowed':
      message = 'This sign-in method is not enabled. Please contact support.';
      break;
    case 'auth/weak-password':
      message = 'Password is too weak. Please use at least 6 characters.';
      break;
    case 'auth/user-disabled':
      message = 'This account has been disabled.';
      break;
    case 'auth/user-not-found':
      message = 'No account found with this email.';
      break;
    case 'auth/wrong-password':
      message = 'Incorrect password.';
      break;
    case 'auth/invalid-credential':
      message = 'Invalid email or password.';
      break;
    case 'auth/too-many-requests':
      message = 'Too many failed attempts. Please try again later.';
      break;
    case 'auth/network-request-failed':
      message = 'Network error. Please check your connection.';
      break;
    case 'auth/popup-closed-by-user':
      message = 'Sign-in popup was closed. Please try again.';
      break;
    case 'auth/cancelled-popup-request':
      message = 'Only one popup request is allowed at a time.';
      break;
    default:
      message = error.message || 'An unexpected error occurred.';
  }

  return {
    success: false,
    error: error.code,
    message: message
  };
};