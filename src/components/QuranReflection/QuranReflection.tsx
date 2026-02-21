"use client";

import { useState } from "react";
import { BookOpen, Sparkles, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function QuranReflection() {
    const [prompt, setPrompt] = useState("");
    const [reflection, setReflection] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/reflect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate reflection");
            }

            setReflection(data.reflection);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden h-full flex flex-col">
            {/* Decorative gradient orb */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-[60px] rounded-full point-events-none" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-xl font-serif text-foreground">AI Quran Reflection</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Spiritual Guide</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar relative z-10 min-h-[150px]">
                <AnimatePresence mode="wait">
                    {!reflection && !isLoading && !error ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col items-center justify-center text-center p-6"
                        >
                            <Sparkles className="w-8 h-8 text-primary/40 mb-3" />
                            <p className="text-muted-foreground font-light text-sm">
                                Share a verse, a feeling, or a struggle you're facing today. The Companion will offer context, reflection, and a personalized Dua.
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
                                <span className="text-xs text-primary uppercase tracking-widest animate-pulse font-medium">Reflecting...</span>
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

                    {reflection && !isLoading ? (
                        <motion.div
                            key="reflection"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="prose prose-sm md:prose-base prose-invert prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-primary max-w-none text-foreground"
                        >
                            <ReactMarkdown>{reflection}</ReactMarkdown>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 mt-auto">
                <div className="relative flex items-center">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. I am feeling anxious about my fasting today. Can you share a verse?"
                        className="w-full bg-background/50 border border-border/50 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none h-[52px] min-h-[52px] max-h-[120px]"
                        rows={1}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!prompt.trim() || isLoading}
                        className="absolute right-2 p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </form>
        </div>
    );
}
