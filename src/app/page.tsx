import PrayerTracker from "@/components/PrayerTimes/PrayerTracker";
import QuranReflection from "@/components/QuranReflection/QuranReflection";
import DeedsJournal from "@/components/DeedsJournal/DeedsJournal";
import MealPlanner from "@/components/MealPlanner/MealPlanner";
import { Moon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/30 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative z-10 container mx-auto px-4 md:px-8 pt-12 pb-24 flex flex-col">

        {/* Header Section */}
        <header className="flex flex-col items-center justify-center text-center py-12 md:py-20 mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6 border border-primary/20">
            <Moon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-4 tracking-[-0.02em]">
            Ramadan <span className="text-primary italic">Companion</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-2xl mx-auto font-light">
            Your personal guide for the Holy Month. Track fasting, reflect on the Quran, and plan your meals.
          </p>
        </header>

        {/* Core Features Grid */}
        <div className="w-full max-w-5xl mx-auto space-y-8">

          {/* Feature 1: Fasting Countdown (Full Width) */}
          <div className="w-full">
            <PrayerTracker />
          </div>

          {/* Feature 2 & 4: Reflection & Meal Planner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="h-[400px]">
              <QuranReflection />
            </div>
            <div className="h-[400px]">
              <MealPlanner />
            </div>
          </div>

          {/* Feature 3: Deeds Journal (Full Width) */}
          <div className="w-full mt-12">
            <DeedsJournal />
          </div>
        </div>

      </main>
    </div>
  );
}
