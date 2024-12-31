import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Home,
    BookOpen,
    BarChart2,
    User,
    LogOut,
    Sparkles,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Layout = ({ children }) => {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { path: "/dashboard", icon: Home, label: "Dashboard" },
        { path: "/simulado", icon: BookOpen, label: "Simulados" },
        { path: "/reports", icon: BarChart2, label: "Relatórios" },
        { path: "/profile", icon: User, label: "Perfil" },
    ];

    return (
        <div className="flex h-screen">
            <nav className="w-64 bg-white border-r fixed h-full">
                <div className="p-4">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 mb-8"
                    >
                        <Sparkles className="w-8 h-8 text-violet-600" />
                        <span className="font-bold text-xl bg-gradient-to-r from-violet-600 to-purple-600 text-transparent bg-clip-text">
                            PrepMaster
                        </span>
                    </Link>

                    <div className="space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    location.pathname === item.path
                                        ? "bg-violet-100 text-violet-700"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-0 w-64 p-4 border-t">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg w-full"
                    >
                        <LogOut size={20} />
                        Sair
                    </button>
                </div>
            </nav>

            <main className="flex-1 overflow-auto bg-gray-50 ml-64 p-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
