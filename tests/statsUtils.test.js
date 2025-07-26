import formatNumber from '../src/utils/statsUtils';

describe('formatNumber', () => {
	it('formats numbers to 2 decimals by default', () => {
		expect(formatNumber(1.23456)).toBe('1.23');
		expect(formatNumber(0.1)).toBe('0.10');
	});

	it('formats numbers to given decimals', () => {
		expect(formatNumber(1.23456, 3)).toBe('1.235');
		expect(formatNumber(1.2, 0)).toBe('1');
	});
});
