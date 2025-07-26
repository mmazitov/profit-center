import { act, renderHook } from '@testing-library/react';

import useStatsCalculator from '../src/hooks/useStatsCalculator';

describe('useStatsCalculator', () => {
	it('calculates stats correctly', () => {
		const { result } = renderHook(() => useStatsCalculator());
		act(() => {
			result.current.addValue(10);
			result.current.addValue(20);
			result.current.addValue(20);
			result.current.addValue(30);
		});
		const stats = result.current.getStats();
		expect(Number(stats.mean)).toBeCloseTo(20);
		expect(Number(stats.median)).toBeCloseTo(20);
		expect(Number(stats.mode)).toBe(20);
		expect(Number(stats.stdDev)).toBeCloseTo(7.07, 1);
	});
});
