import createCountMinSketch from '../src/utils/countMinSketch';

describe('CountMinSketch', () => {
	it('should add and estimate frequencies correctly', () => {
		const cms = createCountMinSketch({ width: 100, depth: 3 });
		cms.add('a');
		cms.add('a');
		cms.add('b');
		expect(cms.estimate('a')).toBeGreaterThanOrEqual(2);
		expect(cms.estimate('b')).toBeGreaterThanOrEqual(1);
		expect(cms.estimate('c')).toBe(0);
	});
});
