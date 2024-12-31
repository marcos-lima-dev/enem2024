import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { BarChart, Clock, Target, Trophy, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-white/80 p-6">
                        <h3 className="font-bold text-lg mb-2">
                            Próximo Simulado
                        </h3>
                        <Clock className="w-8 h-8 text-violet-600 mb-2" />
                        <p className="text-3xl font-bold">03/11</p>
                        <p className="text-gray-600">Linguagens e Códigos</p>
                    </Card>

                    <Card className="bg-white/80 p-6">
                        <h3 className="font-bold text-lg mb-2">Média TRI</h3>
                        <Trophy className="w-8 h-8 text-violet-600 mb-2" />
                        <p className="text-3xl font-bold">720</p>
                        <p className="text-green-600">+15 pontos</p>
                    </Card>

                    <Card className="bg-white/80 p-6">
                        <h3 className="font-bold text-lg mb-2">Questões</h3>
                        <Target className="w-8 h-8 text-violet-600 mb-2" />
                        <p className="text-3xl font-bold">450</p>
                        <p className="text-gray-600">Respondidas</p>
                    </Card>

                    <Card className="bg-white/80 p-6">
                        <h3 className="font-bold text-lg mb-2">Desempenho</h3>
                        <BarChart className="w-8 h-8 text-violet-600 mb-2" />
                        <p className="text-3xl font-bold">75%</p>
                        <p className="text-gray-600">Taxa de acerto</p>
                    </Card>
                </div>

                <div className="mt-8">
                    <Link to="/simulado">
                        <Button
                            size="lg"
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                        >
                            Iniciar Novo Simulado
                            <ChevronRight className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
