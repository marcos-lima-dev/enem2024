import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
    BarChart,
    LineChart,
    PieChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const Reports = () => {
    const performanceData = [
        { name: "Jan", score: 650 },
        { name: "Fev", score: 680 },
        { name: "Mar", score: 720 },
        { name: "Abr", score: 750 },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
            <div className="max-w-7xl mx-auto">
                <Card className="bg-white/90 p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Evolução TRI</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[500, 1000]} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#8b5cf6"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-white/90 p-6">
                        <h3 className="text-xl font-bold mb-4">
                            Áreas de Conhecimento
                        </h3>
                        <div className="space-y-4">
                            {[
                                "Linguagens",
                                "Matemática",
                                "Ciências Humanas",
                                "Ciências da Natureza",
                            ].map((area) => (
                                <div
                                    key={area}
                                    className="flex justify-between items-center"
                                >
                                    <span>{area}</span>
                                    <div className="w-48 bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-violet-600 h-2.5 rounded-full"
                                            style={{
                                                width:
                                                    Math.random() * 100 + "%",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="bg-white/90 p-6">
                        <h3 className="text-xl font-bold mb-4">
                            Últimos Simulados
                        </h3>
                        <div className="space-y-4">
                            {["Simulado 1", "Simulado 2", "Simulado 3"].map(
                                (sim, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                                    >
                                        <span>{sim}</span>
                                        <span className="font-bold text-violet-600">
                                            {600 +
                                                Math.floor(Math.random() * 300)}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Reports;
