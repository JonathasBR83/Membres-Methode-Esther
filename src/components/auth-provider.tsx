"use client";

import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { Loader2 } from "lucide-react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isAuthPage = pathname === "/login" || pathname === "/signup";
    const isProtectedPage = pathname === "/members";

    if (!user && isProtectedPage) {
      router.push("/login");
    }

    if (user && isAuthPage) {
      router.push("/members");
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isProtectedPage = pathname === "/members";

  // Don't render anything while redirecting
  if (user && isAuthPage) return null;
  if (!user && isProtectedPage) return null;

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
