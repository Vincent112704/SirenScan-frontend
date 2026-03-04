import { useState, useEffect } from 'react';
import { emailService } from '@/services/emailService';
import { getAuth } from 'firebase/auth';
import { sha256 } from '@/lib/crypto';
import { Email } from '@/app/App';

export interface UserProfile {
  email: string;
  Name: string;
}

export function useUserEmails() {
  const [emails, setEmails] = useState<Email[]>([]); // Using your Email interface
  const [userEmail, setUserEmail] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user?.email) {
        setUserEmail({
          email: user.email,
          Name: user.displayName || "User",
        });
        try {
          setLoading(true); // Ensure loading is true while fetching
          const hashed = await sha256(user.email);
          const res = await emailService.fetchUserEmails(hashed);
          setEmails(res);
        } catch (error) {
          console.error("Data fetch failed:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // No user found or logged out
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  
  return { userEmail, emails, loading };
}