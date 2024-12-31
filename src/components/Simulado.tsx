import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Clock, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

const Simulado = () => {
    const [timeLeft, setTimeLeft] = useState(19800); // 5h30min em segundos
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 w-full bg-white/80 backdrop-blur-lg shadow-sm z-50"
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" className="text-violet-600">
                                <ChevronLeft className="w-5 h-5 mr-1" />
                                Sair
                            </Button>
                            <div className="text-sm text-gray-500">
                                Questão {currentQuestion + 1} de 90
                            </div>
                        </div>
                        <div
                            className={`flex items-center gap-2 ${
                                timeLeft < 1800
                                    ? "text-red-500"
                                    : "text-violet-600"
                            }`}
                        >
                            <Clock className="w-5 h-5" />
                            <span className="font-mono text-lg font-bold">
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-200 mt-4">
                        <motion.div
                            className="h-full bg-violet-600 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{
                                width: `${(currentQuestion / 90) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            </motion.div>

            <main className="pt-28 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-xl">
                        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold mb-4">Texto Base</h3>
                            <p className="text-gray-700">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                            </p>
                        </div>

                        <div className="mb-6">
                            <p className="text-lg font-medium mb-6">
                                Com base no texto, análise:
                            </p>
                            {[
                                "A) Primeira alternativa",
                                "B) Segunda alternativa",
                                "C) Terceira alternativa",
                                "D) Quarta alternativa",
                                "E) Quinta alternativa",
                            ].map((option, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start py-6 px-4 text-left hover:bg-violet-50 hover:text-violet-700 group mb-2"
                                    >
                                        {option}
                                    </Button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center mt-8 pt-6 border-t">
                            <Button variant="outline" className="gap-2">
                                <ChevronLeft className="w-4 h-4" />
                                Anterior
                            </Button>
                            <Button className="bg-violet-600 hover:bg-violet-700 gap-2">
                                Próxima
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default Simulado;
