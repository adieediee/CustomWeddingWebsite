"use client";

import { useEffect, useMemo, useState } from "react";
import { Countdown, getCountdown } from "@/lib/weddingCountdown";

export function useWeddingCountdown(targetDateIso: string) {
    const initialCountdown = useMemo(() => getCountdown(targetDateIso), [targetDateIso]);
    const [countdown, setCountdown] = useState<Countdown>(initialCountdown);

    useEffect(() => {
        const updateCountdown = () => setCountdown(getCountdown(targetDateIso));

        updateCountdown();
        const timer = window.setInterval(updateCountdown, 1000);

        return () => window.clearInterval(timer);
    }, [targetDateIso]);

    return countdown;
}
