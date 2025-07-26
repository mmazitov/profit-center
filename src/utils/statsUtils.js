// Utility function to format a number to a fixed number of decimal places
// Accepts a number and the desired number of decimals (default is 2)
const formatNumber = (num, decimals = 2) => {
	// Convert input to float and format to the specified decimals
	return Number.parseFloat(num).toFixed(decimals);
};

export default formatNumber;
