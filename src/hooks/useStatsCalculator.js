import { useRef } from 'react';

import createCountMinSketch from '../utils/countMinSketch';
import formatNumber from '../utils/statsUtils';

// Custom React hook for calculating statistics (mean, stdDev, mode, median) on a stream of values
export default function useStatsCalculator() {
	// Store all incoming values in a ref to persist across renders
	const values = useRef([]);
	// Count-Min Sketch data structure for efficient frequency estimation (used for mode)
	const cms = useRef(createCountMinSketch({ width: 1000, depth: 5 }));

	// Add a new value to the dataset and update the Count-Min Sketch
	const addValue = (value) => {
		values.current.push(value); // Add value to the array
		cms.current.add(value); // Update frequency estimation
	};

	// Calculate statistics for the current dataset
	const getStats = () => {
		const arr = values.current;
		const n = arr.length;
		if (n === 0) return null; // No data, return null

		// Calculate mean (average)
		const mean = arr.reduce((a, b) => a + b, 0) / n;

		// Calculate variance and standard deviation
		const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
		const stdDev = Math.sqrt(variance);

		// Find the mode using Count-Min Sketch frequency estimation
		let modeValue = null;
		let modeFreq = -1;
		for (let v of arr) {
			const freq = cms.current.estimate(v); // Estimate frequency of value
			if (freq > modeFreq) {
				modeFreq = freq;
				modeValue = v;
			}
		}

		// Calculate median
		const sorted = [...arr].sort((a, b) => a - b); // Sort values
		let median;
		if (n % 2 === 0) {
			// Even number of elements: average the two middle values
			median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
		} else {
			// Odd number of elements: take the middle value
			median = sorted[Math.floor(n / 2)];
		}

		// Return formatted statistics
		return {
			mean: formatNumber(mean),
			stdDev: formatNumber(stdDev),
			mode: modeValue,
			median: formatNumber(median),
		};
	};

	return { addValue, getStats };
}
