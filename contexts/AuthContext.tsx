"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

type User = { uid: string; email: string | null };

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? { uid: user.uid, email: user.email } : null);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/home");
  };

  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};
