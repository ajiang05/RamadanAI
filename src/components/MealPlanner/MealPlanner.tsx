"use client";

import { useState } from "react";
import { Utensils, Sparkles, ChefHat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function MealPlanner() {
    const [preferences, setPreferences] = useState("");
    const [region, setRegion] = useState("");
    const [goal, setGoal] = useState("");
    const [plan, setPlan] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!preferences.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/meal-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dietaryPreferences: preferences, region, goal }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate meal plan");
            }

            setPlan(data.plan);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full point-events-none" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Utensils className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-xl font-serif text-foreground">Smart Meal Planner</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Nutrition Assistant</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar relative z-10 min-h-[150px]">
                <AnimatePresence mode="wait">
                    {!plan && !isLoading && !error ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col items-center justify-center text-center p-6"
                        >
                            <ChefHat className="w-8 h-8 text-primary/40 mb-3" />
                            <p className="text-muted-foreground font-light text-sm max-w-[250px]">
                                Enter your dietary restrictions and region to get a customized, high-energy Suhoor and restorative Iftar plan.
                            </p>
                        </motion.div>
                    ) : null}

                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex items-center justify-center"
                        >
                            <div className="flex flex-col items-center gap-3">
                                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                                <span className="text-xs text-primary uppercase tracking-widest animate-pulse font-medium">Crafting Menu...</span>
                            </div>
                        </motion.div>
                    ) : null}

                    {error ? (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-destructive text-sm bg-destructive/10 p-4 rounded-xl"
                        >
                            {error}
                        </motion.div>
                    ) : null}

                    {plan && !isLoading ? (
                        <motion.div
                            key="plan"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="prose prose-sm md:prose-base prose-invert prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-primary max-w-none text-foreground pb-4"
                        >
                            <ReactMarkdown>{plan}</ReactMarkdown>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 mt-auto space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        placeholder="Region (e.g. London)"
                        className="w-full bg-background/50 border border-border/50 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                    />
                    <input
                        type="text"
                        value={preferences}
                        onChange={(e) => setPreferences(e.target.value)}
                        placeholder="Diet (e.g. Halal)"
                        className="w-full bg-background/50 border border-border/50 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                        required
                    />
                    <select
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full bg-background/50 border border-border/50 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[position:right_1rem_center] bg-no-repeat"
                    >
                        <option value="">Goal (Optional)</option>
                        <option value="Building Muscle">Building Muscle</option>
                        <option value="Losing Weight">Losing Weight</option>
                        <option value="Gaining Weight">Gaining Weight</option>
                        <option value="Maintaining Health">Maintaining Health</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={!preferences.trim() || isLoading}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50 disabled:hover:shadow-none"
                >
                    Generate Plan
                </button>
            </form>
        </div>
    );
}
