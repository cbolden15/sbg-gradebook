export const SCORE_COLORS: Record<number | 'null', string> = {
	1: 'score-1',
	2: 'score-2',
	3: 'score-3',
	4: 'score-4',
	null: 'score-null'
};

export const SCORE_LABELS: Record<number, string> = {
	1: '1 — Beginning',
	2: '2 — Developing',
	3: '3 — Proficient',
	4: '4 — Advanced'
};

export type MasteryConfig = {
	method: 'highest';
	thresholds: { '4': number; '3': number; '2': number; '1': number };
};

export function translateToGrade(
	scores: (number | null)[],
	config: MasteryConfig
): { percentage: number; letter: string } {
	const validScores = scores.filter((s): s is number => s !== null);
	if (validScores.length === 0) return { percentage: 0, letter: 'N/A' };

	const avg = validScores.reduce((a, b) => a + b, 0) / validScores.length;
	const pct = Math.round(
		config.thresholds['1'] + ((avg - 1) / 3) * (100 - config.thresholds['1'])
	);

	const letter = avg >= 3.5 ? 'A' : avg >= 2.5 ? 'B' : avg >= 1.5 ? 'C' : 'D';
	return { percentage: Math.min(100, Math.max(0, pct)), letter };
}
