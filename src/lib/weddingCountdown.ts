export type Countdown = {
    days: number;
    hours: number;
    minutes: number;
    isDone: boolean;
};

export function getNextWeddingDate(now: Date) {
    const currentYear = now.getFullYear();
    const thisYearWedding = new Date(currentYear, 7, 1, 0, 0, 0, 0);

    if (now <= thisYearWedding) return thisYearWedding;

    return new Date(currentYear + 1, 7, 1, 0, 0, 0, 0);
}

export function getCountdown(targetDateIso: string): Countdown {
    const diff = new Date(targetDateIso).getTime() - Date.now();

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, isDone: true };
    }

    const totalMinutes = Math.floor(diff / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    return { days, hours, minutes, isDone: false };
}

export function getSlovakUnit(value: number, one: string, few: string, many: string) {
    const mod100 = value % 100;
    const mod10 = value % 10;

    if (mod100 >= 11 && mod100 <= 14) return many;
    if (mod10 === 1) return one;
    if (mod10 >= 2 && mod10 <= 4) return few;
    return many;
}

export function formatCountdownSlovak({ days, hours, minutes }: Countdown) {
    return `${days} ${getSlovakUnit(days, "deň", "dni", "dní")} ${hours} ${getSlovakUnit(hours, "hodina", "hodiny", "hodín")} ${minutes} ${getSlovakUnit(minutes, "minúta", "minúty", "minút")}`;
}
