// App.tsx
import { Routes, Route, Navigate, Link } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Sparkles, Brain, Target, Clock, ChevronRight } from "lucide-react";
import Callback from "../src/routes/auth/Callback";
import Register from "./components/Register";
import Login from "./components/Login";
import Reports from "./components/Reports";
import Dashboard from "./components/Dashboard";
import Simulado from "./components/Simulado";
import Layout from "./components/Layout";

const Home = () => (
    <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                    Sua aprovação no ENEM
                    <br />
                    começa aqui
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Prepare-se com simulados inteligentes
                </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                    {
                        icon: Brain,
                        title: "Sistema TRI Inteligente",
                        desc: "Análise avançada do seu desempenho",
                    },
                    {
                        icon: Target,
                        title: "Simulados Precisos",
                        desc: "Questões no padrão ENEM 2024",
                    },
                    {
                        icon: Clock,
                        title: "Cronômetro Oficial",
                        desc: "Pratique no tempo real da prova",
                    },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <Card className="p-6 h-full bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                            <div className="flex flex-col h-full">
                                <item.icon className="w-12 h-12 text-violet-600 mb-4" />
                                <h3 className="text-xl font-bold mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 mb-4 flex-grow">
                                    {item.desc}
                                </p>
                                <Button
                                    variant="ghost"
                                    className="group text-violet-600"
                                >
                                    Saiba mais
                                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <Link to="/simulado">
                    <Button
                        size="lg"
                        className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg"
                    >
                        <Clock className="w-6 h-6 mr-2" />
                        Iniciar Simulado Agora
                        <ChevronRight className="w-6 h-6 ml-2" />
                    </Button>
                </Link>
            </motion.div>
        </div>
    </main>
);

const PublicLayout = ({ children }) => (
    <>
        <nav className="fixed w-full z-50 py-6 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2"
                    >
                        <Sparkles className="w-8 h-8 text-violet-600" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 text-transparent bg-clip-text">
                            PrepMaster
                        </span>
                    </motion.div>
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/login">
                        <Button variant="ghost" className="text-violet-600">
                            Entrar
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button className="bg-violet-600 text-white hover:bg-violet-700">
                            Começar
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
        {children}
    </>
);

const App = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <Routes>
                {/* Rotas Públicas */}
                <Route
                    path="/"
                    element={
                        <PublicLayout>
                            <Home />
                        </PublicLayout>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicLayout>
                            <Login />
                        </PublicLayout>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicLayout>
                            <Register />
                        </PublicLayout>
                    }
                />

                {/* Rotas Privadas */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/simulado"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Simulado />
                            </Layout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/reports"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Reports />
                            </Layout>
                        </PrivateRoute>
                    }
                />

                {/* Rota para qualquer URL não encontrada */}
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/auth/github/callback" element={<Callback />} />
                <Route path="/auth/facebook/callback" element={<Callback />} />
                <Route path="/auth/:provider/callback" element={<Callback />} />
            </Routes>
        </div>
    );
};

export default App;
