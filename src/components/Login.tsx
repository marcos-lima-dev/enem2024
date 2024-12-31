// src/components/Login.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import GoogleIcon from "../assets/GoogleIcon";
import { Github, Facebook, Mail, ArrowRight, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { authConfig } from "../lib/socialAuth";

function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Login = () => {
    const { login, errors, loading } = useAuth();
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

    const handleSocialLogin = (provider: "github" | "google" | "facebook") => {
        const config = {
            github: `https://github.com/login/oauth/authorize?client_id=${authConfig.github.clientId}&redirect_uri=${authConfig.github.redirectUri}`,
            google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${authConfig.google.clientId}&redirect_uri=${authConfig.google.redirectUri}&response_type=code&scope=email profile`,
            facebook: `https://www.facebook.com/v12.0/dialog/oauth?client_id=${authConfig.facebook.appId}&redirect_uri=${authConfig.facebook.redirectUri}`,
        };

        window.location.href = config[provider];
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setFormErrors({ email: "", password: "" });

        if (!email) {
            setFormErrors((prev) => ({
                ...prev,
                email: "Email é obrigatório",
            }));
            return;
        }

        if (!validateEmail(email)) {
            setFormErrors((prev) => ({ ...prev, email: "Email inválido" }));
            return;
        }

        if (!password) {
            setFormErrors((prev) => ({
                ...prev,
                password: "Senha é obrigatória",
            }));
            return;
        }

        if (password.length < 6) {
            setFormErrors((prev) => ({
                ...prev,
                password: "Senha deve ter no mínimo 6 caracteres",
            }));
            return;
        }

        await login(email, password);
    };

    const socialButtons = [
        {
            provider: "github",
            icon: Github,
            text: "Continuar com Github",
            bgColor: "bg-[#023047]",
            hoverColor: "hover:bg-[#24292F]/90",
        },
        {
            provider: "google",
            icon: GoogleIcon,
            text: "Continuar com Google",
            bgColor: "bg-[#DB4437]",
            hoverColor: "hover:bg-[#DB4437]/90",
        },
        {
            provider: "facebook",
            icon: Facebook,
            text: "Continuar com Facebook",
            bgColor: "bg-[#4267B2]",
            hoverColor: "hover:bg-[#4267B2]/90",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <Card className="p-8 bg-white/80 backdrop-blur-sm border-none shadow-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 text-transparent bg-clip-text mb-2">
                            Bem-vindo de volta
                        </h2>
                        <p className="text-gray-600">
                            Continue sua jornada para o sucesso
                        </p>
                    </motion.div>

                    {(errors?.general || formErrors.general) && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-3 rounded bg-red-100 border border-red-300 text-red-600"
                        >
                            {errors?.general || formErrors.general}
                        </motion.div>
                    )}

                    {!showEmailForm ? (
                        <div className="space-y-4 text-white">
                            {socialButtons.map((btn, index) => (
                                <motion.div
                                    key={btn.provider}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Button
                                        className={`w-full ${btn.bgColor} ${btn.hoverColor} group`}
                                        disabled={loading}
                                        onClick={() =>
                                            handleSocialLogin(btn.provider)
                                        }
                                    >
                                        <btn.icon className="mr-2 h-5 w-5" />
                                        <span className="flex-1">
                                            {btn.text}
                                        </span>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </Button>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Button
                                    className="w-full bg-violet-600 hover:bg-violet-700 group"
                                    onClick={() => setShowEmailForm(true)}
                                    disabled={loading}
                                >
                                    <Mail className="mr-2 h-5 w-5" />
                                    <span className="flex-1">
                                        Continuar com Email
                                    </span>
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </Button>
                            </motion.div>
                        </div>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onSubmit={handleEmailLogin}
                            className="space-y-4"
                        >
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className={`w-full px-4 py-3 pl-10 rounded-lg border ${
                                        formErrors.email || errors?.email
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } focus:outline-none focus:border-violet-500`}
                                    disabled={loading}
                                />
                                {(formErrors.email || errors?.email) && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {formErrors.email || errors?.email}
                                    </span>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Senha"
                                    className={`w-full px-4 py-3 pl-10 rounded-lg border ${
                                        formErrors.password || errors?.password
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } focus:outline-none focus:border-violet-500`}
                                    disabled={loading}
                                />
                                {(formErrors.password || errors?.password) && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {formErrors.password ||
                                            errors?.password}
                                    </span>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                        Entrando...
                                    </div>
                                ) : (
                                    "Entrar"
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => {
                                    setShowEmailForm(false);
                                    setFormErrors({ email: "", password: "" });
                                }}
                                className="w-full"
                                disabled={loading}
                            >
                                Voltar
                            </Button>
                        </motion.form>
                    )}

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-center text-sm text-gray-500 mt-6"
                    >
                        Não tem uma conta?{" "}
                        <Link
                            to="/register"
                            className="text-violet-600 hover:underline"
                        >
                            Criar conta
                        </Link>
                    </motion.p>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;
