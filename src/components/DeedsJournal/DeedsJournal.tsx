"use client";

import { useState, useEffect } from "react";
import { Check, Star, Heart, Book, Users, Coffee } from "lucide-react";
import { motion } from "framer-motion";

interface Deed {
    id: string;
    category: "prayer" | "quran" | "charity" | "kindness" | "fasting";
    text: string;
    completed: boolean;
}

const INITIAL_DEEDS: Deed[] = [
    { id: "1", category: "fasting", text: "Fast broken with dates and water", completed: false },
    { id: "2", category: "prayer", text: "Prayed all 5 obligatory prayers", completed: false },
    { id: "3", category: "prayer", text: "Prayed Taraweeh", completed: false },
    { id: "4", category: "quran", text: "Read 5 pages of the Quran", completed: false },
    { id: "5", category: "charity", text: "Gave Sadaqah (Charity)", completed: false },
    { id: "6", category: "kindness", text: "Helped someone or forgave a grudge", completed: false },
];

export default function DeedsJournal() {
    const [deeds, setDeeds] = useState<Deed[]>(INITIAL_DEEDS);
    const [mounted, setMounted] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("ramadan_deeds");
        if (saved) {
            try {
                setDeeds(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse deeds from local storage", e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (mounted) {
            localStorage.setItem("ramadan_deeds", JSON.stringify(deeds));
        }
    }, [deeds, mounted]);

    const toggleDeed = (id: string) => {
        setDeeds((prev) =>
            prev.map((deed) =>
                deed.id === id ? { ...deed, completed: !deed.completed } : deed
            )
        );
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "prayer":
                return <Star className="w-4 h-4" />;
            case "quran":
                return <Book className="w-4 h-4" />;
            case "charity":
                return <Coffee className="w-4 h-4" />;
            case "kindness":
                return <Heart className="w-4 h-4" />;
            case "fasting":
                return <Check className="w-4 h-4" />;
            default:
                return <Star className="w-4 h-4" />;
        }
    };

    const completedCount = deeds.filter((d) => d.completed).length;
    const progressPercentage = (completedCount / deeds.length) * 100;

    // Render nothing until mounted to avoid hydration mismatch with localStorage
    if (!mounted) return null;

    return (
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
                {/* Left Side: The Checklist */}
                <div className="flex-1 w-full">
                    <div className="mb-8">
                        <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-2">Daily Deeds Journal</h3>
                        <p className="text-muted-foreground font-light text-sm">
                            "The most beloved of deeds to Allah are those that are most consistent, even if they are small."
                        </p>
                    </div>

                    <div className="space-y-3">
                        {deeds.map((deed) => (
                            <button
                                key={deed.id}
                                onClick={() => toggleDeed(deed.id)}
                                className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${deed.completed
                                        ? "bg-primary/20 border-primary/40 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                                        : "bg-background/40 hover:bg-background/60 border-border/40 hover:border-border/60"
                                    }`}
                            >
                                <div
                                    className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center transition-colors ${deed.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    <Check className={`w-3.5 h-3.5 transition-opacity ${deed.completed ? "opacity-100" : "opacity-0"}`} />
                                </div>
                                <div>
                                    <p className={`font-medium transition-colors ${deed.completed ? "text-primary" : "text-foreground"}`}>
                                        {deed.text}
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-1 opacity-60">
                                        <span className="text-primary">{getCategoryIcon(deed.category)}</span>
                                        <span className="text-[10px] uppercase tracking-wider font-semibold">
                                            {deed.category}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side: The Mascot / Fanoos */}
                <div className="flex-shrink-0 w-full md:w-[300px] lg:w-[400px] flex flex-col items-center justify-center relative p-8">

                    {/* Dynamic Glow Behind Lantern */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] md:blur-[80px]"
                        animate={{
                            width: `${Math.max(100, progressPercentage * 4)}px`,
                            height: `${Math.max(100, progressPercentage * 4)}px`,
                            backgroundColor: `rgba(212, 175, 55, ${Math.max(0.05, progressPercentage / 100 * 0.4)})`,
                        }}
                        transition={{ type: "spring", bounce: 0.4, duration: 1.5 }}
                    />

                    {/* SVG Fanoos (Lantern) */}
                    <div className="relative z-10 w-48 h-64 md:w-64 md:h-80 drop-shadow-2xl flex items-center justify-center">
                        {/* Hanging Chain */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-transparent to-primary/80 z-0" />

                        <svg viewBox="0 0 100 150" className="w-full h-full overflow-visible z-10">
                            {/* Lantern Top Ring */}
                            <circle cx="50" cy="15" r="4" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" />
                            <path d="M 46 15 L 54 15" stroke="var(--color-primary)" strokeWidth="1.5" />

                            {/* Lantern Dome */}
                            <path d="M 35 35 Q 50 15 65 35" fill="var(--color-primary)" opacity="0.9" />
                            <path d="M 30 40 L 70 40 L 65 35 L 35 35 Z" fill="var(--color-primary)" />

                            {/* Lantern Body Background / Glass */}
                            <motion.path
                                d="M 35 40 L 65 40 L 75 110 L 25 110 Z"
                                fill="var(--color-primary)"
                                animate={{
                                    fillOpacity: Math.max(0.1, (progressPercentage / 100) * 0.6)
                                }}
                                transition={{ duration: 1 }}
                            />
                            <path d="M 35 40 L 65 40 L 75 110 L 25 110 Z" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" />

                            {/* Lantern Body Inner Grid (Geometrics) */}
                            <path d="M 40 40 L 32 110 M 60 40 L 68 110 M 50 40 L 50 110" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.5" />
                            <path d="M 32 60 L 68 60 M 29 80 L 71 80 M 26 100 L 74 100" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.5" />

                            {/* Base */}
                            <path d="M 25 110 L 75 110 L 65 120 L 35 120 Z" fill="var(--color-primary)" />
                            <path d="M 35 120 L 65 120 L 65 125 L 35 125 Z" fill="var(--color-primary)" opacity="0.8" />

                            {/* The Inner Light/Flame */}
                            <motion.circle
                                cx="50"
                                cy="80"
                                r="6"
                                fill="var(--color-primary)"
                                style={{ filter: "drop-shadow(0 0 10px var(--color-primary))" }}
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: Math.max(0.2, progressPercentage / 100),
                                }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>

                    <div className="relative z-10 text-center mt-6">
                        <h4 className="text-xl font-serif text-primary mb-1">
                            {progressPercentage === 100 ? "Masha'Allah!" : "Your Fanoos"}
                        </h4>
                        <p className="text-sm font-medium text-muted-foreground bg-background/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/50">
                            {completedCount} / {deeds.length} Deeds Completed
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
