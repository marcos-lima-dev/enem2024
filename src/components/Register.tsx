// src/components/Register.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Link } from "react-router-dom";
import { Mail, User, Lock, Eye, EyeOff } from "lucide-react";

function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};

        if (!formData.name || formData.name.length < 3) {
            errors.name = "Nome deve ter no mínimo 3 caracteres";
        }

        if (!formData.email) {
            errors.email = "Email é obrigatório";
        } else if (!validateEmail(formData.email)) {
            errors.email = "Email inválido";
        }

        if (!formData.password) {
            errors.password = "Senha é obrigatória";
        } else if (formData.password.length < 6) {
            errors.password = "Senha deve ter no mínimo 6 caracteres";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            // submit form
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
            <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-violet-600 mb-2">
                        Crie sua conta
                    </h2>
                    <p className="text-gray-600">
                        Comece sua jornada de preparação
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Nome completo"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className={`w-full px-4 py-3 pl-10 rounded-lg border ${
                                formErrors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } focus:outline-none focus:border-violet-500`}
                        />
                        {formErrors.name && (
                            <span className="text-red-500 text-sm mt-1">
                                {formErrors.name}
                            </span>
                        )}
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className={`w-full px-4 py-3 pl-10 rounded-lg border ${
                                formErrors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } focus:outline-none focus:border-violet-500`}
                        />
                        {formErrors.email && (
                            <span className="text-red-500 text-sm mt-1">
                                {formErrors.email}
                            </span>
                        )}
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className={`w-full px-4 py-3 pl-10 pr-10 rounded-lg border ${
                                formErrors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } focus:outline-none focus:border-violet-500`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-gray-400 hover:text-violet-600"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                        {formErrors.password && (
                            <span className="text-red-500 text-sm mt-1">
                                {formErrors.password}
                            </span>
                        )}
                    </div>

                    <Button type="submit" className="w-full bg-violet-600">
                        Criar conta
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Já tem uma conta?{" "}
                    <Link
                        to="/login"
                        className="text-violet-600 hover:underline"
                    >
                        Entrar
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default Register;
