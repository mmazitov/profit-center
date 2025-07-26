// Factory function to create a Count-Min Sketch data structure
// Used for approximate frequency counting of values in a stream
const createCountMinSketch = ({ width = 1000, depth = 5 } = {}) => {
	// Initialize a 2D array (depth x width) of zeroed counters
	const sketch = Array.from({ length: depth }, () => new Uint32Array(width));

	// Hash function: generates a pseudo-random index for a string and seed
	const hash = (str, seed) => {
		let h = seed;
		for (let i = 0; i < str.length; i++) {
			h = (h * 31 + str.charCodeAt(i)) >>> 0; // Simple rolling hash
		}
		return h % width; // Ensure index is within bounds
	};

	// Add a value to the sketch (increment counters for each hash function)
	const add = (value) => {
		const str = value.toString(); // Convert value to string for hashing
		for (let i = 0; i < depth; i++) {
			const idx = hash(str, i + 1); // Use a different seed for each row
			sketch[i][idx] += 1; // Increment the counter at the hashed index
		}
	};

	// Estimate the frequency of a value (minimum count across all hash functions)
	const estimate = (value) => {
		const str = value.toString();
		let min = Infinity;
		for (let i = 0; i < depth; i++) {
			const idx = hash(str, i + 1);
			min = Math.min(min, sketch[i][idx]); // Track the minimum count
		}
		return min;
	};

	return { add, estimate };
};

export default createCountMinSketch;
