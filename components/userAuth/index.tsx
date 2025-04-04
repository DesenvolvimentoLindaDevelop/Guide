"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";

export default function UserAuth() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-3 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="bg-amber-400 hover:bg-amber-500 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
