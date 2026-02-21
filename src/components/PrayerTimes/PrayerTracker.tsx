"use client";

import { useState, useEffect } from "react";
import { Coordinates, CalculationMethod, PrayerTimes, SunnahTimes } from "adhan";
import { Clock, MapPin, Moon, Sun, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PrayerTracker() {
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [loading, setLoading] = useState(false);
    const [locationRequested, setLocationRequested] = useState(false);

    // Time tracking
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Update local time every second for the countdown
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const requestLocation = () => {
        setLocationRequested(true);
        setLoading(true);
        setError(null);

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoords({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setError(null);
                    setLoading(false);
                },
                (err) => {
                    console.error(err);
                    if (err.code === 1) {
                        setError("Location permission was denied. Please allow location access in your browser settings to see accurate prayer times.");
                    } else {
                        setError("Could not fetch location. Please try again.");
                    }
                    setLoading(false);
                    setLocationRequested(false);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            setLocationRequested(false);
        }
    };

    useEffect(() => {
        if (coords) {
            const date = new Date();
            const coordinates = new Coordinates(coords.lat, coords.lng);
            // Muslim World League is a standard fallback, can be user-configurable later
            const params = CalculationMethod.MuslimWorldLeague();
            const times = new PrayerTimes(coordinates, date, params);
            setPrayerTimes(times);
        }
    }, [coords]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48 animate-pulse text-gold">
                <Moon className="w-8 h-8 animate-spin-slow" />
            </div>
        );
    }

    if (!locationRequested && !coords) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-center flex flex-col items-center justify-center min-h-[300px]"
            >
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full point-events-none" />
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif mb-3 text-foreground">Local Prayer Times</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8 font-light">
                    To provide accurate fasting times for Suhoor and Iftar, Ramadan Companion needs to know your location.
                </p>
                <button
                    onClick={requestLocation}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all hover:-translate-y-1"
                >
                    Enable Location
                </button>
                {error && (
                    <p className="mt-4 text-destructive text-sm bg-destructive/10 px-4 py-2 rounded-lg inline-block">
                        {error}
                    </p>
                )}
            </motion.div>
        );
    }

    if (error) {
        return (
            <div className="p-4 border border-destructive/50 bg-destructive/10 rounded-xl text-destructive flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm font-medium">{error}</p>
            </div>
        );
    }

    if (!prayerTimes) return null;

    const nextPrayer = prayerTimes.nextPrayer();
    const nextPrayerTime = prayerTimes.timeForPrayer(nextPrayer);

    // Fasting calculation logic (Fajr = Start Fast, Maghrib = Break Fast)
    const fajrTime = prayerTimes.fajr;
    const maghribTime = prayerTimes.maghrib;

    let fastingTarget: Date | null = null;
    let fastingLabel = "";

    if (currentTime < fajrTime) {
        fastingTarget = fajrTime;
        fastingLabel = "Time until Suhoor ends (Fajr)";
    } else if (currentTime < maghribTime) {
        fastingTarget = maghribTime;
        fastingLabel = "Time until Iftar (Maghrib)";
    } else {
        // Past Iftar, looking at tomorrow's Fajr
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowTimes = new PrayerTimes(new Coordinates(coords!.lat, coords!.lng), tomorrow, CalculationMethod.MuslimWorldLeague());
        fastingTarget = tomorrowTimes.fajr;
        fastingLabel = "Time until Suhoor ends (Fajr tomorrow)";
    }

    const getTimeRemaining = (target: Date) => {
        const diff = target.getTime() - currentTime.getTime();
        if (diff <= 0) return "00:00:00";

        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
        >
            {/* Decorative gradient orb */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full point-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
                <div>
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-primary mb-1 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Live Tracking
                    </h2>
                    <p className="text-3xl font-serif text-foreground">Fasting Countdown</p>
                </div>

                <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-full flex items-center gap-2 text-primary font-medium shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                    <Clock className="w-4 h-4" />
                    {currentTime.toLocaleTimeString()}
                </div>
            </div>

            <div className="flex flex-col items-center justify-center py-8 mb-8">
                <p className="text-muted-foreground mb-4 text-sm uppercase tracking-widest">{fastingLabel}</p>
                <div className="font-serif text-6xl md:text-8xl tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 drop-shadow-sm tabular-nums">
                    {fastingTarget ? getTimeRemaining(fastingTarget) : "--:--:--"}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/40 backdrop-blur-sm border border-border/40 p-5 rounded-2xl flex items-center gap-4 transition-all hover:bg-background/60">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Sun className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Suhoor Ends</p>
                        <p className="text-xl font-serif">{formatTime(fajrTime)}</p>
                    </div>
                </div>

                <div className="bg-background/40 backdrop-blur-sm border border-border/40 p-5 rounded-2xl flex items-center gap-4 transition-all hover:bg-background/60">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Moon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Iftar Begins</p>
                        <p className="text-xl font-serif">{formatTime(maghribTime)}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
